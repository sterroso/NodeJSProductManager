import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject";
import HttpStatus from "../constants/http.status.js";
import { RoleService } from "../services/index.js";
import QueryParser from "../utils/PaginatedQueryParser.js";

export const getAllRoles = async (req, res) => {
  const responseObject = new PaginatedResponseObject();

  const { query, options } = QueryParser(req);

  try {
    const roles = await RoleService.getAll(query, options);

    if (roles.count === 0) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No roles were found.";
    } else {
      responseObject.payload = roles.payload;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getRoleById = async (req, res) => {
  const responseObject = new ResponseObject();

  const { roleId } = req.params;

  try {
    const role = await RoleService.getById(roleId);

    if (!role) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No role was found.";
    } else {
      responseObject.payload = role;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getRoleByName = async (req, res) => {
  const responseObject = new ResponseObject();

  const { roleName } = req.params;

  try {
    const role = await RoleService.getByName(roleName);

    if (!role) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No role was found.";
    } else {
      responseObject.payload = role;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const createRole = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.CREATED);

  const { body } = req;

  try {
    const newRole = await RoleService.create(body);

    if (!newRole) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Role could not be created.";
    } else {
      responseObject.payload = newRole;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const updateRole = async (req, res) => {
  const responseObject = new ResponseObject();

  const { roleId } = req.params;

  const { body } = req;

  try {
    const updatedRole = await RoleService.update({ _id: roleId }, body);

    if (!updatedRole) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Role could not be updated.";
    } else {
      responseObject.payload = updatedRole;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const deleteRole = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.NO_CONTENT);

  const { roleId } = req.params;

  try {
    const result = await RoleService.delete({ _id: roleId });

    if (!result) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Role could not be deleted.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};
