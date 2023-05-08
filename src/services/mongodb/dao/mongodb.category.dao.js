import CategoryModel from "../../../models/mongodb/mongodb.category.model.js";

export default class CategoryDAO {
  static getAll = async (query, options) => {
    try {
      return await CategoryModel.paginate(query, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getById = async (categoryId) => {
    try {
      return await CategoryModel.findOne({ _id: categoryId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getByName = async (categoryName) => {
    try {
      const nameRegExp = new RegExp(categoryName, "gi");

      return await CategoryModel.findOne({ name: nameRegExp });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return await CategoryModel.create(document);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (categoryId, document) => {
    try {
      return await CategoryModel.findOneAndUpdate(
        { _id: categoryId },
        document,
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (categoryId) => {
    try {
      return await CategoryModel.deleteOne({ _id: categoryId });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
