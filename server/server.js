const express = require('express')
const moment = require('moment')
const path = require('path')
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

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
        from:'admin',
        text:'Welcome User',
        createdAt:moment().format("ddd, hA")
    })
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User logged in',
        createdAt:moment().format("ddd, hA")
    })

    socket.on('join',(message,callback)=>{
        if(!isRealString(message.name) || !isRealString(message.room_name)){
            callback('Please enter correct data');
        }
        callback();
    })

    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',generateMessage(message.from,message.text));  
        callback();
    })
    socket.on('sendLocationMessage',(coords)=>{
        io.emit('getLocation',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    })
})

server.listen('3000',()=>{
    console.log('Server is up and Running');
    
})