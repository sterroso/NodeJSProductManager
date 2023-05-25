import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { UserService } from "../services/index.js";
import HttpStatus from "../constants/http.status.js";
import UserDTO from "../services/mongodb/dto/user.dto";
import ResponseObject from "../common/responseObject.js";

dotenv.config();

const auth = async (req, res, next) => {
  const response = new ResponseObject(); // ResponseObject to return errors.

  try {
    let token = undefined;

    if (/^bearer /i.test(req.headers.authorization)) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      response.status = HttpStatus.UNAUTHORIZED;
      response.error = "Resource available for authenticated users only.";

      return res.status(response.statusCode).json(response.toJSON());
    } else {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await UserService.getById(decodedToken.userId);

      if (!user) {
        response.status = HttpStatus.NOT_FOUND;
        response.error = "User not found.";

        return res.status(response.statusCode).json(response.toJSON());
      } else {
        req.user = await UserDTO.getCookie(user);

        next();
      }
    }
  } catch (error) {
    response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.error = error.message;

    return res.status(response.statusCode).json(response.toJSON());
  }
};

export default auth;
