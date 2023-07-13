import mongoose from 'mongoose';
import config from '../../config/config.js';
import { logger } from '../../utils/logger.utils.js';

const URI = config.mongo_uri;

// mongoose.connect(URI)
//     .then(() => console.log('DB is connected'))
//     .catch(err => console.error(err));


const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        logger().info('MongoDB connected');
        //console.log('MongoDB connected');
    } catch (error) {
        logger().error(error);
        //console.log(error);
    }
}

export default connectDB;