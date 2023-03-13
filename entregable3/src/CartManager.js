import fs from 'fs';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./productos.json');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async addCart(cart) {
        const carts = await this.#getCarts();

        const lastCart = carts[carts.length - 1];
        const newId = lastCart ? lastCart.id + 1 : 1;
        const newCart = {
            products: [
                // {
                //     pid: cart.products[0].pid,
                //     quantity: cart.products[0].quantity || 1
                // }
            ],
            id: newId
        };
        carts.push(newCart);
        await this.#saveCarts(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.#getCarts();
        const cart = carts.find((cart) => cart.id === id);
        if (!cart) {
            return null;
        }
        return cart;
    }

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

    async #saveCarts(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
    }
}

export default CartManager;