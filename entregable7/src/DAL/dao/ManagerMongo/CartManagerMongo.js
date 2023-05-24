import { productsModel } from "../../models/products.model.js";
import { cartsModel } from "../../models/carts.model.js";

// clase que se encarga de manejar los carritos en la base de datos de mongo
export default class CartManager {

    // crea un carrito vacio y devuelve el carrito
    async addCart() {
        try {
            const newCart = new cartsModel();
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    // busca el carrito por id y devuelve el carrito
    async getCartById(id) {
        try {
            const cart = await cartsModel.findOne({ _id: id });
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    // guarda el carrito
    async saveCart(cart) {
        try {
            await cart.save();
        } catch (error) {
            console.log(error);
        }
    }

    // actualiza el carrito
    async updateOneCart(cart) {
        try {
            await cart.updateOne({ products: cart.products });
        } catch (error) {
            console.log(error);
        }
    }

}