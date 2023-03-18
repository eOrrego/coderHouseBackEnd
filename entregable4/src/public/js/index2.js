const socket = io();
console.log('ver que trae socket = io(): ', socket);

// enviar un mensaje al servidor (emit)
socket.emit('message', 'Hola desde el cliente');

socket.on('evento_para_socket_individual', (data) => {
    console.log("evento_para_socket_individual - escuchando cliente: ", data);
});

socket.on('evento_para_todos_menos_socket_actual', (data) => {
    console.log("evento_para_todos_menos_socket_actual - escuchando cliente: ", data);
});

socket.on('evento_para_todos', (data) => {
    console.log("evento_para_todos - escuchando cliente: ", data);
});
