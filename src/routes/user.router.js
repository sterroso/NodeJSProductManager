import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", auth, UserController.getAllUsers);

router.get("/:userId", auth, UserController.getUserById);

router.get("/email/:email", auth, UserController.getUserByEmail);

router.post("/", auth, UserController.createNewUser);

router.put("/:userId", auth, UserController.updateUserById);

router.delete("/:userId", auth, UserController.deleteUserById);

export default router;
