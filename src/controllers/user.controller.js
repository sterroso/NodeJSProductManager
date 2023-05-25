import { UserService } from "../services/index.js";
import HttpStatus from "../constants/http.status.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import PaginatedQueryParser from "../utils/PaginatedQueryParser.js";
import UserDTO from "../services/mongodb/dto/user.dto.js";

export const getAllUsers = async (req, res) => {
  let response = new PaginatedResponseObject(HttpStatus.OK);

  const { query, options } = PaginatedQueryParser(req.query, ["email"]);

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

  res.status(response.statusCode).json(response.toJSON());
};

export const getUSerById = async (req, res) => {
  const response = new ResponseObject();

  res.status(response.statusCode).json(response.toJSON());
};

export const getUserByEmail = async (req, res) => {
  const response = new ResponseObject();

  res.status(response.statusCode).json(response.toJSON());
};

export const createNewUser = async (req, res) => {
  const response = new ResponseObject(HttpStatus.CREATED);

  const { body } = req;

  try {
    response.payload = await UserService.create(body);
  } catch (error) {
    response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.error = error.message;
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

  try {
    const updateDoc = UserDTO.get(req.body, UserDTO.formats.UPDATE);

    response.payload = await UserService.update(userId, updateDoc);
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
