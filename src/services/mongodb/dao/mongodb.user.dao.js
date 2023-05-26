import UserModel from "../../../models/mongodb/mongodb.user.model.js";
import UserDTO from "../dto/user.dto.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      const users = await UserModel.paginate(query, options);

      if (users.count > 0) {
        users.payload = users.payload.map(
          async (user) => await UserDTO.getLeanDocument(user)
        );

        return users;
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const user = await UserModel.findOne(query);

      if (user) {
        return UserDTO.getLeanDocument(user);
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      const createDoc = await UserDTO.getCreateDocument(document);

      const newUser = await UserModel.create(createDoc);

      if (newUser) {
        return await UserDTO.getLeanDocument(newUser);
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (userId, document) => {
    try {
      const updateDoc = await UserDTO.getUpdateDocument(document);

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        updateDoc,
        {
          new: true,
        }
      );

      if (updatedUser) {
        return await UserDTO.getLeanDocument(updatedUser);
      }

      return null;
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
