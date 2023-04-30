import * as ProductService from "../services/mongodb/mongodb.product.service.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import HttpStatus from "../constants/http.status.js";
import {
  PAGINATE,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "../constants/app.constants.js";

const isValidIntOption = (value, min = 1) => {
  const numValue = Number(value ?? min - 1);

  return !isNaN(numValue) && numValue >= min && numValue % 1 === 0;
};

export const getAllProducts = async (req, res) => {
  let responseObject = new PaginatedResponseObject();

  const {
    limit,
    page,
    offset,
    search,
    category,
    sortByTitle,
    sortByCategory,
    sortByPrice,
  } = req.query;

  const options = {
    customLabels: PAGINATE.CUSTOM_LABELS,
  };

  options.limit = isValidIntOption(limit) ? Number(limit) : DEFAULT_LIMIT;

  options.page = isValidIntOption(page) ? Number(page) : DEFAULT_PAGE;

  if (isValidIntOption(offset, 0)) {
    options.offset = Number(offset);
  }

  if (/^asc|desc$/i.test(sortByTitle)) {
    options.sort = { title: /^asc$/i.test(sortByTitle) ? 1 : -1 };
  }

  if (/^asc|desc$/i.test(sortByCategory)) {
    if (options?.sort) {
      options.sort.category = /^asc$/i.test(sortByCategory) ? 1 : -1;
    } else {
      options.sort = { category: /^asc$/i.test(sortByCategory) ? 1 : -1 };
    }
  }

  if (/^asc|desc$/i.test(sortByPrice)) {
    if (options?.sort) {
      options.sort.price = /^asc$/i.test(sortByPrice) ? 1 : -1;
    } else {
      options.sort = { price: /^asc$/i.test(sortByPrice) ? 1 : -1 };
    }
  }

  const query = { deleted: false };

  if (search) {
    query.$text = { $search: `${search}` };
  }

  if (category) {
    query.category = new RegExp(`${category}`, "gi");
  }

  try {
    const results = await ProductService.getAllProducts(query, options);

    if (results?.count) {
      responseObject = Object.assign(responseObject, results);
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error =
        "No products were found with the provided parameters.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getProductById = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  try {
    const result = await ProductService.getProductById(productId);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const createProduct = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.CREATED);

  const { body } = req;

  try {
    const result = await ProductService.createProduct(body);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.BAD_REQUEST;
      responseObject.error =
        "Product could not be created with the provided data.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const updateProduct = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  const { body } = req;

  try {
    const result = await ProductService.updateProduct(productId, body);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const deleteProduct = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  try {
    const result = await ProductService.deleteProduct(productId);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const getProductPictures = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  try {
    const result = await ProductService.getProductPictures(productId);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const addProductPicture = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  const { body } = req;

  try {
    const result = await ProductService.addProductPicture(productId, body);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const updateProductPicture = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId, pictureIndex } = req.params;

  const { pictureUrl } = req;

  try {
    const result = await ProductService.updateProductPicture(
      productId,
      pictureIndex,
      pictureUrl
    );

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const deleteProductPicture = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId, pictureIndex } = req.params;

  try {
    const result = await ProductService.deleteProductPicture(
      productId,
      pictureIndex
    );

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};

export const clearProductPictures = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId } = req.params;

  try {
    const result = await ProductService.clearProductPictures(productId);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Id.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON());
};
