import GenericRepository from "./generic.repository.js";

export default class ProductRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getById = async (productId) => {
    try {
      return await this.dao.getBy({ _id: productId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByCode = async (code) => {
    try {
      return await this.dao.getBy({ code: code });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAllPictures = async (productId) => {
    try {
      return await this.dao.getAllPictures(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getPictureBy = async (productId, pictureIndex = 0) => {
    try {
      return await this.dao.getPictureBy(productId, pictureIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addOnePicture = async (productId, pictureUrl) => {
    try {
      return await this.dao.addOnePicture(productId, pictureUrl);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addManyPictures = async (productId, picturesList) => {
    try {
      return await this.dao.addManyPictures(productId, picturesList);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updatePicture = async (productId, pictureIndex, pictureUrl) => {
    try {
      return await this.dao.updatePicture(productId, pictureIndex, pictureUrl);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deletePicture = async (productId, pictureIndex) => {
    try {
      return await this.dao.deletePicture(productId, pictureIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  clearPictures = async (productId) => {
    try {
      return this.dao.clearPictures(productId);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
