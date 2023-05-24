import { Router } from "express";
import ProductManager from "../DAL/dao/ManagerMongo/ProductManagerMongo.js";
import CartManager from "../DAL/dao/ManagerMongo/CartManagerMongo.js";
import { auth, isLogged, jwtAuth, jwtAuthCookie } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para ir al chat de la aplicación (no es necesario estar logueado)
router.get("/chat", (req, res) => {
    res.render("chat", {
        title: "Chat",
        StyleSheet: "chat.css",
    });
});

// Ruta para ver todos los productos, tiene que estar logueado
router.get("/products", jwtAuthCookie, async (req, res) => {

    const { first_name, last_name, email, age, role } = req.user;

    const productManager = new ProductManager();
    const products = await productManager.getProducts();

    res.render("products", {
        products,
        first_name,
        last_name,
        email,
        age,
        role,
    });
});

// Ruta para visualizar todos los productos con paginación
router.get("/products/page/:page", jwtAuthCookie, async (req, res) => {
    const page = req.params.page || 1;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2, page);

    res.render("products", { products });
});

// Ruta para visualizar un producto en particular
router.get("/products/:id", jwtAuthCookie, async (req, res) => {
    const productManager = new ProductManager();
    const product = await productManager.getProductById(req.params.id);

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
router.get("/profile", jwtAuthCookie, async (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    res.render("profile", { first_name, last_name, email, age, role });
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
