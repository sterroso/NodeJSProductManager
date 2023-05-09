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
    const results = await ProductService.getAll(query, options);

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
    const result = await ProductService.getById(productId);

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

export const getProductByCode = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productCode } = req.params;

  try {
    const result = await ProductService.getByCode(productCode);

    if (result) {
      responseObject.payload = result;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No product was found with the provided Code.";
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error.message;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON);
};

export const createProduct = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.CREATED);

  const { body } = req;

  try {
    const result = await ProductService.create(body);

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
    const result = await ProductService.update(productId, body);

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
    const result = await ProductService.delete(productId);

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
    const result = await ProductService.getAllPictures(productId);

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

export const getProductPictureAt = async (req, res) => {
  const responseObject = new ResponseObject();

  const { productId, pictureIndex } = req.params;

  if (!(productId ?? false) || !(pictureIndex ?? false)) {
    responseObject.status = HttpStatus.BAD_REQUEST;
    responseObject.error =
      "Parameters 'productId' and 'pictureIndex' are mandatory.";
    return res.status(responseObject.statusCode).json(responseObject.toJSON());
  }

  try {
    const picture = await ProductService.getPictureBy(productId, pictureIndex);

    if (!picture) {
      responseObject.status = HttpStatus.NOT_FOUND;
      responseObject.error = "No picture was found.";
    } else {
      responseObject.payload = picture;
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

  const { pictureUrl, pictureList } = req.body;

  if (!(pictureUrl ?? false) && !(pictureList ?? false)) {
    responseObject.status = HttpStatus.BAD_REQUEST;
    responseObject.error =
      "Must provide a value for either 'pictureUrl' or 'pictureList' parameters.";

    return res.status(responseObject.statusCode).json(responseObject.toJSON());
  }

  try {
    let result;

    if (pictureList) {
      const pictureListArray = Array.from(pictureList);

      if (pictureUrl ?? false) {
        pictureListArray.push(pictureUrl);
      }

      result = await ProductService.addManyPictures(productId, pictureList);
    } else {
      result = await ProductService.addOnePicture(productId, pictureUrl);
    }

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

  const { pictureUrl } = req.body;

  try {
    const result = await ProductService.updatePicture(
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
    const result = await ProductService.deletePicture(productId, pictureIndex);

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
    const result = await ProductService.clearPictures(productId);

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
