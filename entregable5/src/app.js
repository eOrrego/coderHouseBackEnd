import express from 'express';

// importar el archivo dbConfig.js para que se ejecute y se conecte a la base de datos
import './db/dbConfig.js';

// importar el router de productos (products.router.js) y asignarlo a la variable productsRouter
import productsRouter from './routes/products.router.js';

// importar el router de carritos (carts.router.js) y asignarlo a la variable cartsRouter
import cartsRouter from './routes/carts.router.js';

// importar el __dirname para poder usarlo en app.js
import { __dirname } from './utils/dirname.js';

// importar el modulo de handlebars para poder usarlo en app.js y en la carpeta views
import handlebars from 'express-handlebars';

// importar server de socket.io
import { Server } from 'socket.io';

// importar el router de vistas (views.router.js) y asignarlo a la variable viewsRouter
import viewsRouter from './routes/views.router.js';

// importar el modelo de mensajes
import { messagesModel } from './db/models/messages.model.js';

// importar cookie-parser
import cookieParser from 'cookie-parser';

// importar express-session para manejar sesiones de usuario en el servidor (cookies) y asignarlo a la variable session (para usarlo como middleware)
import session from 'express-session';

// importar FileStore para guardar las sesiones en el servidor (en archivos) y asignarlo a la variable FileStore (para usarlo como middleware)
import FileStore from 'session-file-store';

// importar connect-mongo para guardar las sesiones en la base de datos (en una colección) y asignarlo a la variable MongoStore (para usarlo como middleware)
import MongoStore from 'connect-mongo';

//crear una aplicación express
const app = express();

// fileStore para guardar las sesiones en el servidor (en archivos)
const FileStoreSession = FileStore(session);

//middlewares para analizar el cuerpo de la solicitud
app.use(express.json());

//parse application/x-www-form-urlencoded (para formularios HTML)
app.use(express.urlencoded({ extended: true }));

// cookie-parser para analizar las cookies de la solicitud HTTP y asignarlas a req.cookies
app.use(cookieParser());

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

// session para manejar sesiones de usuario en el servidor (cookies) usando FileStore para guardar las sesiones en el servidor (en archivos)
// app.use(session({
//     store: new FileStoreSession({
//         // nombre de la carpeta donde se guardarán los archivos de sesión
//         path: __dirname + '/sessions',
//         //ttl: 60 * 60 * 24 * 7, // 1 semana
//     }),
//     // resave es false para que no se guarde la sesión en cada petición
//     resave: false,
//     // saveUninitialized es false para que no se guarde la sesión en cada petición si no hay cambios en la sesión
//     saveUninitialized: false,
//     // secret es una cadena de texto que se usa para firmar la cookie de sesión
//     secret: 'secreto',
//     // maxAge es el tiempo de vida de la cookie de sesión en milisegundos
//     cookie: {maxAge: 1000 * 60 * 60 * 24 * 7} // 1 semana
// }));

// session para manejar sesiones de usuario en el servidor (cookies) usando MongoStore para guardar las sesiones en la base de datos (en una colección)
app.use(session({
    store: MongoStore.create({
        // nombre de la base de datos donde se guardarán las sesiones
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        //ttl: 60 * 60 * 24 * 7, // 1 semana
    }),
    // resave es false para que no se guarde la sesión en cada petición
    resave: false,
    // saveUninitialized es false para que no se guarde la sesión en cada petición si no hay cambios en la sesión
    saveUninitialized: false,
    // secret es una cadena de texto que se usa para firmar la cookie de sesión
    secret: 'secreto',
    // maxAge es el tiempo de vida de la cookie de sesión en milisegundos
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7} // 1 semana
}));

// configurar el servidor para que use el router de vistas (views.router.js) y asignarlo a la ruta /views
app.use('/views', viewsRouter)

//las rutas para los endpoints de la API de productos (REST) se definen en el router de productos (products.router.js) y se asignan a la ruta /api/products
app.use('/api/products', productsRouter);

//las rutas para los endpoints de la API de carritos (REST) se definen en el router de carritos (carts.router.js) y se asignan a la ruta /api/carts
app.use('/api/carts', cartsRouter);

// port para el servidor (8080) o el puerto definido en las variables de entorno (process.env.PORT)
app.set("port", process.env.PORT || 8080);

// escuchar en el puerto 8080 y mostrar un mensaje en la consola cuando el servidor esté inicializado (listening)
const httpServer = app.listen(app.get("port"), () => {
    console.log('Servidor iniciado en el puerto: ', app.get("port"));
    console.log(`http://localhost:${app.get("port")}`);
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