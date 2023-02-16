function multiplicacion(a, b) {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            reject(new Error("Los factores no pueden ser negativos."));
        } else {
            const product = a * b;
            if (product < 0) {
                reject(new Error("La calculadora sólo puede devolver valores positivos."));
            } else {
                resolve(product);
            }
        }
    });
}


function division(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject(new Error("No se puede dividir entre cero."));
        } else {
            resolve(a / b);
        }
    });
}


async function calculos(a, b) {
    try {
        const producto = await multiplicacion(a, b);
        console.log("El producto es:", producto);

        const cociente = await division(a, b);
        console.log("El cociente es:", cociente);
    } catch (error) {
        console.error(error.message);
    }
}


const s1 = calculos(4, 5);
const s2 = calculos(-4, 5);
const s3 = calculos(4, 0);

