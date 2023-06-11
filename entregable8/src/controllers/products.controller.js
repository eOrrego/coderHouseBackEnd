import productsService from "../services/products.service.js";

class ProductsController {
    async findAllProducts(req, res) {
        try {
            const result = await productsService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findProductsById(req, res) {
        try {
            const result = await productsService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createProducts(req, res) {
        // aqui hay que hacer validaciones de los datos que vienen en el body
        try {
            const result = await productsService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateProducts(req, res) {
        try {
            const result = await productsService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteProducts(req, res) {
        try {
            const result = await productsService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteSoftProducts(req, res) {
        try {
            const result = await productsService.deleteSoft(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

const productsController = new ProductsController();

export default productsController;