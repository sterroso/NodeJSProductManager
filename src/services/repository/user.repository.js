import GenericRepository from "./generic.repository.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
