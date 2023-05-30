import { UserService } from "../index.js";

export default class SessionService {
  static login = async (email, password) => {
    try {
      const credentialsMatch = await UserService.credentialsMatch(
        email,
        password
      );

      if (!credentialsMatch) return null;

      const user = await UserService.getByEmail(email);

      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static register = async (document) => {
    try {
      const existingUser = await UserService.getByEmail(document.email);

      if (existingUser) {
        throw new Error("User already registered.");
      }

      return await UserService.create(document);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
