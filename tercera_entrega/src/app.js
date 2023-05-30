import express from 'express';
import config from './config/config.js';
// import './DAL/mongoDB/dbConfig.js'
import connectDB from './DAL/mongoDB/dbConfig.js';
import morgan from 'morgan';
import businessRouter from './routes/business.router.js';

const app = express();

connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/business', businessRouter);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
