import { Router } from 'express';
import CartManager from '../CartManager.js';

// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

// Creamos una instancia del manejador de carritos para poder usarla en los endpoints de la API de carritos (REST)
const cartManager = new CartManager('./carrito.json');

// Endpoint para obtener un carrito por su id (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartManager.getCartById(parseInt(cid));

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Endpoint para agregar un carrito vacío a la lista de carritos (carts) del archivo JSON (carrito.json)
router.post('/', async (req, res) => {
    try {
        const cart = req.body;
        await cartManager.addCart(cart);

        res.status(201).json("Carrito agregado");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el carrito' });
    }
});

// Endpoint para agregar un producto (pid) a un carrito (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router;