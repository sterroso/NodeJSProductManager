import getBuiltinRoles from "../utils/getBuiltinRoles.js";
import { DEFAULT_USER_ROLE_NAME } from "../constants/role.constants.js";
import { UserService } from "../services/index.js";
import HttpStatus from "../constants/http.status.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import PaginatedQueryParser from "../utils/PaginatedQueryParser.js";
import { ROLES_PERMISSIONS } from "../constants/role.constants.js";

export const getAllUsers = async (req, res) => {
  let response = new PaginatedResponseObject(HttpStatus.OK);

  const { role, user } = req;

  if (!user || !role) {
    response.status = HttpStatus.UNAUTHORIZED;
    response.error = "Must provide credentials to access this resource.";
  } else {
    const isAuthorized = role.canRead.users === ROLES_PERMISSIONS.ALL;

    if (!isAuthorized) {
      response.status = HttpStatus.FORBIDDEN;
      response.error = "Resource not available with the provided credentials.";
    } else {
      const { query, options } = PaginatedQueryParser(req.query, {
        exactSearches: ["email"],
      });

      try {
        const usersPage = await UserService.getAll(query, options);

        if (usersPage.count === 0) {
          response.status = HttpStatus.NOT_FOUND;
          response.error = "No users were found with the specified parameters.";
        } else {
          response = PaginatedResponseObject.parse(usersPage);
        }
      } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.error = error.message;
      }
    }
  }

  res.status(response.statusCode).json(response.toJSON());
};

export const getUserById = async (req, res) => {
  const response = new ResponseObject();

  const { role, user } = req;

  const { userId } = req.params;

  if (!role || !user) {
    response.status = HttpStatus.UNAUTHORIZED;
    response.error = "Must provide credentials to access this resource.";
  } else {
    const isAuthorized =
      role.canRead.users === ROLES_PERMISSIONS.ALL ||
      (role.canRead.users === ROLES_PERMISSIONS.SELF && user.id === userId);

    if (!isAuthorized) {
      response.status = HttpStatus.FORBIDDEN;
      response.error = "Resource not available with the provided credentials.";
    } else {
      try {
        const user = await UserService.getById(userId);

        if (!user) {
          response.status = HttpStatus.NOT_FOUND;
          response.error = "User not found";
        } else {
          response.payload = user;
        }
      } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.error = error.message;
      }
    }
  }

  res.status(response.statusCode).json(response.toJSON());
};

export const getUserByEmail = async (req, res) => {
  const response = new ResponseObject();

  const { role, user } = req;

  const { email } = req.params;

  if (!role || !user) {
    response.status = HttpStatus.UNAUTHORIZED;
    response.error = "Must provide credentials to access this resource.";
  } else {
    const isAuthorized = (role.canRead.users =
      ROLES_PERMISSIONS.ALL ||
      (role.canRead.users = ROLES_PERMISSIONS.SELF && email === user.email));

    if (!isAuthorized) {
      response.status = HttpStatus.FORBIDDEN;
      response.error = "Resource not available with the provided credentials.";
    } else {
      try {
        const user = await UserService.getByEmail(email);

        if (!user) {
          response.status = HttpStatus.NOT_FOUND;
          response.error = "User not found";
        } else {
          response.payload = user;
        }
      } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.error = error.message;
      }
    }
  }

  res.status(response.statusCode).json(response.toJSON());
};

export const createNewUser = async (req, res) => {
  const response = new ResponseObject(HttpStatus.CREATED);

  const { role, user } = req;

  if (!user || !role) {
    response.status = HttpStatus.UNAUTHORIZED;
    response.error = "Must provide credentials to access this resource.";
  } else {
    // To create a user, the requester role must be allowed to create "all" users.
    const isAuthorized = role.canCreate.users === ROLES_PERMISSIONS.ALL;

    if (!isAuthorized) {
      response.status = HttpStatus.FORBIDDEN;
      response.error = "Resource not available with the provided credentials.";
    } else {
      const { body } = req;

      const builtInRoles = await getBuiltinRoles();

      const defaultUserRoleId = builtInRoles.filter(
        (role) => role.name === DEFAULT_USER_ROLE_NAME
      );

      const createUserDoc = { ...body, role: defaultUserRoleId };

      try {
        const newUser = await UserService.create(createUserDoc);

        if (!newUser) {
          response.status = HttpStatus.BAD_REQUEST;
          response.error =
            "User could not be created with the provided parameters.";
        } else {
          response.payload = newUser;
        }
      } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.error = error.message;
      }
    }
  }

  res.status(response.statusCode).json(response.toJSON());
};

export const updateUserById = async (req, res) => {
  const response = new ResponseObject();

  const { userId } = req.params;

  if (!(userId ?? false)) {
    response.status = HttpStatus.BAD_REQUEST;
    response.error = "Must provide the userId parameter.";

    return res.status(response.statusCode).json(response.toJSON());
  }

  const { body } = req;

  if (!(body ?? false)) {
    response.status = HttpStatus.BAD_REQUEST;
    response.error = "Must provide user's update paremeters.";

    return res.status(response.statusCode).json(response.toJSON());
  }

  try {
    response.payload = await UserService.update(userId, body);
  } catch (error) {
    response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.error = error.message;
  }

  res.status(response.statusCode).json(response.toJSON());
};

export const deleteUserById = async (req, res) => {
  const response = new ResponseObject(HttpStatus.NO_CONTENT);

  const { userId } = req.params;

  if (!(userId ?? false)) {
    response.status = HttpStatus.BAD_REQUEST;
    response.error = "Must provide the userId parameter.";

    return res.status(response.statusCode).json(response.toJSON());
  }

  try {
    response.payload = await UserService.delete(userId);
  } catch (error) {
    response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.error = error.message;
  }

  res.status(response.statusCode).json(response.toJSON());
};
