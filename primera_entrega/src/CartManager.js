import fs from 'fs';

// importamos el ProductManager para poder usar sus métodos en este archivo (addProductToCart)
import ProductManager from './ProductManager.js';

// creamos una instancia de ProductManager para poder usar sus métodos en este archivo (addProductToCart)
const productManager = new ProductManager('./productos.json');

// creamos la clase CartManager para poder usar sus métodos (addCart, getCartById, addProductToCart)
class CartManager {
    constructor(path) {
        this.path = path;
    }

    // método para agregar un carrito vacío a la lista de carritos (carts) del archivo JSON (carrito.json)
    async addCart() {
        const carts = await this.#getCarts();

        const lastCart = carts[carts.length - 1];
        const newId = lastCart ? lastCart.id + 1 : 1;
        const newCart = {
            products: [],
            id: newId
        };
        carts.push(newCart);
        await this.#saveCarts(carts);
        return newCart;
    }

    // método para obtener un carrito por su id (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
    async getCartById(id) {
        const carts = await this.#getCarts();
        const cart = carts.find((cart) => cart.id === id);
        if (!cart) {
            return null;
        }
        return cart;
    }

    // método para agregar un producto (pid) a un carrito (cid) de la lista de carritos (carts) del archivo JSON (carrito.json)
    // este método usa el método getProductById del ProductManager para obtener el producto por su id (pid)
    async addProductToCart(cid, pid) {
        const carts = await this.#getCarts();
        const cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            return null;
        }

        const prod = await productManager.getProductById(pid);
        if (!prod) {
            return null;
        }

        const product = cart.products.find((product) => product.pid === pid);
        if (!product) {
            cart.products.push({ pid, quantity: 1 });
        } else {
            product.quantity++;
        }
        await this.#saveCarts(carts);
        return cart;
    }

    // método para obtener la lista de carritos (carts) del archivo JSON (carrito.json)
    async #getCarts() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (err) {
            if (err.code === 'ENOENT') {
                await this.#saveCarts([]);
                return [];
            }
            throw err;
        }
    }

    // método para guardar la lista de carritos (carts) en el archivo JSON (carrito.json)
    async #saveCarts(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
    }
}

export default CartManager;