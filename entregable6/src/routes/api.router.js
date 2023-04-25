import { Router } from 'express';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import usersRouter from './users.router.js';


// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

//las rutas para los endpoints de la API de productos (REST) se definen en el router de productos (products.router.js) y se asignan a la ruta /api/products
router.use('/products', productsRouter);

//las rutas para los endpoints de la API de carritos (REST) se definen en el router de carritos (carts.router.js) y se asignan a la ruta /api/carts
router.use('/carts', cartsRouter);

//Ruta de usuarios
router.use('/users', usersRouter);

export default router;