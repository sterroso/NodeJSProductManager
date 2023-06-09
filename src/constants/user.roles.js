import {
  ROLES_PERMISSIONS,
  DEFAULT_ADMIN_ROLE_NAME,
  DEFAULT_MANAGER_ROLE_NAME,
  DEFAULT_PREMIUM_USER_ROLE_NAME,
  DEFAULT_USER_ROLE_NAME,
} from "./role.constants.js";

export const USER_BUILTIN_ROLES = {
  /* -------------------------- Normal (default) user ------------------------- */
  USER: {
    name: DEFAULT_USER_ROLE_NAME,
    canCreate: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF, // If this is set to NONE, user will not be able to login.
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.NONE,
      products: ROLES_PERMISSIONS.NONE,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
    canRead: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.SELF,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canUpdate: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.NONE,
      products: ROLES_PERMISSIONS.NONE,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
    canDelete: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.NONE,
      products: ROLES_PERMISSIONS.NONE,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
  },
  /* ------------------------------ Premium user ------------------------------ */
  USER_PREMIUM: {
    name: DEFAULT_PREMIUM_USER_ROLE_NAME,
    canCreate: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF, // If this is set to NONE, user will not be able to login.
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
    canRead: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.SELF,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canUpdate: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
    canDelete: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.SELF,
      cartItems: ROLES_PERMISSIONS.SELF,
      orders: ROLES_PERMISSIONS.SELF,
      orderItems: ROLES_PERMISSIONS.SELF,
      categories: ROLES_PERMISSIONS.NONE,
      products: ROLES_PERMISSIONS.NONE,
      stores: ROLES_PERMISSIONS.NONE,
      warehouses: ROLES_PERMISSIONS.NONE,
    },
  },
  /* ------------------------ E-Commerce store manager ------------------------ */
  MANAGER: {
    name: DEFAULT_MANAGER_ROLE_NAME,
    canCreate: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF, // If this is set to NONE, user will not be able to login.
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canRead: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.SELF,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canUpdate: {
      users: ROLES_PERMISSIONS.SELF,
      passwords: ROLES_PERMISSIONS.SELF,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canDelete: {
      users: ROLES_PERMISSIONS.NONE,
      passwords: ROLES_PERMISSIONS.NONE,
      roles: ROLES_PERMISSIONS.NONE,
      sessions: ROLES_PERMISSIONS.SELF,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
  },
  /* -------------------------------- Sysadmin -------------------------------- */
  ADMIN: {
    name: DEFAULT_ADMIN_ROLE_NAME,
    canCreate: {
      users: ROLES_PERMISSIONS.ALL,
      passwords: ROLES_PERMISSIONS.ALL,
      roles: ROLES_PERMISSIONS.ALL,
      sessions: ROLES_PERMISSIONS.ALL, // If this is set to NONE, user will not be able to login.
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canRead: {
      users: ROLES_PERMISSIONS.ALL,
      passwords: ROLES_PERMISSIONS.ALL,
      roles: ROLES_PERMISSIONS.ALL,
      sessions: ROLES_PERMISSIONS.ALL,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canUpdate: {
      users: ROLES_PERMISSIONS.ALL,
      passwords: ROLES_PERMISSIONS.ALL,
      roles: ROLES_PERMISSIONS.ALL,
      sessions: ROLES_PERMISSIONS.ALL,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
    canDelete: {
      users: ROLES_PERMISSIONS.ALL,
      passwords: ROLES_PERMISSIONS.ALL,
      roles: ROLES_PERMISSIONS.ALL,
      sessions: ROLES_PERMISSIONS.ALL,
      carts: ROLES_PERMISSIONS.ALL,
      cartItems: ROLES_PERMISSIONS.ALL,
      orders: ROLES_PERMISSIONS.ALL,
      orderItems: ROLES_PERMISSIONS.ALL,
      categories: ROLES_PERMISSIONS.ALL,
      products: ROLES_PERMISSIONS.ALL,
      stores: ROLES_PERMISSIONS.ALL,
      warehouses: ROLES_PERMISSIONS.ALL,
    },
  },
};
