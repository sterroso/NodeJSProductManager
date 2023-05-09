import GenericRepository from "./generic.repository.js";

export default class CategoryRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (categoryId) => {
    try {
      return await this.dao.getBy({ _id: categoryId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByName = async (name) => {
    try {
      return await this.dao.getBy({ name: name });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
