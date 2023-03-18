import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import { __dirname } from '../utils/dirname.js';

const router = Router();
const productManager = new ProductManager(__dirname + '/productos.json');

// ruta para el formulario de carga de productos (GET)
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

// router.get('/', async (req, res) => {
//     res.render('index');
// });

// ruta para el formulario de carga de productos (GET)
router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default router;