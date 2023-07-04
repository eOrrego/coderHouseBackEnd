import businessService from "../services/business.service.js";

class BusinessController {
    async findAllBusiness(req, res) {
        try {
            const result = await businessService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findBusinessById(req, res) {
        try {
            const result = await businessService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createBusiness(req, res) {
        // aqui hay que hacer validaciones de los datos que vienen en el body
        try {
            const result = await businessService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateBusiness(req, res) {
        try {
            const result = await businessService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteBusiness(req, res) {
        try {
            const result = await businessService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteSoftBusiness(req, res) {
        try {
            const result = await businessService.deleteSoft(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

const businessController = new BusinessController();

export default businessController;