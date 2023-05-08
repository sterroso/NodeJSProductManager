import { Schema, model, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import ORDER_STATUS, {
  DEFAULT_ORDER_STATUS,
} from "../../constants/order.status.js";
import {
  PAYMENT_FORMS,
  DEFAULT_PAYMENT_FORM,
  CARD_TYPES,
  PAYMENT_STATUS,
  VALID_CVV_PATTERN,
} from "../../constants/payment.constants.js";
import UserModel from "./mongodb.user.model.js";
import ProductModel from "./mongodb.product.model";

export const OrderItemSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      required: true,
      ref: ProductModel,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    salesPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    virtuals: {
      subtotal: {
        get() {
          return this.quantity * this.salesPrice;
        },
      },
    },
  }
);

export const PaymentSchema = new Schema(
  {
    form: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          const validForms = Object.entries(PAYMENT_FORMS).map(
            (entry) => entry[1]
          );

          return validForms.some((form) => form === v);
        },
        message: (props) => `${props.value} is not a valid payment form.`,
      },
      default: DEFAULT_PAYMENT_FORM,
    },
    card: {
      type: {
        type: String,
        required: () => {
          return (
            this.form === PAYMENT_FORMS.CREDIT_CARD ||
            this.form === PAYMENT_FORMS.DEBIT_CARD
          );
        },
        validate: {
          validator: (v) => {
            const validCardTypes = Object.entries(CARD_TYPES).map(
              (entry) => entry[1]
            );

            return validCardTypes.some((type) => type === v);
          },
          message: (props) => `${props.value} is not a valid card type.`,
        },
      },
      lastDigits: {
        type: String,
        required: () => {
          return (
            this.form === PAYMENT_FORMS.CREDIT_CARD ||
            this.form === PAYMENT_FORMS.DEBIT_CARD
          );
        },
        minLength: 4,
        maxLength: 5,
      },
      expirationDate: {
        type: Date,
        required: () => {
          return (
            this.form === PAYMENT_FORMS.CREDIT_CARD ||
            this.form === PAYMENT_FORMS.DEBIT_CARD
          );
        },
        validate: {
          validator: (v) => {
            const today = new Date(Date.now());

            return Date.parse(v) > today.getMilliseconds();
          },
          message: (props) => `${props.value} is not a valid expiration date.`,
        },
      },
      cvv: {
        type: String,
        required: () => {
          return (
            this.form === PAYMENT_FORMS.CREDIT_CARD ||
            this.form === PAYMENT_FORMS.DEBIT_CARD
          );
        },
        minLength: 3,
        maxLEngth: 4,
        validate: {
          validator: (v) => {
            return VALID_CVV_PATTERN.test(v);
          },
          message: (props) => `${props.value} is not a valid x.`,
        },
      },
    },
    confirmation: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: false,
      validate: {
        validator: (v) => {
          const validPaymentStatus = Object.entries(PAYMENT_STATUS).map(
            (entry) => entry[1]
          );

          return validPaymentStatus.some((status) => status === v);
        },
        message: (props) => `${props.value} is not a valid payment status.`,
      },
    },
  },
  {}
);

export const OrderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },
    shipping: {
      contact: {
        name: {
          type: String,
          required: true,
          minLength: 3,
        },
        email: {
          type: String,
          required: true,
          minLength: 3,
        },
        telephone: {
          type: String,
          required: true,
          minLength: 3,
        },
      },
      address: {
        street: {
          type: String,
          required: true,
          minLength: 3,
        },
        neighborhood: {
          type: String,
          required: false,
          minLength: 3,
        },
        zipCode: {
          type: String,
          required: true,
          minLength: 3,
        },
        city: {
          type: String,
          required: true,
          minLength: 3,
        },
        state: {
          type: String,
          required: false,
          minLength: 3,
        },
        country: {
          type: String,
          required: true,
          minLength: 3,
        },
      },
      fee: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    payment: {
      type: [PaymentSchema],
      required: true,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: DEFAULT_ORDER_STATUS,
      validate: {
        validator: (v) => {
          const validOrderStatus = Object.entries(ORDER_STATUS).map(
            (entry) => entry[1]
          );

          return validOrderStatus.some((status) => status === v);
        },
        message: (props) => `${props.value} is not a valid order status.`,
      },
    },
  },
  {
    timestamps: true,
    virtuals: {
      count: {
        get() {
          return this.items.reduce((count, item) => count + item.quantity, 0);
        },
      },
      total: {
        get() {
          return this.items.reduce((sum, item) => sum + item.subtotal, 0);
        },
      },
      amountPaid: {
        get() {
          return this.payment.reduce((sum, pay) => {
            if (
              (pay?.status || PAYMENT_STATUS.ON_HOLD) ===
              PAYMENT_STATUS.ACCEPTED
            ) {
              return sum + pay.amount;
            }

            return sum + 0;
          }, 0);
        },
      },
      amountOwed: {
        get() {
          return this.total - this.amountPaid;
        },
      },
    },
  }
);

OrderSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

OrderSchema.plugin(MongoosePaginate);

const OrderModel = model("Order", OrderSchema);

export default OrderModel;
