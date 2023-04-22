import { Router } from 'express'
import ProductManager from "../Dao/ManagerMongo/ProductManagerMongo.js";
import CartManager from '../Dao/ManagerMongo/CartManagerMongo.js';
import { cartsModel } from '../db/models/carts.model.js';
import { productsModel } from '../db/models/products.model.js';
import { auth, isLogged } from '../middlewares/auth.middleware.js';

const router = Router()

router.get('/chat', (req, res) => {
    res.render('chat')
})

// Ruta para visualizar todos los productos
router.get('/products', async (req, res) => {

    const productManager = new ProductManager();
    // const products = await productManager.getAll();
    const products = await productManager.getProducts(2);
    // console.log(products);

    res.render('products', { products })
})

// Ruta para visualizar todos los productos con paginación
router.get('/products/page/:page', async (req, res) => {

    const page = req.params.page || 1;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2, page);
    // console.log(products);

    res.render('products', { products })
})


// Ruta para visualizar un producto en particular
router.get('/products/:id', async (req, res) => {

    const productManager = new ProductManager();
    const product = await productManager.getProductById(req.params.id);

    // console.log(product);

    const { _id, title, description, price, code, stock, category, thumbnail } = product;

    res.render('product', { id: _id, title, description, price, code, stock, category, thumbnail })
})

// Ruta para visualizar el carrito de compras
router.get('/carts/:cid', async (req, res) => {

    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(req.params.cid);

    const { products } = cart;

    res.render('cart', { products })
})

// Ruta registro de usuario
router.get('/register', isLogged, (req, res) => {
    res.render('register');
})

// Ruta login de usuario
router.get('/login', isLogged, (req, res) => {
    res.render('login');
})

// Ruta perfil de usuario
router.get('/profile', auth, (req, res) => {
    res.render('profile', { email: req.session.email });
})

// Ruta Error de registro
router.get('/errorRegister', (req, res) => {
    res.render('errorRegister');
})

// Ruta Error de login
router.get('/errorLogin', (req, res) => {
    res.render('errorLogin');
})

export default router