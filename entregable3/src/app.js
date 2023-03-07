import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./productos.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;

        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Endpoint para obtener un producto por id
app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await productManager.getProductById(parseInt(pid));

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Endpoint para agregar un producto
app.post('/products', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(201)
            .json("Producto agregado");
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ error: 'Error al agregar el producto' });
    }
});

// Endpoint para actualizar un producto
app.put('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body;
        const updatedProduct = await productManager.updateProduct(
            parseInt(pid),
            product
        );
        res.status(201)
            .json("Producto actualizado");
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ error: 'Error al actualizar el producto' });
    }
});

// Endpoint para borrar un producto
app.delete('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productManager.deleteProduct(parseInt(pid));
        res.status(201)
            .json("Producto borrado");
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ error: 'Error al borrar el producto' });
    }
});

// listen on port 8080
app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
