import usersController from "../controllers/users.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", usersController.findAllUsers);

router.get("/:id", usersController.findUsersById);

router.post("/", usersController.createUsers);

router.put("/:id", usersController.updateUsers);

router.delete("/:id", usersController.deleteUsers);

router.delete("/soft/:id", usersController.deleteSoftUsers);

export default router;