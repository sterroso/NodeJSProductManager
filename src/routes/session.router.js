import { Router } from "express";

import SessionController from "../controllers/session.controller.js";

const router = Router();

router.get("/register", SessionController.register);

router.get("/login", SessionController.login);

export default router;
