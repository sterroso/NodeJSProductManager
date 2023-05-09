import ProductModel from "../../../models/mongodb/mongodb.product.model.js";
import ProductDTO from "../dto/product.dto.js";
import { DEFAULT_CATEGORY_NAME } from "../../../constants/category.constants.js";
import CategoryDAO from "./mongodb.category.dao.js";

export default class ProductDAO {
  /* ------------------------- Whole products methods ------------------------- */
  static getAll = async (query, options) => {
    try {
      options = {
        ...options,
        populate: { path: "category", select: "name -_id" },
      };

      const result = await ProductModel.paginate(query, options);

      if (result.count > 0) {
        result.payload = result.payload.map((doc) =>
          ProductDTO.getLeanDocument(doc)
        );

        return result;
      } else {
        throw new Error("Products not found.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const result = await ProductModel.findOne(query).populate({
        path: "category",
        select: "name -_id",
      });

      if (!result) {
        throw new Error("Product not found.");
      }

      return ProductDTO.getLeanDocument(result);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (doc) => {
    try {
      const categoryRe = new RegExp(
        `${doc?.category || DEFAULT_CATEGORY_NAME}`,
        "i"
      );

      const existingCategory = await CategoryDAO.exists({
        name: categoryRe,
      });

      const parsedCategory = existingCategory
        ? existingCategory
        : await CategoryDAO.create({
            name: (doc?.category || DEFAULT_CATEGORY_NAME).toLowerCase(),
          });

      const newProduct = await ProductModel.create(
        ProductDTO.getCreateDocument({ ...doc, category: parsedCategory })
      );

      if (!newProduct) {
        throw new Error("Product could not be created.");
      }

      return ProductDTO.getLeanDocument(newProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (productId, doc) => {
    try {
      const categoryRe = new RegExp(
        `${doc?.category || DEFAULT_CATEGORY_NAME}`,
        "i"
      );

      const existingCategory = await CategoryDAO.exists({ name: categoryRe });

      const parsedCategory = existingCategory
        ? existingCategory
        : await CategoryDAO.create({
            name: (doc?.category || DEFAULT_CATEGORY_NAME).toLowerCase(),
          });

      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productId },
        ProductDTO.getUpdateDocument({ ...doc, category: parsedCategory })
      );

      if (!updatedProduct) {
        throw new Error("Product could not be updated.");
      }

      return ProductDTO.getLeanDocument(updatedProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (productId) => {
    try {
      return await ProductModel.findOneAndDelete({ _id: productId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /* --------------------- Only product's pictures methods -------------------- */
  static getAllPictures = async (productId) => {
    if (!productId) {
      throw new Error("A product's Id must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      return product?.pictures || [];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getPictureBy = async (productId, pictureIndex = 0) => {
    if (!productId) {
      throw new Error("A valid product's Id must be provided.");
    }

    if (!(pictureIndex ?? false)) {
      throw new Error("A valid product's picture index must be provided.");
    }

    try {
      pictureIndex = Number(pictureIndex);

      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      if (pictureIndex >= (product?.pictures || []).length) {
        throw new RangeError("Picture index out of bounds.");
      }

      return product.pictures.at(pictureIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static addOnePicture = async (productId, pictureUrl) => {
    if (!productId) {
      throw new Error("A valid product's Id must be provided.");
    }

    if (!(pictureUrl ?? false)) {
      throw new Error("A picture's URL must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      product.pictures.push(pictureUrl);

      return ProductDTO.getLeanDocument(await product.save());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static addManyPictures = async (productId, picturesList) => {
    if (!(productId ?? false)) {
      throw new Error("A valid product's Id must be provided.");
    }

    if (!(picturesList ?? false)) {
      throw new Error("A list of pictures must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!(product ?? false)) {
        throw new Error("Product not found.");
      }

      product.pictures = product.pictures.concat(picturesList);

      return ProductDTO.getLeanDocument(await product.save());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static updatePicture = async (productId, pictureIndex, pictureUrl) => {
    if (!productId) {
      throw new Error("A valid product's Id must be provided.");
    }

    if (!(pictureIndex ?? false)) {
      throw new Error("A valid product's picture index must be provided.");
    }

    if (!(pictureUrl ?? false)) {
      throw new Error("A picture's URL must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      if (pictureIndex >= (product?.pictures || []).length) {
        throw new RangeError("Picture index out of bounds.");
      }

      product.pictures.splice(pictureIndex, 1, pictureUrl);

      return ProductDTO.getLeanDocument(await product.save());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deletePicture = async (productId, pictureIndex) => {
    if (!productId) {
      throw new Error("A valid product's Id must be provided.");
    }

    if (!(pictureIndex ?? false)) {
      throw new Error("A valid product's picture index must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      if (pictureIndex >= (product?.pictures || []).length) {
        throw new RangeError("Picture index out of bounds.");
      }

      product.pictures.splice(pictureIndex, 1);

      return ProductDTO.getLeanDocument(await product.save());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static clearPictures = async (productId) => {
    if (!productId) {
      throw new Error("A valid product's Id must be provided.");
    }

    try {
      const product = await ProductModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found.");
      }

      product.pictures = [];

      return ProductDTO.getLeanDocument(await product.save());
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
