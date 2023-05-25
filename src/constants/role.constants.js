export const DEFAULT_ADMIN_ROLE_NAME = "admin";

export const DEFAULT_USER_ROLE_NAME = "user";

export const DEFAULT_PREMIUM_USER_ROLE_NAME = "premium user";

export const DEFAULT_MANAGER_ROLE_NAME = "manager";

export const ROLES_PERMISSIONS = {
  ALL: "all",
  SELF: "self",
  NONE: "none",
};

export const ROLES_PERMISSIONS_SETTINGS = {
  create: {
    users: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    passwords: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    sessions: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    roles: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    carts: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    cartItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orders: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orderItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    categories: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    products: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    stores: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    warehouses: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
  },
  read: {
    users: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    passwords: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    sessions: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    roles: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    carts: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    cartItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orders: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orderItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    categories: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    products: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.ALL,
    },
    stores: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.ALL,
    },
    warehouses: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.ALL,
    },
  },
  update: {
    users: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    passwords: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    sessions: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    roles: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    carts: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    cartItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orders: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orderItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    categories: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    products: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    stores: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    warehouses: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
  },
  delete: {
    users: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    passwords: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    sessions: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    roles: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.NONE,
    },
    carts: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    cartItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orders: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    orderItems: {
      enum: [
        ROLES_PERMISSIONS.ALL,
        ROLES_PERMISSIONS.SELF,
        ROLES_PERMISSIONS.NONE,
      ],
      default: ROLES_PERMISSIONS.SELF,
    },
    categories: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    products: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    stores: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
    warehouses: {
      enum: [ROLES_PERMISSIONS.ALL, ROLES_PERMISSIONS.NONE],
      default: ROLES_PERMISSIONS.NONE,
    },
  },
};

export const MIN_ROLE_NAME_LENGTH = 3;
