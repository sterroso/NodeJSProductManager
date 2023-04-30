import GenericRepository from "./generic.repository.js";

export default class OrderRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
