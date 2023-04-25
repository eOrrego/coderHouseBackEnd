import { usersModel } from "../../db/models/users.model.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";

export default class UsersManager {
    // ahora se crea el usuario con passport y se guarda en la base de datos con el método serializeUser
    // async createUser(user) {
    //     const { email, password } = user;
    //     try {
    //         const existUser = await usersModel.findOne({ email });
    //         if (existUser) {
    //             // throw new Error('El usuario ya existe');
    //             return false;
    //         }
    //         const newUser = new usersModel({
    //             email,
    //             password: await hashPassword(password),
    //             first_name: user.first_name,
    //             last_name: user.last_name,
    //             age: user.age,
    //         });
    //         await newUser.save();
    //         return newUser;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error(error);
    //     }
    // }

    async loginUser(user) {
        const { email, password } = user;
        try {
            const { email, password } = user;
            const userLogged = await usersModel.findOne({ email });
            if (!userLogged) {
                return false;
            } else {
                const isMatch = await comparePassword(password, userLogged.password);
                if (isMatch) {
                    return userLogged;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getUserById(id) {
        try {
            const user = await usersModel.findById(id);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}