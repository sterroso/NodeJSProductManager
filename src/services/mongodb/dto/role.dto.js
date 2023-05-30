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

  static getCreateBuiltinRole = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.CREATE, builtIn: true });

  static getUpdateDocument = (document) =>
    RoleDTO.get(document, { format: RoleDTO.formats.UPDATE });

  static get = (
    document,
    options = { format: RoleDTO.formats.SMALL, builtIn: false }
  ) => {
    if (!document) {
      return null;
    }

    switch (options?.format || "none") {
      case RoleDTO.formats.SMALL:
        return {
          id: document?._id || document?.id || undefined,
          name: document.name,
        };
      case RoleDTO.formats.LEAN:
        return {
          id: document._id,
          name: document.name,
          canCreate: document.canCreate,
          canRead: document.canRead,
          canUpdate: document.canUpdate,
          canDelete: document.canDelete,
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
          isBuiltin: options?.builtIn || false,
          canCreate: {
            users:
              document?.canCreate?.users ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.users.default,
            passwords:
              document?.canCreate?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.passwords.default,
            sessions:
              document?.canCreate?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.sessions.default,
            roles:
              document?.canCreate?.roles ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.roles.default,
            carts:
              document?.canCreate?.carts ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.carts.default,
            cartItems:
              document?.canCreate?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.cartItems.default,
            orders:
              document?.canCreate?.orders ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.orders.default,
            orderItems:
              document?.canCreate?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.orderItems.default,
            categories:
              document?.canCreate?.categories ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.categories.default,
            products:
              document?.canCreate?.products ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.products.default,
            stores:
              document?.canCreate?.stores ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.stores.default,
            warehouses:
              document?.canCreate?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.canCreate.warehouses.default,
          },
          canRead: {
            users:
              document?.canRead?.users ||
              ROLES_PERMISSIONS_SETTINGS.canRead.users.default,
            passwords:
              document?.canRead?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.canRead.passwords.default,
            sessions:
              document?.canRead?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.canRead.sessions.default,
            roles:
              document?.canRead?.roles ||
              ROLES_PERMISSIONS_SETTINGS.canRead.roles.default,
            carts:
              document?.canRead?.carts ||
              ROLES_PERMISSIONS_SETTINGS.canRead.carts.default,
            cartItems:
              document?.canRead?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.canRead.cartItems.default,
            orders:
              document?.canRead?.orders ||
              ROLES_PERMISSIONS_SETTINGS.canRead.orders.default,
            orderItems:
              document?.canRead?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.canRead.orderItems.default,
            categories:
              document?.canRead?.categories ||
              ROLES_PERMISSIONS_SETTINGS.canRead.categories.default,
            products:
              document?.canRead?.products ||
              ROLES_PERMISSIONS_SETTINGS.canRead.products.default,
            stores:
              document?.canRead?.stores ||
              ROLES_PERMISSIONS_SETTINGS.canRead.stores.default,
            warehouses:
              document?.canRead?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.canRead.warehouses.default,
          },
          canUpdate: {
            users:
              document?.canUpdate?.users ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.users.default,
            passwords:
              document?.canUpdate?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.passwords.default,
            sessions:
              document?.canUpdate?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.sessions.default,
            roles:
              document?.canUpdate?.roles ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.roles.default,
            carts:
              document?.canUpdate?.carts ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.carts.default,
            cartItems:
              document?.canUpdate?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.cartItems.default,
            orders:
              document?.canUpdate?.orders ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.orders.default,
            orderItems:
              document?.canUpdate?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.orderItems.default,
            categories:
              document?.canUpdate?.categories ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.categories.default,
            products:
              document?.canUpdate?.products ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.products.default,
            stores:
              document?.canUpdate?.stores ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.stores.default,
            warehouses:
              document?.canUpdate?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.canUpdate.warehouses.default,
          },
          canDelete: {
            users:
              document?.canDelete?.users ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.users.default,
            passwords:
              document?.canDelete?.passwords ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.passwords.default,
            sessions:
              document?.canDelete?.sessions ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.sessions.default,
            roles:
              document?.canDelete?.roles ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.roles.default,
            carts:
              document?.canDelete?.carts ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.carts.default,
            cartItems:
              document?.canDelete?.cartItems ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.cartItems.default,
            orders:
              document?.canDelete?.orders ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.orders.default,
            orderItems:
              document?.canDelete?.orderItems ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.orderItems.default,
            categories:
              document?.canDelete?.categories ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.categories.default,
            products:
              document?.canDelete?.products ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.products.default,
            stores:
              document?.canDelete?.stores ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.stores.default,
            warehouses:
              document?.canDelete?.warehouses ||
              ROLES_PERMISSIONS_SETTINGS.canDelete.warehouses.default,
          },
        };
      case RoleDTO.formats.UPDATE:
        return {
          name: document.name,
          canCreate: {
            users: document?.canCreate?.users || undefined,
            passwords: document?.canCreate?.passwords || undefined,
            sessions: document?.canCreate?.sessions || undefined,
            roles: document?.canCreate?.roles || undefined,
            carts: document?.canCreate?.carts || undefined,
            cartItems: document?.canCreate?.cartItems || undefined,
            orders: document?.canCreate?.orders || undefined,
            orderItems: document?.canCreate?.orderItems || undefined,
            categories: document?.canCreate?.categories || undefined,
            products: document?.canCreate?.products || undefined,
            stores: document?.canCreate?.stores || undefined,
            warehouses: document?.canCreate?.warehouses || undefined,
          },
          canRead: {
            users: document?.canRead?.users || undefined,
            passwords: document?.canRead?.passwords || undefined,
            sessions: document?.canRead?.sessions || undefined,
            roles: document?.canRead?.roles || undefined,
            carts: document?.canRead?.carts || undefined,
            cartItems: document?.canRead?.cartItems || undefined,
            orders: document?.canRead?.orders || undefined,
            orderItems: document?.canRead?.orderItems || undefined,
            categories: document?.canRead?.categories || undefined,
            products: document?.canRead?.products || undefined,
            stores: document?.canRead?.stores || undefined,
            warehouses: document?.canRead?.warehouses || undefined,
          },
          canUpdate: {
            users: document?.canUpdate?.users || undefined,
            passwords: document?.canUpdate?.passwords || undefined,
            sessions: document?.canUpdate?.sessions || undefined,
            roles: document?.canUpdate?.roles || undefined,
            carts: document?.canUpdate?.carts || undefined,
            cartItems: document?.canUpdate?.cartItems || undefined,
            orders: document?.canUpdate?.orders || undefined,
            orderItems: document?.canUpdate?.orderItems || undefined,
            categories: document?.canUpdate?.categories || undefined,
            products: document?.canUpdate?.products || undefined,
            stores: document?.canUpdate?.stores || undefined,
            warehouses: document?.canUpdate?.warehouses || undefined,
          },
          canDelete: {
            users: document?.canDelete?.users || undefined,
            passwords: document?.canDelete?.passwords || undefined,
            sessions: document?.canDelete?.sessions || undefined,
            roles: document?.canDelete?.roles || undefined,
            carts: document?.canDelete?.carts || undefined,
            cartItems: document?.canDelete?.cartItems || undefined,
            orders: document?.canDelete?.orders || undefined,
            orderItems: document?.canDelete?.orderItems || undefined,
            categories: document?.canDelete?.categories || undefined,
            products: document?.canDelete?.products || undefined,
            stores: document?.canDelete?.stores || undefined,
            warehouses: document?.canDelete?.warehouses || undefined,
          },
        };
      default:
        throw new Error("Roles data transformation format unknown.");
    }
  };
}
