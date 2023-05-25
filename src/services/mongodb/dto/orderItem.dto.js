import { ProductService } from "../../index.js";
import {
  DEFAULT_ORDER_ITEM_QUANTITY,
  DEFAULT_ORDER_ITEM_PRICE,
  DEFAULT_ORDER_ITEM_SUBTOTAL,
} from "../../../constants/order.constants.js";

export default class OrderItemDTO {
  static formats = {
    LIST_ITEM: "list item",
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    LEAN: "lean",
    CREATE: "create",
    UPDATE: "update",
  };

  static getListItem = (document) =>
    OrderItemDTO.get(document, OrderItemDTO.formats.LIST_ITEM);

  static getLeanDocument = (document) =>
    OrderItemDTO.get(document, OrderItemDTO.formats.LEAN);

  static getCreateDocument = (document) =>
    OrderItemDTO.get(document, OrderItemDTO.formats.CREATE);

  static getUpdateDocument = (document) =>
    OrderItemDTO.get(document, OrderItemDTO.formats.UPDATE);

  /**
   *
   * @param {{product?: import("mongoose").ObjectId, title?: string, quantity?: number, salesPrice?: number, subtotal?: number}} document
   * @param {string} format
   * @returns {{title?: string, quantity?: number, salesPrice?: number, subtotal?: number}}
   */
  static get = async (document, format) => {
    if (!Object.values(OrderItemDTO.formats).includes(format ?? "none")) {
      throw new Error("Unknown OrderItemDTO format.");
    }

    switch (format) {
      case OrderItemDTO.formats.LIST_ITEM:
      case OrderItemDTO.formats.SMALL:
        return {
          product: document?.title || "",
          subtotal: document?.subtotal || DEFAULT_ORDER_ITEM_SUBTOTAL,
        };
      case OrderItemDTO.formats.MEDIUM:
      case OrderItemDTO.formats.LARGE:
      case OrderItemDTO.formats.LEAN:
        return {
          product: document?.title || "",
          quantity: document?.quantity || DEFAULT_ORDER_ITEM_QUANTITY,
          salesPrice: document?.salesPrice || DEFAULT_ORDER_ITEM_PRICE,
          subtotal: document?.subtotal || DEFAULT_ORDER_ITEM_SUBTOTAL,
        };
      case OrderItemDTO.formats.CREATE:
        if (!(document?.product || false) && !document?.title) {
          throw new Error(
            "It is mandatory to provide an existing product's Id."
          );
        }

        try {
          const orderItem = {
            title: document?.title || "",
            quantity: document?.quantity || DEFAULT_ORDER_ITEM_QUANTITY,
            salesPrice: document?.salesPrice || DEFAULT_ORDER_ITEM_PRICE,
            subtotal:
              document?.subtotal || orderItem.quantity * orderItem.salesPrice,
          };

          if (document?.product || false) {
            const product = await ProductService.getById(document.product);

            if (!product) {
              throw new Error("Product not found.");
            }

            orderItem.title = product.title;
            orderItem.salesPrice = document?.salesPrice || product.price;
            orderItem.subtotal = orderItem.quantity * orderItem.salesPrice;
          }

          return orderItem;
        } catch (error) {
          throw new Error(error.message);
        }

      // The only properties that can be updated in an Order Item are:
      // title (to add/modify product's characteristics as color, size,
      // fabric, engraved or printed text, and other properties that
      // admit some form of variability), quantity (increase or decrease
      // a specific item count), and salesPrice (discounts or surcharges)
      case OrderItemDTO.formats.UPDATE:
        if (
          !(document?.title || false) ||
          !(document?.quantity || false) ||
          !(document?.salesPrice || false)
        ) {
          throw new Error(
            "Must provide a valid value for, at least, one parameter: title, quantity and/or salesPrice."
          );
        }

        try {
          return {
            title: document?.title || undefined,
            quantity: document?.title || undefined,
            salesPrice: document?.salesPrice || undefined,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      default:
        throw new Error("Unknown OrderItemDTO format.");
    }
  };
}
