import cartsService from '../services/carts.service.js';

class CartsController {
    async findAllCarts(req, res) {
        try {
            const result = await cartsService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findCartsById(req, res) {
        try {
            const result = await cartsService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createCarts(req, res) {
        // aqui hay que hacer validaciones de los datos que vienen en el body
        try {
            //sacar id del usuario de la cookie token y enviarlo para crear el carrito

            const tokenUser = req.cookies.token;
            const result = await cartsService.create(tokenUser);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateCarts(req, res) {
        try {
            const result = await cartsService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteCarts(req, res) {
        try {
            const result = await cartsService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteSoftCarts(req, res) {
        try {
            const result = await cartsService.deleteSoft(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async addProductToCart(req, res) {
        try {
            const tokenCookieUser = req.cookies.token;
            const { cid, pid } = req.params;
            const result = await cartsService.addProduct(cid, pid, tokenCookieUser);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const result = await cartsService.removeProduct(cid, pid);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async removeAllProductsFromCart(req, res) {
        try {
            const { cid } = req.params;
            const result = await cartsService.removeAllProducts(cid);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateProductQuantityFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartsService.updateProductQuantity(cid, pid, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async purchaseCart(req, res) {
        try {
            const { cid } = req.params;
            const tokenUser = req.cookies.token;
            const result = await cartsService.purchase(cid, tokenUser);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

const cartsController = new CartsController();

export default cartsController;