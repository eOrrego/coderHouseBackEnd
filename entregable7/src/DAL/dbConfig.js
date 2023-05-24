import mongoose from 'mongoose';
import config from '../config/config.js';

const URI = config.MONGO_ATLAS_URL;

// conecta a la base de datos y devuelve un mensaje si se conecta o un error si no se conecta
mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(error => console.error(error));