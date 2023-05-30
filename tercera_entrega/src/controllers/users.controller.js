import usersService from "../services/users.service.js";

class UsersController {
    async findAllUsers(req, res) {
        try {
            const result = await usersService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findUsersById(req, res) {
        try {
            const result = await usersService.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createUsers(req, res) {
        // aqui hay que hacer validaciones de los datos que vienen en el body
        try {
            const result = await usersService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateUsers(req, res) {
        try {
            const result = await usersService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteUsers(req, res) {
        try {
            const result = await usersService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteSoftUsers(req, res) {
        try {
            const result = await usersService.deleteSoft(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

const usersController = new UsersController();

export default usersController;