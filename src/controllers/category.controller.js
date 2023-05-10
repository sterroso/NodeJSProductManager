import { CategoryService } from "../services/index.js";
import CategoryDTO from "../services/mongodb/dto/category.dto.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import queryParser from "../utils/PaginatedQueryParser.js";
import HttpStatus from "../constants/http.status.js";

export const getAllCategories = async (req, res) => {
  const responseObject = new PaginatedResponseObject();

  const { query, options } = queryParser(req.query);

  try {
    const result = await CategoryService.getAll(query, options);

    if (result.count === 0) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No categories were found.";
    } else {
      responseObject.payload = result.payload;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getCategoryById = async (req, res) => {
  const responseObject = new ResponseObject();

  const { categoryId } = req.params;

  try {
    const result = await CategoryService.getById(categoryId);

    if (!result) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No category was found.";
    } else {
      responseObject.payload = result;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getCategoryByName = async (req, res) => {
  const responseObject = new ResponseObject();

  const { name } = req.params;

  try {
    const result = await CategoryService.getByName(name);

    if (!result) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No category was found.";
    } else {
      responseObject.payload = result;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const createCategory = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.CREATED);

  const { body } = req;

  try {
    const result = await CategoryService.create(
      CategoryDTO.getCreateDocument(body)
    );

    if (!result) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Category could not be created.";
    } else {
      responseObject.payload = result;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const updateCategory = async (req, res) => {
  const responseObject = new ResponseObject();

  const { categoryId } = req.params;

  const { name, description } = req.body;

  try {
    const updateDoc = CategoryDTO.getUpdateDocument({
      name: name,
      description: description,
    });
    const result = await CategoryService.update(categoryId, updateDoc);

    if (!result) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Category could not be updated.";
    } else {
      responseObject.payload = result;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const deleteCategory = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.NO_CONTENT);

  const { categoryId } = req.params;

  try {
    const result = await CategoryService.delete(categoryId);

    if (!result) {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error = "Category could not be deleted.";
    } else {
      responseObject.payload = result;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};
