import Role from "../../../models/mongodb/mongodb.role.model.js";
import RoleDTO from "../dto/role.dto.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      const allUsers = await Role.find(query, {}, options);

      if (!allUsers || allUsers.length === 0) {
        throw new Error("Users not found.");
      }

      return allUsers.map((user) => RoleDTO.getListItem(user));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const user = await Role.findOne(query);

      if (!user) {
        throw new Error("User not found.");
      }

      return RoleDTO.getLeanDocument(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      const createDoc = RoleDTO.getCreateDocument(document);

      return await Role.create(createDoc);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (query, document) => {
    try {
      const updateDoc = RoleDTO.getUpdateDocument(document);

      return RoleDTO.getLeanDocument(
        await Role.findOneAndUpdate(query, updateDoc, { new: true })
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
