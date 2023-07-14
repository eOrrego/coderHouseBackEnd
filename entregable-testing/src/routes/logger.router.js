import { handleRequest } from "../controllers/logger.controller.js";
import { logRequest } from "../middlewares/logger.middleware.js";
import { Router } from "express";

const router = Router();

router.get('/loggerTest', logRequest, handleRequest);

export default router;