// const fs = require('fs');
import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

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

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            return null;
        }
        return product;
    }

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

//Path: productos.json e instancia el objeto
// const productManager = new ProductManager('./productos.json');

//Funcion para probar el CRUD
async function prueba() {

    //Agregar un producto
    const product1 = {
        title: 'Producto1',
        description: 'Descripción del producto 1',
        price: 10,
        thumbnail: '/image1.png',
        code: 'A10',
        stock: 10,
    };
    const product2 = {
        title: 'Producto2',
        description: 'Descripción del producto 2',
        price: 20,
        thumbnail: '/image2.png',
        code: 'A20',
        stock: 20,
    };

    await productManager.addProduct(product1);
    await productManager.addProduct(product2);

    // Consultar todos los productos
    console.log('Todos los productos:\n', await productManager.getProducts());

    // Consultar un producto por id
    const productById = await productManager.getProductById(1);
    if (!productById) {
        console.log('No existe un producto con ese id');
    } else {
        console.log('Producto por id:\n', productById);
    }

    //Actualizar un producto
    const updatedProduct = {
        title: 'Producto actualizado',
        description: 'Descripción actualizada del producto',
        price: 100,
    };
    const productUpdated = await productManager.updateProduct(1, updatedProduct);
    if (!productUpdated) {
        console.log('No existe un producto con ese id');
    } else {
        console.log('Producto actualizado:\n', productUpdated);
    }

    // Eliminar un producto
    const deletedProductId = await productManager.deleteProduct(2);
    if (!deletedProductId) {
        console.log('No existe un producto con ese id');
    } else {
        console.log('ID Producto eliminado:', deletedProductId);
    }


    // Consultar todos los productos después de eliminar uno
    console.log('Productos restantes:\n', await productManager.getProducts());
}

//Ejecuto la funcion
// prueba();

