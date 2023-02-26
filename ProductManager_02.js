const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.log(`Error loading products from file: ${err}`);
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products));
        } catch (err) {
            console.log(`Error saving products to file: ${err}`);
        }
    }

    async addProduct(product) {
        const id = this.products.length + 1;
        product = { id, ...product };
        this.products.push(product);
        await this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { id, ...updatedProduct };
            await this.saveProducts();
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProducts();
        }
    }
}

const productManager = new ProductManager('./test2.json');

const product1 = {
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.99,
    thumbnail: '/path/to/image1.png',
    code: 'PRD001',
    stock: 100,
};

const product2 = {
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 5.99,
    thumbnail: '/path/to/image2.png',
    code: 'PRD002',
    stock: 50,
};

// Agregar productos
productManager.addProduct(product1);
productManager.addProduct(product2);

// Obtener todos los productos
console.log(productManager.getProducts());

// Obtener un producto por id
const productById = productManager.getProductById(1);
console.log(productById);

// Actualizar un producto
const updatedProduct = {
    title: 'Producto 1 modificado',
    description: 'Nueva descripción del producto 1',
    price: 15.99,
    thumbnail: '/path/to/image1_modified.png',
    code: 'PRD001',
    stock: 200,
};
productManager.updateProduct(1, updatedProduct);

// Eliminar un producto
productManager.deleteProduct(2);

// Obtener todos los productos actualizados
console.log(productManager.getProducts());
