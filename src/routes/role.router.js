import { Router } from "express";

import * as RoleController from "../controllers/role.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, RoleController.getAllRoles);

// getById and getByName cannot be provided at the same time.
// If one is provided the other must be commented.
router.get("/:roleId", auth, RoleController.getRoleById);
// router.get("/:roleName", auth, RoleController.getRoleByName);

router.post("/", auth, RoleController.createRole);

router.put("/:roleId", auth, RoleController.updateRole);

router.delete("/:roleId", auth, RoleController.deleteRole);

export default router;
