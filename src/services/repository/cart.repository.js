import GenericRepository from "./generic.repository.js";

export default class CartRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
