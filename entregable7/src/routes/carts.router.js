import { Router } from 'express';
// import CartManager from '../Dao/CartManager.js';
import CartManager from '../Dao/ManagerMongo/CartManagerMongo.js'

// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

// Creamos una instancia del manejador de carritos para poder usarla en los endpoints de la API de carritos (REST)
const cartManager = new CartManager('./carrito.json');

// Endpoint para obtener un carrito por su id (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        // const cart = await cartManager.getCartById(parseInt(cid));
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
    }
});

// Endpoint para agregar un carrito vacío a la lista de carritos (carts) del archivo JSON (carrito.json)
router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart();

        res.status(201).send({ status: "success", payload: cart });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el carrito' });
    }
});

// Endpoint para agregar un producto (pid) a un carrito (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
        const cart = await cartManager.addProductToCart(cid, pid);

        if (cart) {
            res.status(201).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el producto al carrito' });
    }
});

// Endpoint para eliminar un producto (pid) de un carrito (cid) de la base de datos mongo (carrito)
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartManager.deleteProductFromCart(cid, pid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto del carrito' });
    }
});

// Endpoint para eliminar todos los productos de un carrito (cid) de la base de datos mongo (carrito)
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartManager.deleteAllProductsFromCart(cid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar los productos del carrito' });
    }
});

// Endpoint para actualizar todos los productos de un carrito (cid) de la base de datos mongo (carrito)
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await cartManager.updateAllProductsFromCart(cid, products);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al actualizar los productos del carrito' });
    }
});

// Endpoint para actualizar solamente la cantidad de un producto (pid) de un carrito (cid) de la base de datos mongo (carrito)
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartManager.updateProductQuantityFromCart(cid, pid, quantity);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
});

export default router;