import mongoose from 'mongoose';
import config from '../config/config.js';

const URI = config.MONGO_ATLAS_URL;

mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(error => console.error(error));