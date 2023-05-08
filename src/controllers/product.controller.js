// import * as ProductService from "../services/mongodb/mongodb.product.service.js";
import { ProductService } from "../services/index.js";
import PaginatedQueryParser from "../utils/PaginatedQueryParser.js";
import PaginatedResponseObject from "../common/paginatedResponseObject.js";
import ResponseObject from "../common/responseObject.js";
import HttpStatus from "../constants/http.status.js";

export const getAllProducts = async (req, res) => {
  let responseObject = new PaginatedResponseObject();

  const { query, options } = PaginatedQueryParser(req.query);

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
