import { verifyToken } from "../utils/jwt.utils.js";

// verificar usuario logeados
export const verifyTokenAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json("Unauthorized");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}

// verificar usuario logeados y que sea admin o premium
export const verifyTokenAdminPremium = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json("Unauthorized");
        }
        if (decoded.role !== "admin" && decoded.role !== "premium") {
            return res.status(403).json("Forbidden");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}

// verificar usuario logeados y que sea admin
export const verifyTokenAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json("Unauthorized");
        }
        if (decoded.role !== "admin") {
            return res.status(403).json("Forbidden");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}

// verificar usuario logeados y que sea user
export const verifyTokenUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json("Unauthorized");
        }
        if (decoded.role == "admin") {
            return res.status(403).json("Forbidden");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}