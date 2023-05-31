import express from 'express';
import config from './config/config.js';
// import './DAL/mongoDB/dbConfig.js'
import connectDB from './DAL/mongoDB/dbConfig.js';
import morgan from 'morgan';
import businessRouter from './routes/business.router.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import ordersRouter from './routes/orders.router.js';

const app = express();

connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/business', businessRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
