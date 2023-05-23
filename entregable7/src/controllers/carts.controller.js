import {
    getCart,
    addCart,
    addProductToCart,
    deleteProductFromCart,
    deleteProductsFromCart,
    updateProductsFromCart,
    updateProductsQaFromCart
} from "../services/carts.service.js";

export const findOneCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await getCart(cid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
    }
}

export const createCart = async (req, res) => {
    try {
        const cart = await addCart();

        res.status(201).send({ status: "success", payload: cart });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el carrito' });
    }
}

export const addOneProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await addProductToCart(cid, pid);

        if (cart) {
            res.status(201).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el producto al carrito' });
    }
}

export const deleteOneProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await deleteProductFromCart(cid, pid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto del carrito' });
    }
}

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await deleteProductsFromCart(cid);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto del carrito' });
    }
}

export const updateAllProductsFromCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;

        const cart = await updateProductsFromCart(cid, products);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto del carrito' });
    }
}

export const updateProductQuantityFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await updateProductsQaFromCart(cid, pid, quantity);

        if (cart) {
            res.status(200).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto del carrito' });
    }
}