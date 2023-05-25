import UserModel from "../../../models/mongodb/mongodb.user.model.js";
import OrderModel from "../../../models/mongodb/mongodb.order.model.js";
import { ORDER_STATUS } from "../../../constants/order.constants.js";

export default class OrderDAO {
  static getAll = async (query, options) => {
    try {
      return await OrderModel.paginate(query, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getById = async (orderId) => {
    try {
      return await OrderModel.findOne({ _id: orderId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getByUserId = async (userId, orderStatus = undefined) => {
    if (orderStatus ?? false) {
      if (!Object.values(ORDER_STATUS).includes(orderStatus)) {
        throw new Error(`${orderStatus} is not a valid order status.`);
      }
    }

    try {
      const buyer = await UserModel.findOne({ _id: userId });

      if (!buyer) {
        throw new Error("User not found.");
      }

      if (!orderStatus) {
        return await OrderModel.find({ user: buyer._id });
      } else {
        return await OrderModel.find({ user: buyer._id, status: orderStatus });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
