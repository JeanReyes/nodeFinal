const path = require('path');
const express = require('express');
//import express from 'express';

const app = express();
//settings 
app.set('port', process.env.PORT || 3000);
// static files

//establesco la ruta donde estaran mis archivos estaticos 
app.use(express.static(path.join(__dirname, '../public')));





// start the server
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});


//websockets
const SocketIO = require('socket.io');
//ejectuamos socket, nesecita un server
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log("nueva coneccion");

    //escucho el evento y recibo los datos
    socket.on('chat:messaje', (data)=>{
        //emito el mejsae al cliente
        io.sockets.emit('chat:messaje', data);
    });

    //recibo los datos y devuelvo al cliente
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
});

app.use(require('./routes/rutas'));





