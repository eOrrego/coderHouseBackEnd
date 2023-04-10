import { productsModel } from "../db/models/products.model.js";

export default class ProductManager {

    async getProducts() {
        try {
            const allProducts = await productsModel.find();
            return allProducts;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(product) {
        try {
            const newProduct = new productsModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, update) {
        try{
            const updatedProduct = await productsModel.findOneAndUpdate(id, update, {new: true});
            return updatedProduct;
        }catch(error){
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try{
            const product = await productsModel.findByIdAndDelete(id);
            return product;
        }catch(error){
            console.log(error);
        }
    }

    // async query(options) {
    //     try{
    //         const products = await productsModel.find(options);
    //         return products;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

}