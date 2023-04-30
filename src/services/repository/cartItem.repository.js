import GenericRepository from "./generic.repository.js";

export default class CartItemRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
