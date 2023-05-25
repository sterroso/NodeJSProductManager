import { ProductService } from "../../index.js";

export default class CartItemDTO {
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
   * Transforms a Mongo Cart Item subdocument into a populated small JSON
   * Object to be displayed as a List Item.
   *
   * @param {{_id: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}} document A MongoDB Cart Item subdocument.
   * @returns {{id: import("mongoose").ObjectId, title: string}} A JSON CartItem object with minimum properties.
   */
  static getListItem = async (document) =>
    await CartItemDTO.get(document, CartItemDTO.formats.LIST_ITEM);

  /**
   * Transforms a Mongo Cart Item subdocument into a populated lean JSON
   * Object.
   *
   * @param {{_id: import("mongoose").ObjectId, quantity: number, salesPrice: number, subtotal?: number}} document A MongoDB Cart Item subdocument.
   * @returns {{id: import("mongoose").ObjectId, title: string, quantity: number, salesPrice: number, subtotal: number}} A lean JSON CartItem object.
   */
  static getLeanDocument = async (document) =>
    await CartItemDTO.get(document, CartItemDTO.formats.LEAN);

  /**
   * Cleans and transforms a JSON object to a document with all properties
   * required to create a new MongoDB CartItem subdocument.
   *
   * @param {{product: import("mongoose").ObjectId, quantity: number, salesPrice?: number}} document An object containing
   * properties to create a new Cart Item subdocument.
   * @returns {{product: import("mongoose").ObjectId, quantity: number, salesPrice: number}} A formatted JSON CartItem object.
   */
  static getCreateDocument = async (document) =>
    await CartItemDTO.get(document, CartItemDTO.formats.CREATE);

  /**
   * Cleans and transforms a JSON object to a document with, at least, one
   * property (quantity or salesPrice) required to update an existing MongoDB
   * CartItem subdocument.
   *
   * @param {{quantity?: number, salesPrice?: number}} document An object
   * containing, at least, one property (quantity or salesPrice), required
   * to update an existing MongoDB CartItem subdocument.
   * @returns {{quantity?: number, salesPrice?: number}} A formatted JOSN CartItem object.
   */
  static getUpdateDocument = async (document) =>
    await CartItemDTO.get(document, CartItemDTO.formats.UPDATE);

  /**
   * Transforms a document into a predefined Cart Item Object format.
   *
   * @param {{_id?: import("mongoose").ObjectId, product?: string, quantity?: number, salesPrice?: number}} document An object containing a Cart Item document.
   * @param {string} format A cart item transformation format.
   * @returns {{id?: import("mongoose").ObjectId, title?: string, quantity?: number, salesPrice?: number, subtotal?: number}} A formatted cart item object.
   */
  static get = async (document, format = CartItemDTO.formats.LEAN) => {
    if (!Object.values(CartItemDTO.formats).includes(format ?? "none")) {
      throw new Error("Unknown CartItemDTO format.");
    }

    switch (format) {
      case CartItemDTO.formats.LIST_ITEM:
      case CartItemDTO.formats.SMALL:
        if (!(document?._id || false)) {
          throw new Error("It is mandatory to provide a product id.");
        }

        try {
          const product = await ProductService.getById(document._id);

          if (!(product ?? false)) {
            throw new Error("Product not found.");
          }

          return {
            id: product._id,
            title: product.title,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CartItemDTO.formats.MEDIUM:
      case CartItemDTO.formats.LARGE:
      case CartItemDTO.formats.LEAN:
        if (!document?.product || false) {
          throw new Error("It is mandatory to provide a product id.");
        }

        try {
          const product = await ProductService.getById(document.product);

          if (!(product ?? false)) {
            throw new Error("Product not found.");
          }

          return {
            id: product._id,
            title: product.title,
            quantity: document?.quantity || 0,
            salesPrice: document?.salesPrice || 0,
            subtotal: (document?.quantity || 0) * (document?.salesPrice || 0),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CartItemDTO.formats.CREATE:
        if (!(document?.product || false) && !(document?.quantity || false)) {
          throw new Error(
            "It is mandatory to provide values for parameters product and quantity."
          );
        }

        try {
          const product = await ProductService.getById(document.product);

          if (!product) {
            throw new Error("Product not found.");
          }

          return {
            product: document.product,
            quantity: document.quantity,
            salesPrice: document?.salesPrice || product.price,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CartItemDTO.formats.UPDATE:
        if (
          !(document?.quantity || false) ||
          !(document?.salesPrice || false)
        ) {
          throw new Error(
            "It is mandatory to provide value for, at least, one parameter."
          );
        }

        return {
          quantity: document?.quantity || undefined,
          salesPrice: document?.salesPrice || undefined,
        };
      default:
        throw new Error("Unknown CartItemDTO format.");
    }
  };
}
