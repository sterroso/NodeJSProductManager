import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

export const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Product unique code is required."],
      minLength: 3,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required."],
      minLength: 3,
    },
    description: {
      type: String,
      required: [true, "Product description es required."],
      minLength: 3,
    },
    price: {
      type: Number,
      required: [true, "Product price is requied."],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required."],
      validate: {
        validator: (value) => {
          const numValue = Number(value ?? -1);
          return !isNaN(numValue) && numValue >= 0 && numValue % 1 === 0;
        },
        message: (props) =>
          `${props.value} is not a valid product-stock value. A valid product-stock value mus be an integer greater o equal to zero (0).`,
      },
    },
    category: {
      type: String,
      required: [true, "Product category name is required."],
    },
    pictures: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

ProductSchema.plugin(MongoosePaginate);

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
