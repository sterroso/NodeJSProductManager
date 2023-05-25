import UserModel from "../../../models/mongodb/mongodb.user.model.js";
import UserDTO from "../dto/user.dto.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      const users = await UserModel.paginate(query, options);

      if (users.count > 0) {
        return users.payload.map(
          async (user) => await UserDTO.getLeanDocument(user)
        );
      }

      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const user = await UserModel.findOne(query);

      if (!user) {
        throw new Error("User not found.");
      }

      return UserDTO.getLeanDocument(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return await UserModel.create(await UserDTO.getCreateDocument(document));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (userId, document) => {
    try {
      return await UserModel.findOneAndUpdate({ _id: userId }, document, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (userId) => {
    try {
      return await UserModel.findOneAndDelete({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
