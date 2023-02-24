const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = { ...product, id: lastId + 1 };
        products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(products));
        return newProduct;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, fieldsToUpdate) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return null;
        }
        const updatedProduct = { ...products[productIndex], ...fieldsToUpdate };
        products[productIndex] = updatedProduct;
        fs.writeFileSync(this.path, JSON.stringify(products));
        return updatedProduct;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return false;
        }
        products.splice(productIndex, 1);
        fs.writeFileSync(this.path, JSON.stringify(products));
        return true;
    }
}

// const ProductManager = require('./ProductManager'); // Suponemos que la clase está en un archivo separado

const productManager = new ProductManager('./test1.json');

// Agregar un producto
const newProduct = {
    title: 'Producto de prueba',
    description: 'Descripción del producto de prueba',
    price: 100,
    thumbnail: '/image.jpg',
    code: 'P001',
    stock: 10
};
const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Consultar todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Eliminar un producto por su id
// const productIdToDelete = addedProduct.id;
// const deleteResult = productManager.deleteProduct(productIdToDelete);
// console.log('Resultado de eliminar producto:', deleteResult);

// Actualizar un producto por su id
// const productIdToUpdate = addedProduct.id;
// const updatedProduct = {
//     title: 'Producto de prueba actualizado',
//     description: 'Descripción del producto de prueba actualizado',
//     price: 150,
//     thumbnail: 'https://example.com/image-updated.jpg',
//     code: 'P001',
//     stock: 5
// };

// const updateResult = productManager.updateProduct(productIdToUpdate, updatedProduct);
// console.log('Resultado de actualizar producto:', updateResult);