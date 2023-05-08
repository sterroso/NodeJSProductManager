import CartModel from "../../../models/mongodb/mongodb.cart.model.js";
import UserModel from "../../../models/mongodb/mongodb.user.model.js";

export default class CartDAO {
  static getAll = async (query, options) => {
    try {
      return await CartModel.paginate(query, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getById = async (cartId) => {
    try {
      return await CartModel.findOne({ _id: cartId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getByUserId = async (userId) => {
    try {
      const owner = await UserModel.findOne({ _id: userId });

      if (!owner) {
        throw new Error("No user was found.");
      }

      if (!(owner?.cart || false)) {
        throw new Error("User has no cart.");
      }

      return await CartModel.findOne({ _id: owner.cart });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static create = async (document) => {
    try {
      return await CartModel.create(document);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static createForUser = async (userId, document) => {
    try {
      const owner = await UserModel.findOne({ _id: userId });

      if (!owner) {
        throw new Error("No user was found.");
      }

      if (owner?.cart || false) {
        throw new Error("User already owns a cart.");
      }

      const newCart = await CartModel.create(document);

      owner.cart = newCart._id;

      await owner.save();

      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static updateById = async (cartId, document) => {
    try {
      return await CartModel.findOneAndUpdate({ _id: cartId }, document, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static updateByUserId = async (userId, document) => {
    try {
      const owner = await UserModel.findOne({ _id: userId });

      if (!owner) {
        throw new Error("No user was found.");
      }

      if (!(owner?.cart || false)) {
        throw new Error("User has no cart.");
      }

      return await CartModel.findOneAndUpdate({ _id: owner.cart }, document, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static clearById = async (cartId) => {
    try {
      const cart = await CartModel.findOne({ _id: cartId });

      if (!cart) {
        throw new Error("Cart not found.");
      }

      cart.items = [];

      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static clearByUserId = async (userId) => {
    try {
      const owner = await UserModel.findOne({ _id: userId });

      if (!owner) {
        throw new Error("User not found.");
      }

      if (!(owner?.cart || false)) {
        throw new Error("User has no cart.");
      }

      return await CartModel.findOneAndUpdate(
        { _id: owner.cart },
        { items: [] },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteById = async (cartId) => {
    try {
      return await CartModel.findOneAndDelete({ _id: cartId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteByUserId = async (userId) => {
    try {
      const owner = await UserModel.findOne({ _id: userId });

      if (!owner) {
        throw new Error("No user was found.");
      }

      if (!(owner?.cart || false)) {
        throw new Error("User has no cart.");
      }

      return await CartModel.findOneAndDelete({ _id: owner.cart });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
