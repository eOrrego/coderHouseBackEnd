import { loginUser } from "../services/users.service.js";

// login de usuarios y devuelve un token si el usuario existe o devuelve un error si no existe
export const loginUsers = async (req, res) => {
    try {
        const user = req.body;
        const userLog = await loginUser(user);
        const { token, userLogged } = userLog;

        if (userLogged) {
            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            res.redirect('/profile');
            // res.send(token);
        } else {
            res.redirect('/errorLogin');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}