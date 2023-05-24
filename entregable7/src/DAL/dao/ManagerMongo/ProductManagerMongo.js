import { productsModel } from "../../models/products.model.js";

// clase que se encarga de manejar los productos en la base de datos de mongo
export default class ProductManager {

    // busca todos los productos y devuelve los productos
    async getProducts(search, options) {
        try {
            const allProducts = await productsModel.paginate(search, options);
            return allProducts;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // busca el producto por id y devuelve el producto
    async getProductById(id) {
        try {
            const product = await productsModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    // agrega un producto y devuelve el producto
    async addProduct(product) {
        try {
            const newProduct = new productsModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    // actualiza un producto y devuelve el producto actualizado
    async updateProduct(id, update) {
        try {
            const updatedProduct = await productsModel.findOneAndUpdate(id, update, { new: true });
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    // elimina un producto y devuelve el producto eliminado
    async deleteProduct(id) {
        try {
            const product = await productsModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

}