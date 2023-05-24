import bcrypt from "bcrypt";

// funcion para hashear la contraseña
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// funcion para comparar la contraseña hasheada con la contraseña recibida
export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
