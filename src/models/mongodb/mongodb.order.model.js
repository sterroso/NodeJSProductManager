import { Schema, model, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import {
  ORDER_STATUS,
  DEFAULT_ORDER_STATUS,
  PAYMENT_FORMS,
  DEFAULT_PAYMENT_FORM,
  CARD_TYPES,
  PAYMENT_STATUS,
  VALID_CVV_PATTERN,
} from "../../constants/order.constants.js";
import UserModel from "./mongodb.user.model.js";

export const OrderItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    subtotal: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

OrderItemSchema.pre("save", (next) => {
  if (this.isModified("quantity") || this.isModified("salesPrice")) {
    this.subtotal = this.quantity * this.salesPrice;
  }

  next();
});

export const OrderItemModel = model("OrderItem", OrderItemSchema);

const OrderItemChangeStream = OrderItemModel.watch();

OrderItemChangeStream.on("change", (change) => {
  if (change.operationType === "update") {
    const updateFields = change.updateDescription.updatedFields;
    const orderItemId = change.documentKey._id;
    OrderItemModel.findByIdAndUpdate(
      orderItemId,
      updateFields,
      { runValidators: true },
      (err, orderItem) => {
        if (err) {
          console.error(
            `An error occurred while trying to update OrderItem: ${orderItem}`
          );
          throw new Error(err.message);
        }
      }
    );
  }
});

export const PaymentSchema = new Schema(
  {
    form: {
      type: String,
      required: true,
      validate: {
        validator: (v) => Object.values(PAYMENT_FORMS).includes(v),
        message: (props) => `"${props.value}" is not a valid payment form.`,
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
          validator: (v) => Object.values(CARD_TYPES).includes(v),
          message: (props) => `"${props.value}" is not a valid card type.`,
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
            const expDate = new Date(v);

            return !isNaN(expDate) && expDate > today;
          },
          message: (props) =>
            `"${props.value}" is not a valid expiration date.`,
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
          validator: (v) => VALID_CVV_PATTERN.test(v),
          message: (props) => `"${props.value}" is not a valid CVV.`,
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
        validator: (v) => Object.values(PAYMENT_STATUS).includes(v),
        message: (props) => `"${props.value}" is not a valid payment status.`,
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
    itemCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
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
        validator: (v) => Object.values(ORDER_STATUS).includes(v),
        message: (props) => `"${props.value}" is not a valid order status.`,
      },
    },
  },
  {
    timestamps: true,
    virtuals: {
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
