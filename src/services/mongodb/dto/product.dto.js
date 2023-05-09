import { DEFAULT_CATEGORY_NAME } from "../../../constants/category.constants.js";

class ProductDTO {
  static formats = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    CREATE: "create",
    UPDATE: "update",
  };

  /**
   * Returns a product's id and title, for list items.
   *
   * @param {{_id?: import("mongoose").Types.ObjectId, code?: string, title?: string, description?: string: price?: number, stock?: number, category?: import("mongoose").Types.ObjectId | { _id?: import("mongoose").Types.ObjectId, name: string, description?: string }, pictures?: [string]}} document A product's MongoDB document.
   * @returns a product's id and title.
   */
  static getListItem(document) {
    return ProductDTO.get(document, { format: ProductDTO.formats.SMALL });
  }

  /**
   * Returns a lean product document with unnecessary properties stripped.
   *
   * @param {{_id?: import("mongoose").Types.ObjectId, code?: string, title?: string, description?: string: price?: number, stock?: number, category?: import("mongoose").Types.ObjectId | { _id?: import("mongoose").Types.ObjectId, name: string, description?: string }, pictures?: [string]}} document A product's MongoDB document.
   * @returns a lean product document.
   */
  static getLeanDocument(document) {
    return ProductDTO.get(document, { format: ProductDTO.formats.LARGE });
  }

  /**
   * Returns an object containing properties required to create a new
   * _product_ document in a MongoDB collection.
   *
   * @param {{code: string, title: string, description: string: price: number, stock: number, category?: string}} document A partial product's MongoDB document.
   * @returns an object containing all properties required to create a
   * new _product_ document in a MongoDB collection.
   */
  static getCreateDocument(document) {
    return ProductDTO.get(document, { format: ProductDTO.formats.CREATE });
  }

  /**
   * Returns an object containing properties required to update an existing
   * _product_ document in a MongoDB collection.
   *
   * @param {{title?: string, description?: string: price?: number, stock?: number, category?: string, pictures?: [string]}} document A partial product's MongoDB document.
   * @returns an object containing properties required to update an existing
   * _product_ document in a MongoDB collection.
   */
  static getUpdateDocument(document) {
    return ProductDTO.get(document, { format: ProductDTO.formats.UPDATE });
  }

  /**
   * Returns an object with a subset of properties from the original
   * MongoDB product document.
   *
   * @param {{_id?: import("mongoose").Types.ObjectId, code?: string, title?: string, description?: string: price?: number, stock?: number, category?: import("mongoose").Types.ObjectId | { _id?: import("mongoose").Types.ObjectId, name: string, description?: string }, pictures?: [string]}} document A product's MongoDB document.
   * @param {{format?: string | ProductDTO.formats }} options A transformation format.
   * @returns A document with a subset of properties from the original MongoDB product document.
   */
  static get(document, options = { format: ProductDTO.formats.SMALL }) {
    let transformedCategory = DEFAULT_CATEGORY_NAME;

    switch (options?.format) {
      case ProductDTO.formats.SMALL:
        return {
          id: document._id,
          title: document.title,
        };
      case ProductDTO.formats.MEDIUM:
        return {
          id: document._id,
          code: document.code,
          title: document.title,
          price: document.price,
          stock: document?.stock || 0,
        };
      case ProductDTO.formats.LARGE:
        transformedCategory = DEFAULT_CATEGORY_NAME;

        if (document?.category || false) {
          transformedCategory = document.category?.name || document.category;
        }

        return {
          id: document._id,
          code: document.code,
          title: document.title,
          description: document.description,
          price: document.price,
          stock: document?.stock || 0,
          category: transformedCategory,
          pictures: document?.pictures.map((pic) => new URL(pic)) || [],
        };
      case ProductDTO.formats.CREATE:
        return {
          code: document.code,
          title: document.title,
          description: document.description,
          price: document?.price || 0.01,
          stock: document?.stock || 1,
          category: document?.category || DEFAULT_CATEGORY_NAME,
          pictures: document?.pictures || [],
        };
      case ProductDTO.formats.UPDATE:
        return {
          title: document?.title || undefined,
          description: document?.description || undefined,
          price: document?.price || undefined,
          stock: document?.stock || undefined,
          category: document?.category || undefined,
        };
      default:
        throw new Error("Unrecognized ProductDTO format.");
    }
  }
}

export default ProductDTO;
