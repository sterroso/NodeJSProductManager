import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

export const OrderSchema = new Schema(
  {
    user: {},
    items: {},
    shipping: {},
    payment: {},
    status: {},
  },
  {
    timestamps: true,
  }
);

OrderSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const OrderModel = model("Order", OrderSchema);

export default OrderModel;
