import ProductModel from "../../../models/mongodb/mongodb.product.model.js";
import ProductDTO from "../dto/product.dto.js";

export default class ProductDAO {
  /* ------------------------- Whole products methods ------------------------- */
  static getAll = async (query, options) => {
    try {
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

  static getById = async (productId) => {
    try {
      const result = await ProductModel.findOne({ _id: productId });

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
      const newProduct = await ProductModel.create(
        ProductDTO.getCreateDocument(doc)
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
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productId },
        ProductDTO.getUpdateDocument(doc)
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
  static getAllProductPictures = async (productId) => {
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

  static getPicture = async (productId, pictureIndex = 0) => {
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

      return product.pictures.at(pictureIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static addPicture = async (productId, pictureUrl) => {
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

      return await product.save();
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

      return await product.save();
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

      return await product.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
