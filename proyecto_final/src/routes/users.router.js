import usersController from "../controllers/users.controller.js";
import { Router } from "express";
import { verifyTokenAuth, verifyTokenAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", usersController.findAllUsers);

router.get("/:id", usersController.findUsersById);

router.post("/", usersController.createUsers);

router.put("/:id", usersController.updateUsers);

router.delete("/:id", verifyTokenAdmin, usersController.deleteUsers);

router.delete("/soft/:id", verifyTokenAdmin, usersController.deleteSoftUsers);

//Realiza un soft delete de todos los usuarios con lastLogin menor en dos dias a la fecha actual

router.patch("/soft", verifyTokenAdmin, usersController.deleteSoftAllUsers);

router.post("/login", usersController.loginUsers);

router.post("/logout", usersController.logoutUsers);

router.post("/current", verifyTokenAuth, usersController.currentUsers);

router.post("/forgot-password", usersController.forgotPasswordUsers);

router.get("/reset-password/:token", usersController.validateResetPasswordToken);

router.post("/reset-password", usersController.resetPasswordUsers);

router.post('/premium/:uid', usersController.premiumUsersRole);

export default router;