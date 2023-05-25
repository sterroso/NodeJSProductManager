import { compare } from "bcrypt";

import UserDTO from "./dto/user.dto.js";
import { UserService } from "../index.js";

export default class SessionService {
  static login = async (email, password) => {
    try {
      const user = await UserService.getByEmail(email);

      if (!user) {
        throw new Error("User not found.");
      }

      const credentialsMatch = await compare(password, user.password);

      return credentialsMatch;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static register = async (document) => {
    try {
      const createDoc = await UserDTO.getCreateDocument(document);

      const existingUser = await UserService.getByEmail(createDoc.email);

      if (existingUser) {
        throw new Error("User already registered.");
      }

      return await UserDTO.getLeanDocument(await UserService.create(createDoc));
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
