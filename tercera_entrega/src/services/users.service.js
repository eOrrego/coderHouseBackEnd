import usersMongo from '../DAL/DAOs/usersDaos/usersMongo.js'
import { hashData } from '../utils/bcrypt.utils.js';
import UsersDTO from '../DAL/DTOs/users.dto.js';

class UsersService {
    async findAll() {
        try {
            const result = await usersMongo.findAll();
            return result;
        } catch (error) {
            return error;
        }
    }

    async findById(id) {
        try {
            const result = await usersMongo.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(users) {
        const { password } = users;
        try {
            const hashPassword = await hashData(password);
            const newUsers = { ...users, password: hashPassword };
            const usersDTO = new UsersDTO(newUsers);
            const result = await usersMongo.create(usersDTO);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, users) {
        try {
            const result = await usersMongo.update(id, users);
            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await usersMongo.delete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteSoft(id) {
        try {
            const result = await usersMongo.deleteSoft(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    // async findByName(name) {
    //     try {
    //         const result = await usersMongo.findByName(name);
    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }
}

const usersService = new UsersService();

export default usersService;