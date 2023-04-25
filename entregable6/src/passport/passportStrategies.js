import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersModel } from "../db/models/users.model.js";
import { hashPassword } from "../utils/bcrypt.js";

// configurar passport para usar una estrategia local (para autenticar usuarios con email y contraseña)
passport.use(
    "Register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const user = await usersModel.findOne({ email });
            if (user) {
                return done(null, false, {
                    message: "Email already registered",
                });
            }
            const newUser = new usersModel({
                email,
                password: await hashPassword(password),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
            });
            await newUser.save();
            return done(null, newUser);
        }
    )
);

// configurar passport para usar una estrategia con github (para autenticar usuarios con github)
passport.use(
    "Github",
    new GithubStrategy(
        {
            clientID: "Iv1.9f4302fac0745d7f",
            clientSecret: "4352e16835ff687e01b12d62fb2f86a10ae59e8f",
            callbackURL: "http://localhost:8080/api/users/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await usersModel.findOne({ email: profile._json.email });
            if (user) {
                return done(null, user);
            }
            const newUser = new usersModel({
                email: profile._json.email,
                password: ' ',
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || ' ',
                age: 0,
            });
            await newUser.save();
            return done(null, newUser);
        }
    )
);

// passport.use(
//     'github',
//     new GithubStrategy(
//       {
//         clientID: 'Iv1.ba8d845bcb2956e3',
//         clientSecret: '16007547c83e7a643e09298a9c201c00df61f7a1',
//         callbackURL: 'http://localhost:8080/users/github',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         const user = await userModel.findOne({ email: profile._json.email })
//         if (!user) {
//           const newUser = {
//             first_name: profile._json.name.split(' ')[0],
//             last_name: profile._json.name.split(' ')[1] || ' ',
//             email: profile._json.email,
//             password: ' ',
//           }
//           const userDB = await userModel.create(newUser)
//           done(null, userDB)
//         } else {
//           done(null, user)
//         }
//       }
//     )
//   )

// serializar el usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// deserializar el usuario para obtenerlo de la sesión
passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id);
    done(null, user);
});