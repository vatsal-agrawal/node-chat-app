const express = require('express')
const moment = require('moment')
const path = require('path')
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var pathJoin = path.join(__dirname,'../public')
var app = express();


var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(pathJoin));


io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        var user = users.removeuser(socket.id)
        if(user){
            io.to(user.room_name).emit('updateUsersList',users.getUserList(user.room_name))
            io.to(user.room_name).emit('newMessage',generateMessage('Admin',`${user.name} hasleft`))
        }
        
    }); 
    

    socket.on('join',(message,callback)=>{
        if(!isRealString(message.name) || !isRealString(message.room_name)){
            callback('Please enter correct data');
        }
        socket.join(message.room_name)
        users.removeuser(socket.id)
        users.addUser(socket.id,message.name,message.room_name);

        var namesarray = users.getUserList(message.room_name)

        io.to(message.room_name).emit('updateUsersList',namesarray)
        
        socket.emit('newMessage',{
            from:'admin',
            text:'Welcome User',
            createdAt:moment().format("ddd, hA")
        })
        socket.broadcast.to(message.room_name).emit('newMessage',{
            from:'Admin',
            text:'New User logged in',
            createdAt:moment().format("ddd, hA")
        })
        callback();
    })

    socket.on('createMessage',(message,callback)=>{
        
        
           var user = users.getUser(socket.id);
    
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));  

            

        callback();
    })
    socket.on('sendLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('getLocation',generateLocationMessage(user.name,coords.latitude,coords.longitude))
        }
    })
})

server.listen('3000',()=>{
    console.log('Server is up and Running');
    
})