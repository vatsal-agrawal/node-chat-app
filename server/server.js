const express = require('express')
const path = require('path')
const http = require('http');
const socketIO = require('socket.io');

var pathJoin = path.join(__dirname,'../public')
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pathJoin));


io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    }); 
    socket.emit('newMessage',{
        from:'abc',
        message:'hello',
        createdAt:'12345'
    }) 
    socket.on('createMessage',(message)=>{
        console.log(message);
        
    })
})

server.listen('3000',()=>{
    console.log('Server is up and Running');
    
})