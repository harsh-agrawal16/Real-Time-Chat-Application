const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const {addUser, removeUser , getUser, getUsersInOneRoom } = require('./Users/users');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server); //instance of socket.io
const cors = require('cors');

//middleware
app.use(router);
app.use(cors);

//integrating socket io in our applcation.
io.on('connection', (socket) => {
    //console.log(socket);
    console.log('user has joined');
    
    //we can also pass callback with socket.on and socket.emit
    socket.on('join', (data, callback) => {
        console.log(data.name);
        console.log(data.room);
        
        const { user, error } = addUser({id : socket.id, name : data.name, room : data.room});
     
        //using callback we can do some error handling.
        if(error) callback({error : error});

        socket.join(user.room);

        console.log('Welcome : ', user);

        socket.emit('message', { user : 'admin',  text : ' Welcome to the room ' + data.name});

        socket.broadcast.to(user.room).emit('message', {user : 'admin', text : user.name + ' has joined.'});

        io.to(user.room).emit('roomData', {room : user.room, users : getUsersInOneRoom(user.room)});
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user);
        if(user) io.to(user.room).emit('message', { user : user.name , text : message});
        //callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('user had disconnected!!!');
        if(user){
            io.to(user.room).emit('message', {user : 'admin', text : user.name + ' had left'});
            io.to(user.room).emit('roomData', {room : user.room, users : getUsersInOneRoom(user.room)});
        }
    })
});


server.listen(PORT, () => console.log('Server running'));