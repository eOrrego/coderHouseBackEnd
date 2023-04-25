import { Router } from "express";
import UsersManager from "../Dao/ManagerMongo/UsersManagerMongo.js";
import passport from 'passport';

const router = Router();
const usersManager = new UsersManager();

// router.post('/register', async (req, res) => {
//     try {
//         const user = req.body;
//         const newUser = await usersManager.createUser(user);
//         if (newUser) {
//             res.redirect('/login');
//         } else {
//             res.redirect('/errorRegister');
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// register with passport
router.post('/register', passport.authenticate('Register', {
    successRedirect: '/login',
    failureRedirect: '/errorRegister',
    passReqToCallback: true,
}));

router.post('/login', async (req, res) => {
    try {
        const user = req.body;
        const userLogged = await usersManager.loginUser(user);
        if (userLogged) {
            for (const key in user) {
                req.session[key] = user[key];
            }
            req.session.userId = userLogged._id;
            req.session.logged = true;
            if (userLogged.email === 'adminCoder@coder.com' && userLogged.password === 'adminCod3r123') {
                req.session.isAdmin = true;
            } else {
                req.session.isAdmin = false;
                req.session.role = 'user';
            }
            res.redirect('/products');
        } else {
            res.redirect('/errorLogin');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/login');
        }
    })
});

// Register with passport github strategy
router.get('/github', passport.authenticate('Github', { scope: ['user:email'] }));

// Login with passport github strategy
router.get('/github/callback', passport.authenticate('Github', {
    // successRedirect: '/products',
    failureRedirect: '/errorRegister',
}), (req, res) => {
    req.session.email = req.user.email;
    req.session.logged = true;
    req.session.userId = req.user._id;
    req.session.isAdmin = false;
    req.session.role = 'user';
    res.redirect('/products');
});


export default router;