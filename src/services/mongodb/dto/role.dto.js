import {
  MIN_ROLE_NAME_LENGTH,
  ROLES_PERMISSIONS_SETTINGS,
} from "../../../constants/role.constants.js";

export default class RoleDTO {
  static formats = {
    SMALL: "small",
    LEAN: "lean",
    CREATE: "create",
    UPDATE: "update",
  };

  static getListItem = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.SMALL });

  static getLeanDocument = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.LEAN });

  static getCreateDocument = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.CREATE });

  static getUpdateDocument = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.UPDATE });

  static get = (document, options = { format: RoleDTO.formats.SMALL }) => {
    if (!document) {
      throw new Error("Must provide a document to transform.");
    }

    switch (options?.format || "none") {
      case RoleDTO.formats.SMALL:
        return {
          id: document._id,
          name: document.name,
        };
      case RoleDTO.formats.LEAN:
        return {
          id: document._id,
          name: document.name,
          create: document.create,
          read: document.read,
          update: document.update,
          delete: document.delete,
        };
      case RoleDTO.formats.CREATE:
        if (!(document?.name || false)) {
          throw new Error("Must provide a role name.");
        }

        if (document.name.length < MIN_ROLE_NAME_LENGTH) {
          throw new Error(
            `Role name must be, at least, ${MIN_ROLE_NAME_LENGTH} characters length.`
          );
        }

        return {
          name: document.name,
          create: {
            users:
              document?.create?.users ||
              ROLES_PERMISSIONS_SETTINGS.create.users.default,
            passwords:
              document?.create?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.create.passwords.default,
            sessions:
              document?.create?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.create.sessions.default,
            roles:
              document?.create?.roles ||
              ROLES_PERMISSIONS_SETTINGS.create.roles.default,
            carts:
              document?.create?.carts ||
              ROLES_PERMISSIONS_SETTINGS.create.carts.default,
            cartItems:
              document?.create?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.create.cartItems.default,
            orders:
              document?.create?.orders ||
              ROLES_PERMISSIONS_SETTINGS.create.orders.default,
            orderItems:
              document?.create?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.create.orderItems.default,
            categories:
              document?.create?.categories ||
              ROLES_PERMISSIONS_SETTINGS.create.categories.default,
            products:
              document?.create?.products ||
              ROLES_PERMISSIONS_SETTINGS.create.products.default,
            stores:
              document?.create?.stores ||
              ROLES_PERMISSIONS_SETTINGS.create.stores.default,
            warehouses:
              document?.create?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.create.warehouses.default,
          },
          read: {
            users:
              document?.read?.users ||
              ROLES_PERMISSIONS_SETTINGS.read.users.default,
            passwords:
              document?.read?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.read.passwords.default,
            sessions:
              document?.read?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.read.sessions.default,
            roles:
              document?.read?.roles ||
              ROLES_PERMISSIONS_SETTINGS.read.roles.default,
            carts:
              document?.read?.carts ||
              ROLES_PERMISSIONS_SETTINGS.read.carts.default,
            cartItems:
              document?.read?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.read.cartItems.default,
            orders:
              document?.read?.orders ||
              ROLES_PERMISSIONS_SETTINGS.read.orders.default,
            orderItems:
              document?.read?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.read.orderItems.default,
            categories:
              document?.read?.categories ||
              ROLES_PERMISSIONS_SETTINGS.read.categories.default,
            products:
              document?.read?.products ||
              ROLES_PERMISSIONS_SETTINGS.read.products.default,
            stores:
              document?.read?.stores ||
              ROLES_PERMISSIONS_SETTINGS.read.stores.default,
            warehouses:
              document?.read?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.read.warehouses.default,
          },
          update: {
            users:
              document?.update?.users ||
              ROLES_PERMISSIONS_SETTINGS.update.users.default,
            passwords:
              document?.update?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.update.passwords.default,
            sessions:
              document?.update?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.update.sessions.default,
            roles:
              document?.update?.roles ||
              ROLES_PERMISSIONS_SETTINGS.update.roles.default,
            carts:
              document?.update?.carts ||
              ROLES_PERMISSIONS_SETTINGS.update.carts.default,
            cartItems:
              document?.update?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.update.cartItems.default,
            orders:
              document?.update?.orders ||
              ROLES_PERMISSIONS_SETTINGS.update.orders.default,
            orderItems:
              document?.update?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.update.orderItems.default,
            categories:
              document?.update?.categories ||
              ROLES_PERMISSIONS_SETTINGS.update.categories.default,
            products:
              document?.update?.products ||
              ROLES_PERMISSIONS_SETTINGS.update.products.default,
            stores:
              document?.update?.stores ||
              ROLES_PERMISSIONS_SETTINGS.update.stores.default,
            warehouses:
              document?.update?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.update.warehouses.default,
          },
          delete: {
            users:
              document?.delete?.users ||
              ROLES_PERMISSIONS_SETTINGS.delete.users.default,
            passwords:
              document?.delete?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.delete.passwords.default,
            sessions:
              document?.delete?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.delete.sessions.default,
            roles:
              document?.delete?.roles ||
              ROLES_PERMISSIONS_SETTINGS.delete.roles.default,
            carts:
              document?.delete?.carts ||
              ROLES_PERMISSIONS_SETTINGS.delete.carts.default,
            cartItems:
              document?.delete?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.delete.cartItems.default,
            orders:
              document?.delete?.orders ||
              ROLES_PERMISSIONS_SETTINGS.delete.orders.default,
            orderItems:
              document?.delete?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.delete.orderItems.default,
            categories:
              document?.delete?.categories ||
              ROLES_PERMISSIONS_SETTINGS.delete.categories.default,
            products:
              document?.delete?.products ||
              ROLES_PERMISSIONS_SETTINGS.delete.products.default,
            stores:
              document?.delete?.stores ||
              ROLES_PERMISSIONS_SETTINGS.delete.stores.default,
            warehouses:
              document?.delete?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.delete.warehouses.default,
          },
        };
      case RoleDTO.formats.UPDATE:
        return {
          name: document.name,
          create: {
            users: document?.create?.users || undefined,
            passwords: document?.create?.passwords || undefined,
            sessions: document?.create?.sessions || undefined,
            roles: document?.create?.roles || undefined,
            carts: document?.create?.carts || undefined,
            cartItems: document?.create?.cartItems || undefined,
            orders: document?.create?.orders || undefined,
            orderItems: document?.create?.orderItems || undefined,
            categories: document?.create?.categories || undefined,
            products: document?.create?.products || undefined,
            stores: document?.create?.stores || undefined,
            warehouses: document?.create?.warehouses || undefined,
          },
          read: {
            users: document?.read?.users || undefined,
            passwords: document?.read?.passwords || undefined,
            sessions: document?.read?.sessions || undefined,
            roles: document?.read?.roles || undefined,
            carts: document?.read?.carts || undefined,
            cartItems: document?.read?.cartItems || undefined,
            orders: document?.read?.orders || undefined,
            orderItems: document?.read?.orderItems || undefined,
            categories: document?.read?.categories || undefined,
            products: document?.read?.products || undefined,
            stores: document?.read?.stores || undefined,
            warehouses: document?.read?.warehouses || undefined,
          },
          update: {
            users: document?.update?.users || undefined,
            passwords: document?.update?.passwords || undefined,
            sessions: document?.update?.sessions || undefined,
            roles: document?.update?.roles || undefined,
            carts: document?.update?.carts || undefined,
            cartItems: document?.update?.cartItems || undefined,
            orders: document?.update?.orders || undefined,
            orderItems: document?.update?.orderItems || undefined,
            categories: document?.update?.categories || undefined,
            products: document?.update?.products || undefined,
            stores: document?.update?.stores || undefined,
            warehouses: document?.update?.warehouses || undefined,
          },
          delete: {
            users: document?.delete?.users || undefined,
            passwords: document?.delete?.passwords || undefined,
            sessions: document?.delete?.sessions || undefined,
            roles: document?.delete?.roles || undefined,
            carts: document?.delete?.carts || undefined,
            cartItems: document?.delete?.cartItems || undefined,
            orders: document?.delete?.orders || undefined,
            orderItems: document?.delete?.orderItems || undefined,
            categories: document?.delete?.categories || undefined,
            products: document?.delete?.products || undefined,
            stores: document?.delete?.stores || undefined,
            warehouses: document?.delete?.warehouses || undefined,
          },
        };
      default:
        throw new Error("Roles data transformation format unknown.");
    }
  };
}
