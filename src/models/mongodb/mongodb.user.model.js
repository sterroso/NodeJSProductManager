import { Schema, model, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import CartModel from "./mongodb.cart.model.js";

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minLEngth: 3,
    },
    emailConfirmed: {
      type: Boolean,
      required: true,
      default: 0,
    },
    emailConfirmedOn: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minLEngth: 3,
    },
    firstName: {
      type: String,
      required: true,
      minLEngth: 3,
    },
    lastName: {
      type: String,
      required: true,
      minLEngth: 3,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["female", "male", "other", "not specified"],
      default: "not specified",
    },
    roles: {
      type: [String],
      required: true,
      default: ["user"],
    },
    cart: {
      type: Types.ObjectId,
      ref: CartModel,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

UserSchema.plugin(MongoosePaginate);

const UserModel = model("User", UserSchema);

export default UserModel;
