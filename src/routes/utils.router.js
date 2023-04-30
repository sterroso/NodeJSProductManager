import { Router } from "express";
import * as UtilsController from "../controllers/utils.controller.js";

const router = Router();

router.get("/secret/:length/:encoding", UtilsController.getSecret);

export default router;
