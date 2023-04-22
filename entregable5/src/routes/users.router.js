import { Router } from "express";
import { UsersManager } from "../Dao/ManagerMongo/UsersManagerMongo.js";

const router = Router();
const usersManager = new UsersManager();

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const newUser = await usersManager.createUser(user);
        if (newUser) {
            res.redirect('/views/login');
        } else {
            res.redirect('/views/errorRegister');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = req.body;
        const userLogged = await usersManager.loginUser(user);
        if (userLogged) {
            for (const key in user) {
                req.session[key] = user[key];
            }
            req.session.logged = true;
            if (userLogged.email === 'adminCoder@coder.com' && userLogged.password === 'adminCod3r123') {
                req.session.isAdmin = true;
            } else {
                req.session.isAdmin = false;
                req.session.role = 'user';
            }
            res.redirect('/views/profile');
        } else {
            res.redirect('/views/errorLogin');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;