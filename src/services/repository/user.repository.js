import GenericRepository from "./generic.repository.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (userId) => {
    try {
      return await this.dao.getBy({ _id: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByEmail = async (email) => {
    try {
      return await this.dao.getBy({ email: email });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
