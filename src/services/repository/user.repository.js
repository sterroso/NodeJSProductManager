import GenericRepository from "./generic.repository.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (userId) => {
    try {
      const user = await this.dao.getBy({ _id: userId });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByEmail = async (email) => {
    try {
      const user = await this.dao.getBy({ email: email });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  credentialsMatch = async (email, password) => {
    try {
      return await this.dao.credentialsMatch(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
