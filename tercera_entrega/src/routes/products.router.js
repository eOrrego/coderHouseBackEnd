import productsController from "../controllers/products.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", productsController.findAllProducts);

router.get("/:id", productsController.findProductsById);

router.post("/", productsController.createProducts);

router.put("/:id", productsController.updateProducts);

router.delete("/:id", productsController.deleteProducts);

router.delete("/soft/:id", productsController.deleteSoftProducts);

export default router;