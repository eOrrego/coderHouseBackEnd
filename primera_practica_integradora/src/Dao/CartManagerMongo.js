import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

export default class CartManager {

    async addCart() {
        try {
            const newCart = new cartsModel();
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartsModel.findById(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                return null;
            }

            const pro = await productsModel.findById(productId);
            if (!pro) {
                return null;
            }

            const product = cart.products.find((product) => product.pid.toString() === productId);
            if (!product) {
                cart.products.push({ pid: productId, quantity: 1 });
                await cart.save();
            } else {
                product.quantity++;
                await cart.updateOne({ products: cart.products });
            }

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

}