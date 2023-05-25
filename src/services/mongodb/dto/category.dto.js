export default class CategoryDTO {
  static formats = {
    SMALL: "small",
    LEAN: "lean",
    MEDIUM: "medium",
    LARGE: "complete",
    CREATE: "create",
    UPDATE: "update",
  };

  static getListItem = (document) =>
    CategoryDTO.get(document, CategoryDTO.formats.SMALL);

  static getLeanDocument = (document) =>
    CategoryDTO.get(document, CategoryDTO.formats.LEAN);

  static getCreateDocument = (document) =>
    CategoryDTO.get(document, CategoryDTO.formats.CREATE);

  static getUpdateDocument = (document) =>
    CategoryDTO.get(document, CategoryDTO.formats.UPDATE);

  /**
   * Transforms input into a lean JSON document containing category related
   * properties. It might be suitable to clean a MongoDB document, or to
   * prepare user input for CREATE and UPDATE operations.
   *
   * @param {{_id?: import("mongoose").ObjectId, name?: string, description?: string}} document An input document.
   * @param {string} format A transformation format.
   * @returns {object} A JSON document containing category related properties.
   */
  static get = (document, format = CategoryDTO.formats.LEAN) => {
    if (!(document || false)) {
      throw new Error("Must provide a document to transform.");
    }

    switch (format ?? CategoryDTO.formats.LEAN) {
      case CategoryDTO.formats.SMALL:
        try {
          return {
            id: document._id,
            name: document.name,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CategoryDTO.formats.LEAN:
      case CategoryDTO.formats.MEDIUM:
      case CategoryDTO.formats.COMPLETE:
        try {
          return {
            id: document._id,
            name: document.name,
            description: document?.description || "",
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CategoryDTO.formats.CREATE:
        try {
          if (!(document?.name || false)) {
            throw new Error(
              "Category name is a mandatory property. You must provide a value."
            );
          }

          return {
            name: document.name.toLowerCase(),
            description: document?.description || undefined,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      case CategoryDTO.formats.UPDATE:
        try {
          if (!(document?.name || false) && !(document?.description || false)) {
            throw new Error("Must provide at least one property to update.");
          }

          return {
            name: document?.name?.toLowerCase() || undefined,
            description: document?.description || undefined,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      default:
        throw new Error("Tansformation format not recognized.");
    }
  };
}
