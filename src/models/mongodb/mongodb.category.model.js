import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";

export const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

CategorySchema.plugin(MongoosePaginate);

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
