import bcrypt from "bcrypt";
import { DEFAULT_SALT_ROUNDS } from "../../../constants/app.constants.js";
import UserModel from "../../../models/mongodb/mongodb.user.model.js";

export default class UserDAO {
  static getAll = async (query, options) => {
    try {
      return await UserModel.paginate(query, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getById = async (userId) => {
    try {
      return await UserModel.findOne({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getByEmail = async (email) => {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static credentialsMatch = async (email, password) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("User not found.");
      }

      return await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return await UserModel.create(document);
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

  static updatePassword = async (email, currentPassword, newPassword) => {
    try {
      if (!UserDAO.credentialsMatch(email, currentPassword)) {
        throw new Error("Unauthorized.");
      }

      newPassword = await bcrypt.hash(newPassword, DEFAULT_SALT_ROUNDS);

      return await UserModel.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true }
      );
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
