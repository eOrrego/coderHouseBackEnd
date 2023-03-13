// const fs = require('fs');
import fs from 'fs';

// Clase ProductManager para manejar los productos del archivo JSON (productos.json)
// Esta clase tiene los métodos para agregar, obtener, actualizar y eliminar productos
class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Método para agregar un producto a la lista de productos (products) del archivo JSON (productos.json)
    async addProduct(product) {
        const products = await this.getProducts();

        if (products.some((p) => p.code === product.code)) {
            console.log('Error: El código del producto ya existe');
            return -1;
        }

        const lastProduct = products[products.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1;
        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail || [],
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: true,
            id: newId
        };
        products.push(newProduct);
        await this.#saveProducts(products);
        return newProduct;
    }

    // Método para obtener todos los productos de la lista de productos (products) del archivo JSON (productos.json)
    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (err) {
            if (err.code === 'ENOENT') {
                await this.#saveProducts([]);
                return [];
            }
            throw err;
        }
    }

    // Método para obtener un producto por su id (pid) de la lista de productos (products) del archivo JSON (productos.json)
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            return null;
        }
        return product;
    }

    // Método para actualizar un producto por su id (pid) de la lista de productos (products) del archivo JSON (productos.json)
    async updateProduct(id, update) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return index;
        }
        const updatedProduct = {
            title: update.title || products[index].title,
            description: update.description || products[index].description,
            price: update.price || products[index].price,
            thumbnail: update.thumbnail || products[index].thumbnail,
            code: update.code || products[index].code,
            stock: update.stock || products[index].stock,
            category: update.category || products[index].category,
            status: update.status || products[index].status,
            id: id
        };
        products.splice(index, 1, updatedProduct);
        await this.#saveProducts(products);
        return updatedProduct;
    }

    // Método para eliminar un producto por su id (pid) de la lista de productos (products) del archivo JSON (productos.json)
    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return index;
        }
        products.splice(index, 1);
        await this.#saveProducts(products);
        return id;
    }

    async #saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
}

export default ProductManager;