import { Router } from "express";

import * as CategoryController from "../controllers/category.controller.js";

const router = Router();

router.get("/", CategoryController.getAllCategories);

router.get("/:categoryId", CategoryController.getCategoryById);

router.post("/", CategoryController.createCategory);

router.put("/:categoryId", CategoryController.updateCategory);

router.delete("/:categoryId", CategoryController.deleteCategory);

export default router;
