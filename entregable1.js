class ProductManager {
    constructor() {
        this.products = [];
        this._id = 0;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log('Error: Todos los campos son obligatorios');
            return;
        }

        if (this.products.some((p) => p.code === product.code)) {
            console.log('Error: El código del producto ya existe');
            return;
        }

        this._id++;
        const newProduct = {
            id: this._id,
            ...product
        };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.log('Error: Not found');
        }
    }
}


const products1 = new ProductManager();
console.log("product1 (Object):",products1);


products1.addProduct({ title: 'Remera', description: 'Remera de algodón', price: 1000, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', code: 1, stock: 10 });

console.log("product1 (getProducts):",products1.getProducts());

products1.addProduct({ title: 'Remera', description: 'Remera de algodón', price: 1000, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', code: 1, stock: 10 });


console.log("product1 (getProductById):",products1.getProductById(1));

products1.getProductById(2);

products1.addProduct({ title: 'Remera', description: 'Remera de algodón', price: 1000, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', code: 20, stock: 10 });

products1.addProduct({ description: 'Remera de algodón', price: 1000, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', code: 30, stock: 10 });

console.log("product1 (getProducts):",products1.getProducts());