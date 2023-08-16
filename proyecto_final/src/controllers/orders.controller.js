import ordersService from "../services/orders.service.js";

class OrdersController {
    async findAllOrders(req, res) {
        try {
            const result = await ordersService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findOrdersById(req, res) {
        try {
            const result = await ordersService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createOrders(req, res) {
        // aqui hay que hacer validaciones de los datos que vienen en el body
        try {
            const result = await ordersService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateOrders(req, res) {
        try {
            const result = await ordersService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteOrders(req, res) {
        try {
            const result = await ordersService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteSoftOrders(req, res) {
        try {
            const result = await ordersService.deleteSoft(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

const ordersController = new OrdersController();

export default ordersController;