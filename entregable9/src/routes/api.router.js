import businessRouter from '../routes/business.router.js';
import productsRouter from '../routes/products.router.js';
import usersRouter from '../routes/users.router.js';
import cartsRouter from '../routes/carts.router.js';
import ordersRouter from '../routes/orders.router.js';
import loggerRouter from '../routes/logger.router.js';

import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/business', businessRouter);

apiRouter.use('/products', productsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/carts', cartsRouter);

apiRouter.use('/orders', ordersRouter);

apiRouter.use('/test', loggerRouter);

export default apiRouter;