import { Router } from "express";
// import UsersManager from "../DAL/dao/ManagerMongo/UsersManagerMongo.js";
import passport from 'passport';
// import { generateToken } from "../utils/jwt.js";
import { loginUsers } from "../controllers/users.controller.js";

const router = Router();
// const usersManager = new UsersManager();

// register sin passport
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

// register con passport
router.post('/register', passport.authenticate('Register', {
    successRedirect: '/login',
    failureRedirect: '/errorRegister',
    passReqToCallback: true,
}));


// router.post('/login', async (req, res) => {
//     try {
//         const user = req.body;
//         const userLogged = await usersManager.loginUser(user);
//         if (userLogged) {
//             for (const key in user) {
//                 req.session[key] = user[key];
//             }
//             req.session.userId = userLogged._id;
//             req.session.logged = true;
//             if (userLogged.email === 'adminCoder@coder.com' && userLogged.password === 'adminCod3r123') {
//                 req.session.isAdmin = true;
//             } else {
//                 req.session.isAdmin = false;
//                 req.session.role = userLogged.role;
//             }
//             res.redirect('/products');
//         } else {
//             res.redirect('/errorLogin');
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// login with passport
// router.post('/login', passport.authenticate('local'
//     , {
//         successRedirect: '/products',
//         failureRedirect: '/errorLogin',
//     }
// ));


// login con JWT sin passport (no se usa)
// router.post('/login', async (req, res) => {
//     try {
//         const user = req.body;
//         const userLogged = await usersManager.loginUser(user);
//         if (userLogged) {
//             const token = generateToken(userLogged);
//             res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
//             res.redirect('/products');
//             // res.send(token);
//         } else {
//             res.redirect('/errorLogin');
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

router.post('/login', loginUsers);

// login con JWT con passport
router.get('/loginpass', passport.authenticate('current', { session: false }), (req, res) => {
    res.send(req.user);
});

// logout borra la cookie y la session
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/login');
        }
    })
});

// // logout borra la cookie
// router.get('/logoutcookie', (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/login');
// });

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
    req.session.role = req.user.role;
    res.redirect('/products');
});


export default router;