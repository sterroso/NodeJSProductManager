import { RoleService } from "../services/index.js";

export default async () => {
  try {
    const defaultRoles = await RoleService.getAll({ isBuiltin: true });

    if (defaultRoles.length > 0) {
      return defaultRoles.map((role) => {
        return { id: role.id, name: role.name };
      });
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
