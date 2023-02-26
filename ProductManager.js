const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const lastProduct = products[products.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1;
        const newProduct = { ...product, id: newId };
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
        return products.find((product) => product.id === id);
    }

    async updateProduct(id, update) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return null;
        }
        const updatedProduct = { ...products[index], ...update, id };
        products.splice(index, 1, updatedProduct);
        await this.#saveProducts(products);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return null;
        }
        products.splice(index, 1);
        await this.#saveProducts(products);
        return id;
    }

    async #saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
}


const productManager = new ProductManager('./test1.json');

async function test() {
    // Agregar un producto
    const newProduct = {
        title: 'Nuevo producto',
        description: 'Descripción del nuevo producto',
        price: 10.99,
        thumbnail: 'https://www.example.com/image.png',
        code: 'ABC123',
        stock: 50,
    };
    const addedProduct = await productManager.addProduct(newProduct);
    console.log('Producto agregado:', addedProduct);

    // Consultar todos los productos
    const allProducts = await productManager.getProducts();
    console.log('Todos los productos:', allProducts);

    // Consultar un producto por id
    const productId = addedProduct.id;
    const productById = await productManager.getProductById(productId);
    console.log('Producto por id:', productById);

    // Actualizar un producto
    //const updatedProduct = {
    //    title: 'Producto actualizado',
    //    description: 'Descripción actualizada del producto',
    //    price: 15.99,
    //};
    //const productUpdated = await productManager.updateProduct(productId, updatedProduct);
    //console.log('Producto actualizado:', productUpdated);

    // Eliminar un producto
    const deletedProductId = await productManager.deleteProduct(2);
    console.log('Producto eliminado:', deletedProductId);

    // Consultar todos los productos después de eliminar uno
    const remainingProducts = await productManager.getProducts();
    console.log('Productos restantes:', remainingProducts);
}

test();

