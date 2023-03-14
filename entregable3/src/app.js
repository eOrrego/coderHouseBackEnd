import express from 'express';

// importar el router de productos (products.router.js) y asignarlo a la variable productsRouter
import productsRouter from './routes/products.router.js';

// importar el router de carritos (carts.router.js) y asignarlo a la variable cartsRouter
import cartsRouter from './routes/carts.router.js';

// importar el __dirname para poder usarlo en app.js
import { __dirname } from './utils/dirname.js';

// importar el modulo de handlebars para poder usarlo en app.js y en la carpeta views
import handlebars from 'express-handlebars';

//crear una aplicación express
const app = express();

//middlewares para analizar el cuerpo de la solicitud
app.use(express.json());

//parse application/x-www-form-urlencoded (para formularios HTML)
app.use(express.urlencoded({ extended: true }));

// los archivos estáticos (HTML, CSS, JS) se sirven desde la carpeta pública (public)
app.use('/public', express.static(__dirname + '/public/html'));
//las rutas para los endpoints de la API de productos (REST) se definen en el router de productos (products.router.js) y se asignan a la ruta /api/products
app.use('/api/products', productsRouter);

//las rutas para los endpoints de la API de carritos (REST) se definen en el router de carritos (carts.router.js) y se asignan a la ruta /api/carts
app.use('/api/carts', cartsRouter);

// configurar el motor de plantillas (template engine) para que use handlebars
app.engine('handlebars', handlebars.engine());

// configurar la carpeta de vistas (views) y el motor de plantillas (template engine) para que use handlebars
app.set('views', __dirname + '/views');

// configurar el motor de plantillas (template engine) para que use handlebars
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('primera');
});

app.get('/segunda', (req, res) => {
    res.render('segunda');
});


// escuchar en el puerto 8080 y mostrar un mensaje en la consola cuando el servidor esté inicializado (listening)
app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
