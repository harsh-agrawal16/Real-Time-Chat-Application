const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server); //instance of socket.io

//middleware
app.use(router);

//integrating socket io in our applcation.
io.on('connection', (socket) => {
    console.log(socket);

    socket.on('disconnect', () => {
        console.log('user had disconnected!!!');
    })
});


server.listen(PORT, () => console.log('Server running'));