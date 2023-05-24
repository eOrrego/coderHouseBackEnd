import { Router } from 'express';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import usersRouter from './users.router.js';
import sessionRouter from './session.router.js';


// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

// Ruta de productos
router.use('/products', productsRouter);

// Ruta de carritos
router.use('/carts', cartsRouter);

//Ruta de usuarios
router.use('/users', usersRouter);

//Ruda de session
router.use('/session', sessionRouter);

export default router;