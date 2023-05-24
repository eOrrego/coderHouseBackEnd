import { Router } from 'express';

import {
    findOneCart,
    createCart,
    addOneProductToCart,
    deleteOneProductFromCart,
    deleteAllProductsFromCart,
    updateAllProductsFromCart,
    updateProductQuantityFromCart
} from '../controllers/carts.controller.js';


// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

// Ruta para obtener un carrito por id
router.get('/:cid', findOneCart);

// Ruta para crear un carrito
router.post('/', createCart);

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', addOneProductToCart);

// Ruta para eliminar un producto de un carrito
router.delete('/:cid/product/:pid', deleteOneProductFromCart);

// Ruta para eliminar todos los productos de un carrito
router.delete('/:cid', deleteAllProductsFromCart);

// Ruta para actualizar todos los productos de un carrito
router.put('/:cid', updateAllProductsFromCart);

// Ruta para actualizar la cantidad de un producto de un carrito
router.put('/:cid/product/:pid', updateProductQuantityFromCart);

export default router;