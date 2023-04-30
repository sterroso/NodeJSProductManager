import { Schema, model, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";
import ProductModel from "./mongodb.product.model.js";

export const CartItemSchema = new Schema(
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
    virtuals: {
      subtotal: {
        get() {
          return this.quantity * this.salesPrice;
        },
      },
    },
  }
);

export const CartSchema = new Schema(
  {
    items: {
      type: [CartItemSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    virtuals: {
      count: {
        get() {
          return this.items.reduce((acc, item) => acc + item.quantity, 0);
        },
      },
      total: {
        get() {
          return this.items.reduce((acc, item) => acc + item.subtotal, 0);
        },
      },
    },
  }
);

CartSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const CartModel = model("Cart", CartSchema);

export default CartModel;
