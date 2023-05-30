import { Router } from "express";

import SessionController from "../controllers/session.controller.js";

const router = Router();

router.post("/register", SessionController.register);

router.post("/login", SessionController.login);

router.get("/logout", SessionController.logout);

export default router;
