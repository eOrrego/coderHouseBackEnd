import { Router } from 'express';
import CartManager from '../CartManager.js';

const router = Router();

// Creamos una instancia del manejador de carritos para poder usarla en los endpoints de la API de carritos (REST)
const cartManager = new CartManager('./carrito.json');


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

router.post('/', async (req, res) => {
    try {
        const cart = req.body;
        const b = await cartManager.addCart(cart);

        res.status(201).json("Carrito agregado");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el carrito' });
    }
});

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