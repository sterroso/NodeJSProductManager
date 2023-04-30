import { DEFAULT_USER_ROLE_NAME } from "../../constants/user.roles.js";
import { DEFAULT_USER_GENDER } from "../../constants/user.genders.js";

class UserDTO {
  static formats = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
  };

  /**
   * Returns a small document containing only a user's id and full name.
   *
   * @param {{_id: import("mongoose").Types.ObjectId, email: string, password?: string, firstName: string, lastName: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string}} document
   * @returns A small object contining only user's id and full name.
   */
  static getListItem(document) {
    return UserDTO.get(document, { format: UserDTO.formats.SMALL });
  }

  /**
   * Returns a document containing the user's information to be
   * stored in the session cookie.
   *
   * @param {{_id: import("mongoose").Types.ObjectId, email: string, password?: string, firstName: string, lastName: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string}} document
   * @returns An object contining the user's informatior to be stored
   * in the session cookie.
   */
  static getCookie(document) {
    return UserDTO.get(document, { format: UserDTO.formats.MEDIUM });
  }

  /**
   * Returns the user's information, excluding sensitive data.
   *
   * @param {{_id: import("mongoose").Types.ObjectId, email: string, password?: string, firstName: string, lastName: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string}} document
   * @returns All of the user's information, except sensitive data.
   */
  static getSafeDocument(document) {
    return UserDTO.get(document, { format: UserDTO.formats.LARGE });
  }

  /**
   * Returns a document containing a subset of information from the original
   * **user** document returned from MongoDB.
   *
   * @param {{_id: import("mongoose").Types.ObjectId, email: string, password?: string, firstName: string, lastName: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string}} document
   * @param {{ format?: string }} options
   * @returns An object containing only a subset of the provided document.
   */
  static get(document, options = { format: "small" }) {
    switch (options.format) {
      // "small"
      case UserDTO.formats.SMALL:
        return {
          id: `${document._id}`,
          name: `${document.firstName} ${document.lastName}`,
        };
      // "medium"
      case UserDTO.formats.MEDIUM:
        return {
          id: `${document._id}`,
          email: `${document.email}`,
          name: `${document.firstName} ${document.lastName}`,
          role: `${document?.role || DEFAULT_USER_ROLE_NAME}`,
        };
      // "large"
      case UserDTO.formats.LARGE:
        return {
          id: `${document._id}`,
          email: `${document.email}`,
          firstName: `${document.firstName}`,
          lastName: `${document.lastName}`,
          gender: `${document?.gender || DEFAULT_USER_GENDER}`,
          age: document?.age || undefined,
          role: `${document?.role || DEFAULT_USER_ROLE_NAME}`,
        };
      // Anything else
      default:
        throw new Error("Unrecognized format.");
    }
  }
}

export default UserDTO;
