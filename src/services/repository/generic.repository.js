export default class GenericRepository {
  dao;

  constructor(dao) {
    this.dao = dao;
  }

  getAll = async (query, options) => {
    return await this.dao.getAll(query, options);
  };

  getBy = async (params) => {
    return await this.dao.getBy(params);
  };

  create = async (doc) => {
    return await this.dao.create(doc);
  };

  update = async (id, doc) => {
    return await this.dao.update(id, doc);
  };

  delete = async (id) => {
    return await this.dao.delete(id);
  };
}
