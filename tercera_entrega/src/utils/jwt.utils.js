import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const SECRETKEY = config.secretKey;

export const generateToken = (user) => {
    const data = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(data, SECRETKEY, { expiresIn: '1h' });
}

export const verifyToken = (token) => {
    return jwt.verify(token, SECRETKEY);
}

export const decodeToken = (token) => {
    return jwt.decode(token);
}

export const getToken = (authorization) => {
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }
    return null;
}

