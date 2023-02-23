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
