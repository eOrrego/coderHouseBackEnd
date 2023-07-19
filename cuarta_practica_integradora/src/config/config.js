import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    secretKey: process.env.SECRETKEY,
    secretKeyReset: process.env.SECRETKEYRESET,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    mailing_user: process.env.MAILING_USER,
    mailing_password: process.env.MAILING_PASSWORD,
    mailing_service: process.env.MAILING_SERVICE,
    url_frontend: process.env.URL_FRONTEND
    // node_env: process.env.NODE_ENV
}