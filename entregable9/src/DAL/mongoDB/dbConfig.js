import mongoose from 'mongoose';
import config from '../../config/config.js';

const URI = config.mongo_uri;

// mongoose.connect(URI)
//     .then(() => console.log('DB is connected'))
//     .catch(err => console.error(err));


const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;