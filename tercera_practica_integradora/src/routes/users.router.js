import usersController from "../controllers/users.controller.js";
import { Router } from "express";
import { verifyTokenAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", usersController.findAllUsers);

router.get("/:id", usersController.findUsersById);

router.post("/", usersController.createUsers);

router.put("/:id", usersController.updateUsers);

router.delete("/:id", usersController.deleteUsers);

router.delete("/soft/:id", usersController.deleteSoftUsers);

router.post("/login", usersController.loginUsers);

router.post("/logout", usersController.logoutUsers);

router.post("/current", verifyTokenAuth, usersController.currentUsers);

router.post("/forgot-password", usersController.forgotPasswordUsers);

router.get("/reset-password/:token", usersController.validateResetPasswordToken);

router.post("/reset-password", usersController.resetPasswordUsers);

router.post('/premium/:uid', usersController.premiumUsersRole);

export default router;