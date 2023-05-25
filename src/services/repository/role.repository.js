import GenericRepository from "./generic.repository.js";

export default class RoleRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (roleId) => {
    try {
      return await this.dao.getBy({ _id: roleId });
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
