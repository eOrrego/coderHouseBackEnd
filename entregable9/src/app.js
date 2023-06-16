import express from 'express';
import config from './config/config.js';
import compression from 'express-compression';
// import './DAL/mongoDB/dbConfig.js'
import connectDB from './DAL/mongoDB/dbConfig.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api.router.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { logger } from './utils/logger.utils.js';

const app = express();
const NODE_ENV = config.node_env
const log = logger(NODE_ENV);
app.use(compression());

// app.use(compression({
//     brotli: {
//         enabled: true, zlib: {
//             level: 11
//         }
//     }
// }));

connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', apiRouter);

app.use(errorMiddleware);

const PORT = config.port;

app.listen(PORT, () => {
    //console.log(`Server running on port ${PORT}`);
    log.info(`Server running on port ${PORT}`);
});