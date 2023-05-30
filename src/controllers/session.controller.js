import jwt from "jsonwebtoken";

import appConfig from "../config/app.config.js";
import ResponseObject from "../common/responseObject.js";
import HttpStatus from "../constants/http.status.js";
import SessionService from "../services/mongodb/mongodb.session.service.js";

export default class SessionController {
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
    const response = new ResponseObject(HttpStatus.OK);

    const { email, password } = req.body;

    try {
      const { user } = await SessionService.login(email, password);

      if (!user) {
        response.status = HttpStatus.UNAUTHORIZED;
        response.error = "User credentials don't match.";

        return res.status(response.statusCode).json(response.toJSON());
      } else {
        const token = jwt.sign(
          { uid: user.id },
          appConfig.signedCookies.secret,
          {
            expiresIn: appConfig.signedCookies.maxAge,
          }
        );

        response.payload = { message: "User successfully logged in." };

        return res
          .status(response.statusCode)
          .cookie("token", token, {
            httpOnly: true,
            signed: true,
            maxAge: appConfig.signedCookies.maxAge,
          })
          .json(response.toJSON());
      }
    } catch (error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.error = error.message;

      return res.status(response.statusCode).json(response.toJSON());
    }
  };

  static logout = async (req, res) => {
    const response = new ResponseObject();

    try {
      res.clearCookie("token");

      response.payload = { message: "Logout successful." };
    } catch (error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.error = error.message;
    }

    res.status(response.statusCode).json(response.toJSON());
  };
}
