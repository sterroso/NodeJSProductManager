import { RoleService } from "../services/index.js";

export default async () => {
  try {
    const defaultRoles = await RoleService.getBy({ isBuiltin: true });

    return defaultRoles.map((role) => {
      return { id: role.id, name: role.name };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
