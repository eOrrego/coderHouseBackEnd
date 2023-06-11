import cartsController from "../controllers/carts.controller.js";
import { Router } from "express";
import { verifyTokenUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", cartsController.findAllCarts);

router.get("/:id", cartsController.findCartsById);

router.post("/", verifyTokenUser, cartsController.createCarts);

router.put("/:id", cartsController.updateCarts);

router.delete("/:id", cartsController.deleteCarts);

router.delete("/soft/:id", cartsController.deleteSoftCarts);

router.post("/:cid/products/:pid", verifyTokenUser, cartsController.addProductToCart);

router.delete("/:cid/products/:pid", verifyTokenUser, cartsController.removeProductFromCart);

router.delete("/:cid/products", verifyTokenUser, cartsController.removeAllProductsFromCart);

router.put("/:cid/products/:pid", verifyTokenUser, cartsController.updateProductQuantityFromCart);

router.post("/:cid/purchase", verifyTokenUser, cartsController.purchaseCart);

export default router;