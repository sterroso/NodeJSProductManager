import ProductModel from "../../models/mongodb/mongodb.product.model.js";

export const getAllProducts = async (query, options) => {
  try {
    return await ProductModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (productId) => {
  try {
    return await ProductModel.findOne({ _id: productId });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct = async (data) => {
  try {
    if (data?.code) {
      const codeExists = await ProductModel.findOne({ code: data.code });

      if (codeExists) {
        throw new Error(`Product with code "${data.code}" already exists.`);
      }

      return await ProductModel.create(data);
    } else {
      throw new Error("Missing data parameter value.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (productId, data) => {
  try {
    const productExists = await ProductModel.findById(productId);

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    return await productExists.update(data, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    return await productExists.delete();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductPictures = async (productId) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    return productExists?.pictures || [];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProductPicture = async (productId, url) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    if (productExists?.pictures.some((picture) => picture === url)) {
      throw new Error(
        `Url "${url}" has already been added to the product's picture list.`
      );
    }

    productExists.pictures.unshift(url);

    return await productExists.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductPicture = async (productId, pictureIndex, newUrl) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    if (productExists.pictures.length < pictureIndex) {
      throw new Error();
    }

    productExists.pictures[pictureIndex] = newUrl;

    return await productExists.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductPicture = async (productId, pictureIndex) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    productExists.pictures.splice(pictureIndex, 1);

    return await productExists.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clearProductPictures = async (productId) => {
  try {
    const productExists = await ProductModel.findOne({ _id: productId });

    if (!productExists) {
      throw new Error(`No product, with id (${productId}), was found.`);
    }

    productExists.pictures = [];

    return await productExists.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
