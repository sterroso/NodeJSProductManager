import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import ResponseObject from "../common/responseObject.js";
import HttpStatus from "../constants/http.status.js";
import { UserService } from "../services/index.js";
import UserDTO from "../services/mongodb/dto/user.dto.js";
import SessionService from "../services/mongodb/mongodb.session.service.js";

dotenv.config();

export default class SessionController {
  static #DEFAULT_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;

  static register = async (req, res) => {
    const response = new ResponseObject(HttpStatus.CREATED);

    const { body } = req;

    try {
      const newUser = await SessionService.register(body);

      if (!newUser) {
        response.status = HttpStatus.BAD_REQUEST;
        response.error = "User could not be registered.";
      } else {
        response.payload = newUser;
      }
    } catch (error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.error = error.message;
    }

    return res.status(response.statusCode).json(response.toJSON());
  };

  static login = async (req, res) => {
    const response = new ResponseObject(HttpStatus.NO_CONTENT);

    const { email, password } = req.body;

    try {
      if (await SessionService.login(email, password)) {
        const userCookie = await UserDTO.getCookie(
          await UserService.getByEmail(email)
        );

        const token = jwt.sign(userCookie, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "24h",
        });

        return res.status(response.statusCode).cookie("token", token, {
          httpOnly: true,
          signed: true,
          maxAge: SessionController.#DEFAULT_COOKIE_MAX_AGE,
        });
      } else {
        response.status = HttpStatus.UNAUTHORIZED;
        response.error = "User credentials don't match.";

        return res.staus(response.statusCode).json(response.toJSON());
      }
    } catch (error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.error = error.message;

      return res.status(response.statusCode).json(response.toJSON());
    }
  };
}
