import UsersManager from "../DAL/dao/ManagerMongo/UsersManagerMongo.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

const usersManager = new UsersManager();

export const loginUser = async (user) => {
    try {
        const { email, password } = user;
        const userLogged = await usersManager.getUserByEmail(email);
        if (!userLogged) {
            return false;
        } else {
            const isMatch = await comparePassword(password, userLogged.password);
            if (isMatch) {
                const token = generateToken(userLogged);
                return { token, userLogged };
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}    