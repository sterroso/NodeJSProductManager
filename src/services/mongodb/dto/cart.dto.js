import CartItemDTO from "./cartItem.dto.js";

export default class CartDTO {
  static formats = {
    LIST_ITEM: "list item",
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    LEAN: "lean",
    CREATE: "create",
    UPDATE: "update",
  };

  /**
   * Transforms a MongoDB Cart document into a small JSON Cart object with
   * minimum properties.
   *
   * @param {{_id: import("mongoose").ObjectId, items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}], count?: number, total?: number}} document A MongoDB Cart document.
   * @returns {{id: import("mongoose").ObjectId, count: number, total: number}} A small JSON Cart object.
   */
  static getListItem = (document) =>
    CartDTO.get(document, CartDTO.formats.SMALL);

  /**
   * Transforms a MongoDB Cart document into a lean JSON Cart object.
   *
   * @param {{_id: import("mongoose").ObjectId, items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}], count?: number, total?: number}} document A MongoDB Cart document.
   * @returns {{id: import("mongoose").ObjectId, items?: [{id: import("mongoose").ObjectId, title: string, quantity: number, salesPrice: number, subtotal: number}], count: number, total: number}} A lean JSON Cart object.
   */
  static getLeanDocument = (document) =>
    CartDTO.get(document, CartDTO.formats.LEAN);

  /**
   * Transforms a JSON Cart object to create a new MongoDB Cart document.
   *
   * @param {{items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}]}} document A JSON Cart object.
   * @returns {{items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number}]}} A JSON object with
   * properties formatted to create a new MongoDB Cart document.
   */
  static getCreateDocument = (document) =>
    CartDTO.get(document, CartDTO.formats.CREATE);

  /**
   * Transforms a JSON Cart object to update an existing MongoDB Cart
   * document.
   *
   * @param {{items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}]}} document A JSON Cart object.
   * @returns {{items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number}]}} A JSON object with
   * properties formatted to update an existing MongoDB Cart document.
   */
  static getUpdateDocument = (document) =>
    CartDTO.get(document, CartDTO.formats.UPDATE);

  /**
   * Transforms a Cart document into a predefined JSON object format.
   *
   * @param {{_id?: import("mongoose").ObjectId, items?: [{product: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}], count?: number, total?: number}} document A Cart document to be transformed.
   * @param {string} format A transformation format.
   * @returns {object} A JSON Cart object.
   */
  static get = async (document, format = CartDTO.formats.LEAN) => {
    if (!Object.values(CartDTO.formats).includes(format ?? "none")) {
      throw new Error("Unknown Cart format.");
    }

    switch (format) {
      case CartDTO.formats.LIST_ITEM:
      case CartDTO.formats.SMALL:
        try {
          return {
            id: document._id,
            count: document.items.reduce((acc, item) => acc + item.quantity, 0),
            total: document.items.reduce(
              (acc, item) => acc + item.quantity * item.salesPrice,
              0
            ),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CartDTO.formats.MEDIUM:
      case CartDTO.formats.LARGE:
      case CartDTO.formats.LEAN:
        try {
          return {
            id: document._id,
            items: document.items.map((item) =>
              CartItemDTO.getLeanDocument(item)
            ),
            count: document.items.reduce((acc, item) => acc + item.quantity, 0),
            total: document.items.reduce(
              (acc, item) => acc + item.quantity * item.salesPrice,
              0
            ),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CartDTO.formats.CREATE:
      case CartDTO.formats.UPDATE:
        try {
          return {
            items:
              document?.items || false
                ? document.items.map((item) =>
                    CartItemDTO.getCreateDocument(item)
                  )
                : undefined,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      default:
        throw new Error("Unknown Cart format.");
    }
  };
}
