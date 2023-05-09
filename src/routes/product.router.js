import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductById);

router.post("/", ProductController.createProduct);

router.put("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteProduct);

router.get("/:productId/pictures", ProductController.getProductPictures);

router.get(
  "/:productId/pictures/:pictureIndex",
  ProductController.getProductPictureAt
);

router.post("/:productId/pictures", ProductController.addProductPicture);

router.put(
  "/:productId/pictures/:pictureIndex",
  ProductController.updateProductPicture
);

router.delete(
  "/:productId/pictures/:pictureIndex",
  ProductController.deleteProductPicture
);

router.delete("/:productId/pictures", ProductController.clearProductPictures);

export default router;
