// importar dotenv para leer variables de entorno
import dotenv from 'dotenv';

// leer variables de entorno del archivo .env
dotenv.config();

// exportar las variables de entorno

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    PORT: process.env.PORT,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
}