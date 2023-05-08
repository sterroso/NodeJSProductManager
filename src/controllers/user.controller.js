import { UserService } from "../services";
import HttpStatus from "../constants/http.status.js";
import * as validators from "../common/RequestParameterValidator.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import {
  PAGINATE,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "../constants/app.constants.js";
import UserDTO from "./dto/user.dto.js";
import USER_GENDERS, {
  DEFAULT_USER_GENDER,
} from "../constants/user.genders.js";
import USER_ROLES, { DEFAULT_USER_ROLE_NAME } from "../constants/user.roles";

export const getAllUsers = async (req, res) => {
  let response = new PaginatedResponseObject(HttpStatus.OK);

  const {
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    offset,
    sortByFirstName = "none",
    sortByLastName = "none",
    sortByGender = "none",
    sortByAge = "none",
    name = "none",
    email = "none",
    gender = "none",
    minAge = "none",
    maxAge = "none",
  } = req.params;

  const options = { customLabels: PAGINATE.CUSTOM_LABELS };

  options.limit = validators.isValidLimit(limit)
    ? Number(limit)
    : DEFAULT_LIMIT;

  options.page = validators.isValidPage(page) ? Number(page) : DEFAULT_PAGE;

  if (validators.isValidOffset(offset)) {
    options.offset = Number(offset);
  }

  if (validators.isValidSortingValue(sortByFirstName)) {
    options.sort = { firstName: sortByFirstName === "asc" ? 1 : -1 };
  }

  if (validators.isValidSortingValue(sortByLastName)) {
    if (options?.sort) {
      options.sort.lastName = sortByLastName === "asc" ? 1 : -1;
    } else {
      options.sort = { lastName: sortByLastName === "asc" ? 1 : -1 };
    }
  }

  if (validators.isValidSortingValue(sortByGender)) {
    if (options?.sort) {
      options.sort.gender = sortByGender === "asc" ? 1 : -1;
    } else {
      options.sort = { gender: sortByGender === "asc" ? 1 : -1 };
    }
  }

  if (validators.isValidSortingValue(sortByAge)) {
    if (options?.sort) {
      options.sort.age = sortByAge === "asc" ? 1 : -1;
    } else {
      options.sort = { age: sortByAge === "asc" ? 1 : -1 };
    }
  }

  const query = { deleted: false };

  if (name) {
    query.name = new RegExp(`${name}`, "gi");
  }

  if (email) {
    query.email = `${email}`;
  }

  if (gender) {
    query.gender = new RegExp(`${gender}`, "gi");
  }

  if (validators.isValidParameter(minAge, { min: 0 })) {
    query.age = { $gte: Number(minAge) };
  }

  if (validators.isValidParameter(maxAge, { min: 0 })) {
    if (query?.age) {
      query.age.$lte = Number(maxAge);
    } else {
      query.age = { $lte: Number(maxAge) };
    }
  }

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

  res.status(response.statusCode).json(response.toJSON());
};

export const updateUserById = async (req, res) => {
  const response = new ResponseObject();

  res.status(response.statusCode).json(response.toJSON());
};

export const deleteUserById = async (req, res) => {
  const response = new ResponseObject(HttpStatus.NO_CONTENT);

  res.status(response.statusCode).json(response.toJSON());
};
