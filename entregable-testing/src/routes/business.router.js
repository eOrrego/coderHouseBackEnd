import businessController from "../controllers/busness.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", businessController.findAllBusiness);

router.get("/:id", businessController.findBusinessById);

router.post("/", businessController.createBusiness);

router.put("/:id", businessController.updateBusiness);

router.delete("/:id", businessController.deleteBusiness);

router.delete("/soft/:id", businessController.deleteSoftBusiness);

export default router;