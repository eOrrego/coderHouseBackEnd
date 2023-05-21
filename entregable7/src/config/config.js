// importar dotenv para leer variables de entorno
import dotenv from 'dotenv';

// leer variables de entorno del archivo .env
dotenv.config();

// exportar las variables de entorno

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'mongodb+srv://test:coderHouse@steveo.bxgkikt.mongodb.net/ecommerce?retryWrites=true&w=majority',
    PORT: process.env.PORT || 8080,
    ADMIN_NAME: process.env.ADMIN_NAME || 'adminCoder',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'AdM1nC0d3R2022',
}