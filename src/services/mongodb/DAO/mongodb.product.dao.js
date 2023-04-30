import ProductModel from "../../../models/mongodb/mongodb.product.model.js";

export default class ProductDAO {
  getAll = async (query, options) => {
    try {
      return await ProductModel.paginate(query, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getBy = async (productId) => {
    try {
      return await ProductModel.findOne({ _id: productId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (doc) => {
    try {
      return await ProductModel.create(doc);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (productId, doc) => {
    try {
      return await ProductModel.findOneAndUpdate({ _id: productId }, doc);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (productId) => {
    try {
      return await ProductModel.findOneAndDelete({ _id: productId });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
