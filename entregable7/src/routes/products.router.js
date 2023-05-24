import { Router } from "express";

import {
    findAllProducts,
    findOneProduct,
    addOneProduct,
    updateOneProduct,
    deleteOneProduct
} from "../controllers/products.controller.js";

// importamos el manejador de productos para poder usarlo en los endpoints de la API de productos (REST)
const router = Router();

// Ruta para obtener todos los productos
router.get('/', findAllProducts);

// Ruta para obtener un producto por id
router.get('/:pid', findOneProduct);

// Ruta para crear un producto
router.post('/', addOneProduct);

// Ruta para actualizar un producto
router.put('/:pid', updateOneProduct);

// Ruta para eliminar un producto
router.delete('/:pid', deleteOneProduct);


export default router;
