export default {
  /* -------------------------- Normal (default) user ------------------------- */
  USER: {
    name: "user",
    read: {
      users: {
        self: true,
        other: false,
        bulk: true,
      },
      products: {
        self: false,
        other: false,
        bulk: true,
      },
      carts: {
        self: true,
        other: false,
        bulk: false,
      },
      orders: {
        self: true,
        other: false,
        bulk: false,
      },
    },
    write: {
      users: {
        self: true,
        other: false,
        bulk: false,
      },
      products: {
        self: false,
        other: false,
        bulk: false,
      },
      carts: {
        self: true,
        other: false,
        bulk: false,
      },
      orders: {
        self: true,
        other: false,
        bulk: false,
      },
    },
  },
  /* ------------------------------ Premium user ------------------------------ */
  USER_PREMIUM: {
    name: "premium user",
    read: {
      users: {
        self: true,
        other: true,
        bulk: true,
      },
      products: {
        self: true,
        other: true,
        bulk: true,
      },
      carts: {
        self: true,
        other: true,
        bulk: true,
      },
      orders: {
        self: true,
        other: true,
        bulk: true,
      },
    },
    write: {
      users: {
        self: true,
        other: false,
        bulk: false,
      },
      products: {
        self: true,
        other: false,
        bulk: false,
      },
      carts: {
        self: true,
        other: false,
        bulk: false,
      },
      orders: {
        self: true,
        other: false,
        bulk: false,
      },
    },
  },
  /* ------------------------ E-Commerce store manager ------------------------ */
  MANAGER: {
    name: "manager",
    read: {
      users: {
        self: true,
        other: true,
        bulk: true,
      },
      products: {
        self: true,
        other: true,
        bulk: true,
      },
      carts: {
        self: true,
        other: true,
        bulk: true,
      },
      orders: {
        self: true,
        other: true,
        bulk: true,
      },
    },
    write: {
      users: {
        self: true,
        other: true,
        bulk: false,
      },
      products: {
        self: true,
        other: true,
        bulk: false,
      },
      carts: {
        self: true,
        other: true,
        bulk: false,
      },
      orders: {
        self: true,
        other: true,
        bulk: false,
      },
    },
  },
  /* -------------------------------- Sysadmin -------------------------------- */
  ADMIN: {
    name: "admin",
    read: {
      users: {
        self: true,
        other: true,
        bulk: true,
      },
      products: {
        self: true,
        other: true,
        bulk: true,
      },
      carts: {
        self: true,
        other: true,
        bulk: true,
      },
      orders: {
        self: true,
        other: true,
        bulk: true,
      },
    },
    write: {
      users: {
        self: true,
        other: true,
        bulk: true,
      },
      products: {
        self: true,
        other: true,
        bulk: true,
      },
      carts: {
        self: true,
        other: true,
        bulk: true,
      },
      orders: {
        self: true,
        other: true,
        bulk: true,
      },
    },
  },
};
