import { cartsModel } from "../../db/models/carts.model.js";
import { productsModel } from "../../db/models/products.model.js";

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
            // Busco el carrito por su id y lo devuelvo con los productos populados (con toda su información)
            const cart = await cartsModel.findOne({ _id: id });
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
                console.log("first")
                cart.products.push({ pid: productId, quantity: 1 });
                await cart.save();
            } else {
                console.log("second")
                product.quantity++;
                await cart.updateOne({ products: cart.products });
            }

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {

            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                return null;
            }

            const product = cart.products.find((product) => product.pid.toString() === productId);
            if (!product) {
                return null;
            }

            if (product.quantity > 1) {
                product.quantity--;
                await cart.updateOne({ products: cart.products });
            } else {
                cart.products = cart.products.filter((product) => product.pid.toString() !== productId);
                await cart.updateOne({ products: cart.products });
            }

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {

            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                return null;
            }

            cart.products = [];

            await cart.updateOne({ products: cart.products });

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async updateAllProductsFromCart(cartId, products) {
        try {

            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                return null;
            }

            // verificar que los productos existan
            for (const product of products) {
                const pro = await productsModel.findById(product.pid);
                if (!pro) {
                    return null;
                }
            }

            cart.products = products;

            await cart.updateOne({ products: cart.products });

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async updateProductQuantityFromCart(cartId, productId, quantity) {
        try {
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                return null;
            }

            const product = cart.products.find((product) => product.pid.toString() === productId);
            if (!product) {
                return null;
            }

            product.quantity = quantity;

            await cart.updateOne({ products: cart.products });

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

}