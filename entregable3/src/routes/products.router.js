import { Router } from "express";
import ProductManager from "../ProductManager.js";

// importamos el manejador de productos para poder usarlo en los endpoints de la API de productos (REST)
const router = Router();

// Creamos una instancia del manejador de productos para poder usarla en los endpoints de la API de productos (REST)
const productManager = new ProductManager('./productos.json');

// Endpoint para obtener todos los productos (o los primeros N productos si se pasa el parámetro limit en la query string)
router.get('/', async (req, res) => {
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

// Endpoint para obtener un producto por id (pid) pasado como parámetro en la URL (params)
router.get('/:pid', async (req, res) => {
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

// Endpoint para agregar un producto (el producto se pasa en el body de la request)
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }
        const b = await productManager.addProduct(product);
        if (b === -1) {
            res.status(400).json({ error: 'El código del producto ya existe' });
            return;
        } else {
            res.status(201)
                .json("Producto agregado");
        }
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ error: 'Error al agregar el producto' });
    }
});

// Endpoint para actualizar un producto (el producto se pasa en el body de la request) (el id del producto se pasa como parámetro en la URL)
router.put('/:pid', async (req, res) => {
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

// Endpoint para borrar un producto (el id del producto se pasa como parámetro en la URL)
router.delete('/:pid', async (req, res) => {
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


export default router;
