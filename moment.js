// Importar la dependencia moment.js
const moment = require('moment');

// Obtener la fecha actual
const fechaActual = moment();

// Obtener la fecha de nacimiento
const fechaNacimiento = moment('1985-06-19');

// Validar si la fecha de nacimiento es válida
if (fechaNacimiento.isValid()) {
    // Calcular la cantidad de días desde la fecha de nacimiento hasta la fecha actual
    const cantidadDias = fechaActual.diff(fechaNacimiento, 'days');

    // Mostrar la cantidad de días por consola
    console.log(`Han pasado ${cantidadDias} días desde mi nacimiento hasta hoy.`);
} else {
    console.log('La fecha de nacimiento no es válida.');
}