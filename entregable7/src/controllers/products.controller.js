import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../services/products.service.js";


// busca todos los productos y los devuelve si los encuentra o devuelve un error si no los encuentra
export const findAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;

        const allProducts = await getProducts(limit, page, sort, query);

        res.status(200).send({ status: "success", payload: allProducts.products, info: allProducts.info });

    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al obtener los productos' });
    }
}

// busca un producto y lo devuelve si lo encuentra o devuelve un error si no lo encuentra
export const findOneProduct = async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await getProductById(pid);

        if (product) {
            res.status(200).send({ status: "success", payload: product });
        } else {
            res.status(404).send({ status: "error", error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al obtener el producto' });
    }
}

// agrega un producto y lo devuelve si lo encuentra o devuelve un error si no lo encuentra
export const addOneProduct = async (req, res) => {
    try {
        const product = req.body;
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            res.status(400).send({ status: "error", error: 'Todos los campos son obligatorios' });
            return;
        }

        const newProduct = await addProduct(product);

        res.status(201).send({ status: "success", payload: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el producto' });
    }
}

// actualiza un producto y lo devuelve si lo encuentra o devuelve un error si no lo encuentra
export const updateOneProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body;

        const updatedProduct = await updateProduct({ _id: pid }, product);

        if (updatedProduct) {
            res.status(200).send({ status: "success", payload: updatedProduct });
        } else {
            res.status(404).send({ status: "error", error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
    }
}

// elimina un producto y lo devuelve si lo encuentra o devuelve un error si no lo encuentra
export const deleteOneProduct = async (req, res) => {
    try {
        const { pid } = req.params;

        const deletedProduct = await deleteProduct({ _id: pid });

        if (deletedProduct) {
            res.status(200).send({ status: "success", payload: deletedProduct });
        } else {
            res.status(404).send({ status: "error", error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al eliminar el producto' });
    }
}