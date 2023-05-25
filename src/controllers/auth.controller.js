import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import HttpStatus from "../constants/http.status.js";
import ResponseObject from "../common/responseObject.js";
import { UserService } from "../services/index.js";
import UserDTO from "../services/mongodb/dto/user.dto.js";

dotenv.config();

export const register = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.CREATED);
  const { email, password, firstName, lastName, dateOfBirth, gender } =
    req.params;

  try {
    const userExists = await UserService.getByEmail(email);

    if (userExists) {
      responseObject.status = HttpStatus.CONFLICT;
      responseObject.error = `There's already a user registered with email "${email}".`;
    } else {
      responseObject.payload = UserDTO.getCookie(
        await UserService.create({
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          gender: gender ?? undefined,
        })
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const login = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.OK);
  const { email, password } = req.params;

  try {
    const user = await UserService.getByEmail(email);

    if (!user) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = `User, with email "${email}" not found.`;
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        responseObject.status = HttpStatus.UNAUTHORIZED;
        responseObject.error = "Either email or password do not match.";
      } else {
        const token = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "24h" }
        );

        responseObject.payload = token;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};
