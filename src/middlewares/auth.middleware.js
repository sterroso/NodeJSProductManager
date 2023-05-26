import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { UserService, RoleService } from "../services/index.js";
import HttpStatus from "../constants/http.status.js";
import ResponseObject from "../common/responseObject.js";

dotenv.config();

const auth = async (req, res, next) => {
  const response = new ResponseObject(); // ResponseObject to return errors.

  try {
    const token = req.signedCookies.token;

    if (!token) {
      response.status = HttpStatus.UNAUTHORIZED;
      response.error = "Resource available only for authenticated users.";

      return res.status(response.statusCode).json(response.toJSON());
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userId = decodedToken.id;

    const existingUser = await UserService.getById(userId);

    if (!existingUser) {
      response.status = HttpStatus.NOT_FOUND;
      response.error = "No user was found.";

      return res.status(response.statusCode).json(response.toJSON());
    }

    const existingRole = await RoleService.getById(existingUser.role);

    if (!existingRole) {
      response.status = HttpStatus.NOT_FOUND;
      response.error = "No role was found.";

      return res.status(response.statusCode).json(response.toJSON());
    }

    req.user = existingUser;
    req.role = existingRole;

    next();
  } catch (error) {
    response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.error = error.message;

    return res.status(response.statusCode).json(response.toJSON());
  }
};

export default auth;
