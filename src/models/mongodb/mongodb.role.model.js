import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

import {
  MIN_ROLE_NAME_LENGTH,
  DEFAULT_USER_IS_BUILTIN,
  ROLES_PERMISSIONS_SETTINGS,
} from "../../constants/role.constants.js";

export const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: MIN_ROLE_NAME_LENGTH,
    },
    isBuiltin: {
      type: Boolean,
      required: true,
      default: DEFAULT_USER_IS_BUILTIN,
    },
    create: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.create.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.create.warehouses.default,
      },
    },
    read: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.read.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.read.warehouses.default,
      },
    },
    update: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.update.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.update.warehouses.default,
      },
    },
    delete: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.delete.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.delete.warehouses.default,
      },
    },
  },
  { timestamps: true }
);

RoleSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const Role = model("Role", RoleSchema);

export default Role;
