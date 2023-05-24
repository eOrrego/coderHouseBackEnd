import { Router } from "express";
import passport from 'passport';
import { jwtAuthCookie } from "../middlewares/auth.middleware.js";

// Creamos un router para poder usar los endpoints de la API de carritos (REST)
const router = Router();

// extraer usuario de la sesión actual
router.get('/current', jwtAuthCookie, passport.authenticate('current', { session: false }), (req, res) => {
    res.send(req.user);
});

export default router;