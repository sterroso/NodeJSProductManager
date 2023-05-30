import GenericRepository from "./generic.repository.js";
import { RoleService } from "../index.js";
import RoleDTO from "../mongodb/dto/role.dto.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (userId) => {
    try {
      const user = await this.dao.getBy({ _id: userId });

      if (user) {
        const userRole = RoleDTO.getListItem(
          await RoleService.getById(user.role)
        );

        if (userRole) {
          user.role = userRole;
        }

        return user;
      }

      return null;
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

  credentialsMatch = async (email, password) => {
    try {
      return await this.dao.credentialsMatch(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
