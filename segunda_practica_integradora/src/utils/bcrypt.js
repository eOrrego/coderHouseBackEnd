import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
