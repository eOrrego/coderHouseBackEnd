import { processRequest } from "../services/logger.service.js";
import { logger } from "../utils/logger.utils.js";

export const handleRequest = (req, res) => {
    try {
        processRequest();
        logger().info('Request processed successfully');
        res.status(200).send('Request processed successfully');
    } catch (error) {
        logger().error(error.message, error);
        res.status(500).send('Internal server error');
    }
};