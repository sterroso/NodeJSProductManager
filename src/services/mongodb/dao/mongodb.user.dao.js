import { compare } from "bcrypt";

import User from "../../../models/mongodb/mongodb.user.model.js";
import UserDTO from "../dto/user.dto.js";
import { RoleService } from "../../index.js";
import RoleDTO from "../dto/role.dto.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      const users = await User.paginate(query, options);

      if (users.count > 0) {
        users.payload = users.payload.map((user) => UserDTO.getListItem(user));

        return users;
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const user = await User.findOne(query);

      if (user) {
        const userRole = await RoleService.getById(user.role);

        if (userRole) {
          user.role = RoleDTO.getListItem(userRole);
        }

        return UserDTO.getLeanDocument(user);
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static credentialsMatch = async (email, password) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) return false;

      return await compare(password, user.password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      const createDoc = UserDTO.getCreateDocument(document);

      const newUser = await User.create(createDoc);

      if (newUser) {
        return UserDTO.getLeanDocument(newUser);
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (userId, document) => {
    try {
      const updateDoc = UserDTO.getUpdateDocument(document);

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateDoc,
        {
          new: true,
        }
      );

      if (updatedUser) {
        return UserDTO.getLeanDocument(updatedUser);
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (userId) => {
    try {
      return await User.findOneAndDelete({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
