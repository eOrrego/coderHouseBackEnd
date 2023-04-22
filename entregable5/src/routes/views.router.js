import { Router } from "express";
import ProductManager from "../Dao/ManagerMongo/ProductManagerMongo.js";
import CartManager from "../Dao/ManagerMongo/CartManagerMongo.js";
import UsersManager from "../Dao/ManagerMongo/UsersManagerMongo.js";
// import { cartsModel } from '../db/models/carts.model.js';
// import { productsModel } from '../db/models/products.model.js';
import { auth, isLogged } from "../middlewares/auth.middleware.js";

const router = Router();
const usersManager = new UsersManager();

router.get("/chat", (req, res) => {
    res.render("chat", {
        title: "Chat",
        StyleSheet: "chat.css",
    });
});

// Ruta para visualizar todos los productos
router.get("/products", auth, async (req, res) => {
    const { userId, isAdmin, role } = req.session;
    const userLogged = await usersManager.getUserById(userId);
    const { first_name, last_name, email, age } = userLogged;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2);

    res.render("products", {
        products,
        first_name,
        last_name,
        email,
        age,
        isAdmin,
        role,
    });
});

// Ruta para visualizar todos los productos con paginación
router.get("/products/page/:page", auth, async (req, res) => {
    const page = req.params.page || 1;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2, page);
    // console.log(products);

    res.render("products", { products });
});

// Ruta para visualizar un producto en particular
router.get("/products/:id", auth, async (req, res) => {
    const productManager = new ProductManager();
    const product = await productManager.getProductById(req.params.id);

    // console.log(product);

    const { _id, title, description, price, code, stock, category, thumbnail } =
        product;

    res.render("product", {
        id: _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail,
    });
});

// Ruta para visualizar el carrito de compras
router.get("/carts/:cid", async (req, res) => {
    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(req.params.cid);

    const { products } = cart;

    res.render("cart", { products });
});

// Ruta registro de usuario
router.get("/register", isLogged, (req, res) => {
    res.render("register");
});

// Ruta login de usuario
router.get("/login", isLogged, (req, res) => {
    res.render("login");
});

// Ruta perfil de usuario
router.get("/profile", auth, async (req, res) => {
    const { userId, isAdmin, role } = req.session;
    const userLogged = await usersManager.getUserById(userId);
    const { first_name, last_name, email, age } = userLogged;
    res.render("profile", { first_name, last_name, email, age, isAdmin, role });
});

// Ruta Error de registro
router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
});

// Ruta Error de login
router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});

export default router;
