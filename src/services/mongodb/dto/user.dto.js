import { hashSync } from "bcrypt";
import { DEFAULT_SALT_ROUNDS } from "../../../constants/app.constants.js";
import USER_GENDERS, {
  DEFAULT_USER_GENDER,
} from "../../../constants/user.genders.js";

class UserDTO {
  static formats = {
    SMALL: "small",
    COOKIE: "cookie",
    MEDIUM: "medium",
    LARGE: "large",
    LEAN: "lean",
    CREATE: "create",
    UPDATE: "update",
    UPDATE_EMAIL: "update email",
    UPDATE_PASSWORD: "update password",
    CONFIRM_PASSWORD: "confirm password",
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
    return UserDTO.get(document, { format: UserDTO.formats.COOKIE });
  }

  /**
   * Returns the user's information, excluding sensitive data.
   *
   * @param {{_id: import("mongoose").Types.ObjectId, email: string, password?: string, firstName: string, lastName: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string}} document
   * @returns All of the user's information, except sensitive data.
   */
  static getLeanDocument = (document) =>
    UserDTO.get(document, { format: UserDTO.formats.LEAN });

  static getCreateDocument = (document) =>
    UserDTO.get(document, { format: UserDTO.formats.CREATE });

  static getUpdateDocument = (document) =>
    UserDTO.get(document, { format: UserDTO.formats.UPDATE });

  /**
   * Returns a document containing a subset of information from the original
   * **user** document returned from MongoDB.
   *
   * @param {{_id?: import("mongoose").Types.ObjectId, email?: string, password?: string, firstName?: string, lastName?: string, gender?: string, dateOfBirth?: Date, age?: number, role?: string, passwordResetKey?: string, oldPassword?: string, newPassword?: string, emailConfirmationToken?: string}} document
   * @param {{ format?: string }} options
   * @returns An object containing only a subset of the provided document.
   */
  static get(document, options = { format: UserDTO.formats.LEAN }) {
    switch (options.format) {
      case UserDTO.formats.SMALL:
        return {
          id: document?._id || document?.id || undefined,
          name: `${document.firstName} ${document.lastName}`,
        };
      case UserDTO.formats.COOKIE:
        return {
          id: document?._id || document?.id || undefined,
          name: `${document.firstName} ${document.lastName}`,
          role: document?.role || undefined,
        };
      case UserDTO.formats.MEDIUM:
        return {
          id: document?._id || document?.id || undefined,
          email: document?.email || undefined,
          name: `${document.firstName} ${document.lastName}`,
          role: document?.role || undefined,
        };
      case UserDTO.formats.LARGE:
      case UserDTO.formats.LEAN:
        return {
          id: document?._id || document?.id || undefined,
          email: document?.email || undefined,
          firstName: document?.firstName || undefined,
          lastName: document?.lastName || undefined,
          gender: document?.gender || undefined,
          age: document?.age || undefined,
          role: document?.role || undefined,
        };
      case UserDTO.formats.CREATE:
        return {
          email: document?.email || undefined,
          password: hashSync(document?.password || "", DEFAULT_SALT_ROUNDS),
          firstName: document?.firstName || undefined,
          lastName: document?.lastName || undefined,
          dateOfBirth: !isNaN(Date.parse(document?.dateOfBirth || ""))
            ? Date.parse(document.dateOfBirth)
            : undefined,
          gender: document?.gender || DEFAULT_USER_GENDER,
          role: document?.role || undefined,
        };
      case UserDTO.formats.UPDATE:
        try {
          /* ------------- At least, one value must be provided for update ------------ */
          if (
            !(document?.firstName || false) &&
            !(document?.lastName || false) &&
            !(document?.dateOfBirth || false) &&
            !(document?.gender || false)
          ) {
            throw new Error(
              "Must provide, at least, one parameter to update (first name, last name, date of birth, or gender)."
            );
          }

          /* ------ Check if value passed, for date of birth parameter, is valid. ----- */
          if (!(document?.dateOfBirth || false)) {
            document.dateOfBirth = undefined;
          } else {
            const dateInMillis = Date.parse(document.dateOfBirth);
            document.dateOfBirth = isNaN(dateInMillis)
              ? undefined
              : new Date(dateInMillis);
          }

          /* --------- Check is value passed, for gender parameter, is valid. --------- */
          if (
            !Object.values(USER_GENDERS).includes(
              document?.gender || "undefined"
            )
          ) {
            document.gender = undefined;
          }

          const transformedObject = {
            firstName: document?.firstName || undefined,
            lastName: document?.lastName || undefined,
            dateOfBirth: document.dateOfBirth,
            gender: document.gender,
          };

          if (
            Object.values(transformedObject).every((param) => !(param ?? false))
          ) {
            throw new Error("No valid parameters were received.");
          }

          return transformedObject;
        } catch (error) {
          throw new Error(error.message);
        }
      case UserDTO.formats.UPDATE_EMAIL:
        try {
          /* ----------------- Check if parameter email contains data. ---------------- */
          if (!(document?.email || false)) {
            throw new Error("Must provide a value for e-mail parameter.");
          }

          return {
            email: document.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case UserDTO.formats.UPDATE_PASSWORD:
        try {
          if (!(document?.email || false)) {
            throw new Error(
              "It is mandatory to provide a value for the e-mail parameter."
            );
          }

          if (
            !(document?.oldPassword || false) ||
            !(document?.passwordResetKey || false)
          ) {
            throw new Error(
              "It is mandatory to provide the old password or a password reset key."
            );
          }

          if (!(document?.newPassword || false)) {
            throw new Error("It is mandatory to provide a new password.");
          }

          return {
            email: document.email,
            resetToken:
              document?.oldPassword || document?.passwordResetKey || undefined,
            newPassword: hashSync(document.newPassword, DEFAULT_SALT_ROUNDS),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case UserDTO.formats.CONFIRM_PASSWORD:
        try {
          if (!(document?.email || false)) {
            throw new Error(
              "It is mandatory to provide a value for the e-mail parameter."
            );
          }

          if (!(document?.emailConfirmationToken || false)) {
            throw new Error(
              "It is mandatory to provide an e-mail confirmation token."
            );
          }

          return {
            email: document.email,
            confirmation: document.emailConfirmationToken,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      default:
        throw new Error("Unrecognized UserDTO format.");
    }
  }
}

export default UserDTO;
