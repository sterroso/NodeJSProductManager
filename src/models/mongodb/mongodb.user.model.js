import { Schema, model, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import USER_GENDERS, {
  DEFAULT_USER_GENDER,
} from "../../constants/user.genders.js";
import CartModel from "./mongodb.cart.model.js";
import Role from "./mongodb.role.model.js";

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
      default: false,
    },
    emailConfirmedOn: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: true,
      enum: USER_GENDERS,
      default: DEFAULT_USER_GENDER,
    },
    role: {
      type: Types.ObjectId,
      required: true,
      ref: Role,
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
