import express from 'express';

import './db/dbConfig.js';

// importar el router de productos (products.router.js) y asignarlo a la variable productsRouter
import productsRouter from './routes/products.router.js';

// importar el router de carritos (carts.router.js) y asignarlo a la variable cartsRouter
import cartsRouter from './routes/carts.router.js';

// importar el __dirname para poder usarlo en app.js
import { __dirname } from './utils/dirname.js';

// importar el modulo de handlebars para poder usarlo en app.js y en la carpeta views
import handlebars from 'express-handlebars';

import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'

import { messagesModel } from './db/models/messages.model.js'

//crear una aplicación express
const app = express();

//middlewares para analizar el cuerpo de la solicitud
app.use(express.json());

//parse application/x-www-form-urlencoded (para formularios HTML)
app.use(express.urlencoded({ extended: true }));

// los archivos estáticos (HTML, CSS, JS) se sirven desde la carpeta pública (public)
app.use('/public', express.static(__dirname + '/public/html'));

// configurar el servidor para que use la carpeta pública (public) como carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));

// configurar el motor de plantillas (template engine) para que use handlebars
app.engine('handlebars', handlebars.engine());

// configurar la carpeta de vistas (views) y el motor de plantillas (template engine) para que use handlebars
app.set('views', __dirname + '/views');

// configurar el motor de plantillas (template engine) para que use handlebars
app.set('view engine', 'handlebars');

app.use('/views', viewsRouter)

//las rutas para los endpoints de la API de productos (REST) se definen en el router de productos (products.router.js) y se asignan a la ruta /api/products
app.use('/api/products', productsRouter);

//las rutas para los endpoints de la API de carritos (REST) se definen en el router de carritos (carts.router.js) y se asignan a la ruta /api/carts
app.use('/api/carts', cartsRouter);

app.set("port", process.env.PORT || 8080);

// escuchar en el puerto 8080 y mostrar un mensaje en la consola cuando el servidor esté inicializado (listening)
const httpServer = app.listen(app.get("port"), () => {
    console.log('Servidor iniciado en el puerto: ', app.get("port"));
});


// websocket

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    })

    socket.on("message", async (data)=>{

        const newMessage = new messagesModel({
            user: data.user,
            message: data.msg,
        });
        await newMessage.save();

        socket.broadcast.emit("message", data)
    })
    
    socket.on('usuarioNuevo', async (usuario) => {
        socket.broadcast.emit('broadcast', usuario)

        const messages = await messagesModel.find();

        socket.emit('chat', messages)
    })
})