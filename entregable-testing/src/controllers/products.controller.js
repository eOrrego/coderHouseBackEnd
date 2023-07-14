import productsService from "../services/products.service.js";
import customError from "../utils/customError.js";
import { ErrorName, ErrorMessage, ErrorCause } from "../utils/error.enum.js";

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
            const tokenCokie = req.cookies.token;
            const result = await productsService.create(req.body, tokenCokie);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateProducts(req, res) {
        try {
            const tokenCokie = req.cookies.token;
            const result = await productsService.update(req.params.id, req.body, tokenCokie);
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

    async findAllProductsMocks(req, res) {
        try {
            const result = await productsService.findAllMocks();
            res.status(200).json(result);
        } catch (error) {
            customError.createCustomError({
                name: ErrorName.INTERNAL_SERVER_ERROR,
                message: ErrorMessage.INTERNAL_SERVER_ERROR,
                cause: ErrorCause.INTERNAL_SERVER_ERROR,
            });
        }
    }

}

const productsController = new ProductsController();

export default productsController;