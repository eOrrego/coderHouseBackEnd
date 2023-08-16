import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashData = async (data) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
}

export const compareData = async (data, hash) => {
    const result = await bcrypt.compare(data, hash);
    return result;
}