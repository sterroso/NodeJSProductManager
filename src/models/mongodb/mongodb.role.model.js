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
    canCreate: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canCreate.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canCreate.warehouses.default,
      },
    },
    canRead: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canRead.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canRead.warehouses.default,
      },
    },
    canUpdate: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canUpdate.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canUpdate.warehouses.default,
      },
    },
    canDelete: {
      users: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.users.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.users.default,
      },
      passwords: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.passwords.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.passwords.default,
      },
      sessions: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.sessions.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.sessions.default,
      },
      roles: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.roles.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.roles.default,
      },
      carts: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.carts.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.carts.default,
      },
      cartItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.cartItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.cartItems.default,
      },
      orders: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.orders.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.orders.default,
      },
      orderItems: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.orderItems.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.orderItems.default,
      },
      categories: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.categories.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.categories.default,
      },
      products: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.products.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.products.default,
      },
      stores: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.stores.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.stores.default,
      },
      warehouses: {
        type: String,
        required: true,
        enum: ROLES_PERMISSIONS_SETTINGS.canDelete.warehouses.enum,
        default: ROLES_PERMISSIONS_SETTINGS.canDelete.warehouses.default,
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
