import { logger } from "../utils/logger.utils.js";

export const processRequest = () => {
    logger().debug('This is a debug message');
    logger().http('This is an HTTP message');
    logger().info('This is an info message');
    logger().warn('This is a warning message');
    logger().error('This is an error message');
    logger().fatal('This is a fatal message');
};