// importar el módulo express
import express from 'express';

// importar el router de productos (products.router.js) y asignarlo a la variable productsRouter
import productsRouter from './routes/products.router.js';

// importar el router de carritos (carts.router.js) y asignarlo a la variable cartsRouter
import cartsRouter from './routes/carts.router.js';

// importar el router de vistas (views.router.js) y asignarlo a la variable viewsRouter
import viewsRouter from './routes/views.router.js';

// importar el __dirname para poder usarlo en app.js
import { __dirname } from './utils/dirname.js';

// importar el modulo de handlebars para poder usarlo en app.js y en la carpeta views
import handlebars from 'express-handlebars';

// importar el modulo de socket.io para poder usarlo en app.js
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';

//crear una aplicación express
const app = express();

//middlewares para analizar el cuerpo de la solicitud
app.use(express.json());

//parse application/x-www-form-urlencoded (para formularios HTML)
app.use(express.urlencoded({ extended: true }));

// los archivos estáticos (HTML, CSS, JS) se sirven desde la carpeta pública (public)
// ejemplo de pagina estatica: http://localhost:8080/public/index.html
app.use('/public', express.static(__dirname + '/public/html'));

// configurar el servidor para que use la carpeta pública (public) como carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));

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

// rutas de vistas para usar con handlebars (views.router.js)
app.use('/views', viewsRouter);

// escuchar en el puerto 8080 y mostrar un mensaje en la consola cuando el servidor esté inicializado (listening)
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

// inicializar el socket.io con el servidor http
const io = new Server(httpServer);

//PRACTICA TEORIA
// configurar el socket.io para que escuche los eventos de conexión y desconexión de clientes
// io.on('connection', (socket) => {
//     console.log('Nuevo cliente conectado!');

//     // escuchar los mensajes del cliente (on) y mostrarlos en la consola del servidor
//     socket.on('message', (data) => {
//         console.log("escuchando desde servidor: ",data);
//     });

//     socket.emit('evento_para_socket_individual', 'socket.emit -- Hola desde el servidor');

//     socket.broadcast.emit('evento_para_todos_menos_socket_actual', 'socket.broadcast.emit -- Un cliente se ha conectado');

//     io.emit('evento_para_todos', 'io.emit -- Un cliente se ha conectado');

//     // escuchar el evento de desconexión del cliente y mostrar un mensaje en la consola del servidor
//     socket.on('disconnect', () => {
//         console.log('Cliente desconectado');
//     });
// });

const productManager = new ProductManager(__dirname + '/productos.json');

// obtener los productos del archivo productos.json
const products = await productManager.getProducts();

// configurar el socket.io para que escuche los eventos de conexión y desconexión de clientes
io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado ${socket.id}`);

    // Practica teoria
    socket.emit('message0', 'Bienvenido! estas conectado con el servidor');

    socket.broadcast.emit('message1', `Un nuevo cliente se ha conectado con id: ${socket.id}`);

    socket.on('createProduct', async (product) => {

        const productsPush = products;
        productsPush.push(product);

        io.emit('product-list', productsPush);

        socket.broadcast.emit('message3', `El cliente con id: ${socket.id} ha creado un producto nuevo`);

        await productManager.addProduct(product);
    });

    socket.on('deleteProduct', async (id) => {

        const productsPush = products.filter((product) => product.id !== id);

        io.emit('product-list', productsPush);

        socket.broadcast.emit('message4', `El cliente con id: ${socket.id} ha eliminado un producto con id: ${id}`);

        await productManager.deleteProduct(id);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');

        io.emit('message2', `Un cliente se ha desconectado con id: ${socket.id}`);

    });
});


