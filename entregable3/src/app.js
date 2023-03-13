import express from 'express';

// importar el router de productos (products.router.js) y asignarlo a la variable productsRouter
import productsRouter from './routes/products.router.js';

// importar el __dirname para poder usarlo en app.js
import {__dirname} from './utils/dirname.js';

//crear una aplicación express
const app = express();

//middlewares para analizar el cuerpo de la solicitud
app.use(express.json());

//parse application/x-www-form-urlencoded (para formularios HTML)
app.use(express.urlencoded({ extended: true }));

// los archivos estáticos (HTML, CSS, JS) se sirven desde la carpeta pública (public)
app.use('/public',express.static(__dirname));
//las rutas para los endpoints de la API de productos (REST) se definen en el router de productos (products.router.js) y se asignan a la ruta /api/products
app.use('/api/products', productsRouter);


// escuchar en el puerto 8080 y mostrar un mensaje en la consola cuando el servidor esté inicializado (listening)
app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
