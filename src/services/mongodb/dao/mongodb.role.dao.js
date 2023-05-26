import Role from "../../../models/mongodb/mongodb.role.model.js";
import RoleDTO from "../dto/role.dto.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      const allRoles = await Role.find(query, {}, options);

      if (allRoles.length > 0) {
        return allRoles.map((role) => RoleDTO.getListItem(role));
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      return RoleDTO.getLeanDocument(await Role.findOne(query));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return RoleDTO.getLeanDocument(await Role.create(document));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (query, document) => {
    try {
      return RoleDTO.getLeanDocument(
        await Role.findOneAndUpdate(query, document, { new: true })
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (query) => {
    try {
      return await Role.findOneAndDelete(query);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
