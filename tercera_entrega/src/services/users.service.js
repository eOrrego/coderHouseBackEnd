import usersMongo from '../DAL/DAOs/usersDaos/usersMongo.js'
import { hashData, compareData } from '../utils/bcrypt.utils.js';
import { generateToken, verifyToken } from '../utils/jwt.utils.js';
import { UsersDTO, UsersViewDTO } from '../DAL/DTOs/users.dto.js';
import config from '../config/config.js';

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

    async login(users) {
        const { password, email } = users;
        try {

            if (email === config.admin_email && password === config.admin_password) {
                const userAdmin = {
                    email,
                    role: "admin"
                }
                const token = generateToken(userAdmin);
                return token;
            }

            const result = await usersMongo.findByField('email', email);
            if (result) {
                const { password: hashPassword } = result[0];
                const isMatch = await compareData(password, hashPassword);
                if (isMatch) {
                    const token = generateToken(result[0]);
                    return token;
                }
                return null;
            }
            return null;
        }
        catch (error) {
            return error;
        }
    }

    async current(token) {
        try {
            const { id, email, role } = verifyToken(token);

            if (role === "admin") {
                const userAdmin = {
                    email,
                    role
                }
                return userAdmin;
            }

            const result = await usersMongo.findById(id);
            const usersViewDTO = new UsersViewDTO(result);
            return usersViewDTO;
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