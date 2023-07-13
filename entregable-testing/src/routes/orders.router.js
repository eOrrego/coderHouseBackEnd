import ordersController from "../controllers/orders.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", ordersController.findAllOrders);

router.get("/:id", ordersController.findOrdersById);

router.post("/", ordersController.createOrders);

router.put("/:id", ordersController.updateOrders);

router.delete("/:id", ordersController.deleteOrders);

router.delete("/soft/:id", ordersController.deleteSoftOrders);

export default router;