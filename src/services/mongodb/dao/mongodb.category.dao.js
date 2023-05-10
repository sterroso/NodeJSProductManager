import CategoryModel from "../../../models/mongodb/mongodb.category.model.js";
import CategoryDTO from "../dto/category.dto.js";

export default class CategoryDAO {
  static getAll = async (query, options) => {
    try {
      const results = await CategoryModel.paginate(query, options);

      if (results.count === 0) {
        throw new Error("No categories were found.");
      }

      results.payload = results.payload.map((category) =>
        CategoryDTO.getLeanDocument(category)
      );

      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getBy = async (query) => {
    try {
      const result = await CategoryModel.findOne(query);

      if (!result) {
        throw new Error("No category was found.");
      }

      return CategoryDTO.getLeanDocument(result);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static exists = async (query) => {
    try {
      return await CategoryModel.exists(query);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return CategoryDTO.getLeanDocument(await CategoryModel.create(document));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static update = async (categoryId, document) => {
    try {
      return CategoryDTO.getLeanDocument(
        await CategoryModel.findOneAndUpdate({ _id: categoryId }, document, {
          new: true,
        })
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
