import productsController from "../controllers/products.controller.js";
import { Router } from "express";
import { verifyTokenAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", productsController.findAllProducts);

router.get("/:id", productsController.findProductsById);

router.post("/", verifyTokenAdmin, productsController.createProducts);

router.put("/:id", verifyTokenAdmin, productsController.updateProducts);

router.delete("/:id", verifyTokenAdmin, productsController.deleteProducts);

router.delete("/soft/:id", verifyTokenAdmin, productsController.deleteSoftProducts);

//ruta utilizando mocks
router.get("/mocks/mockingproducts", productsController.findAllProductsMocks);

export default router;