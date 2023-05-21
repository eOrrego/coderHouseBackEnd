import { productsModel } from "../../db/models/products.model.js";

export default class ProductManager {

    // Ver lo de lean()
    // async getAll() {
    //     try {
    //         const allProducts = await productsModel.find().lean(); 
    //         return allProducts;
    //     } catch (error) {
    //         console.log(`Error obteniendo todos los productos: ${error.message}`);
    //     }
    // }

    async getProducts(limit, page, sort, query) {
        try {
            // const allProducts = await productsModel.find();

            const search = query ? {
                stock: { $gt: 0 },
                $or: [
                    //devuelve todos los productos que tengan el query en el titulo o en la categoria
                    { category: { $regex: query, $options: 'i' } },
                    { title: { $regex: query, $options: 'i' } },
                ]
            } : {
                //devuelve todos los productos que tengan stock mayor a 0
                stock: { $gt: 0 }
            }

            if (sort === 'asc') {
                sort = { price: 1 };
            } else if (sort === 'desc') {
                sort = { price: -1 };
            }

            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: sort,
                lean: true,
            }

            const allProducts = await productsModel.paginate(search, options)
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
        try {
            const updatedProduct = await productsModel.findOneAndUpdate(id, update, { new: true });
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productsModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
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