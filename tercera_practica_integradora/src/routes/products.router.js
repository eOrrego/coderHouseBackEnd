import productsController from "../controllers/products.controller.js";
import { Router } from "express";
import { verifyTokenAdminPremium } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", productsController.findAllProducts);

router.get("/:id", productsController.findProductsById);

router.post("/", verifyTokenAdminPremium, productsController.createProducts);

router.put("/:id", verifyTokenAdminPremium, productsController.updateProducts);

router.delete("/:id", verifyTokenAdminPremium, productsController.deleteProducts);

router.delete("/soft/:id", verifyTokenAdminPremium, productsController.deleteSoftProducts);

//ruta utilizando mocks
router.get("/mocks/mockingproducts", productsController.findAllProductsMocks);

export default router;