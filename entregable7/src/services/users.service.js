import UsersManager from "../DAL/dao/ManagerMongo/UsersManagerMongo.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import config from "../config/config.js";

const ADMIN_EMAIL = config.ADMIN_EMAIL;
const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

// instanciamos el manager de usuarios para poder usar sus métodos
const usersManager = new UsersManager();

// exportamos la funcion que se encarga de loguear al usuario
export const loginUser = async (user) => {
    try {
        const { email, password } = user;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const userLogged = { email, password, role: 'admin', isAdmin: true };
            const token = generateToken(userLogged);
            return { token, userLogged };
        }

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