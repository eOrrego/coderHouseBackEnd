import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    secretKey: process.env.SECRETKEY,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
}