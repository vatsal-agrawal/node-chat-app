var socket = io();
socket.on('connect',function (){
console.log('user now connected')
})
socket.on('disconnect',function (){
console.log('user now disconnected')
})
socket.on('newMessage',function(message){
console.log(message);
})
socket.emit('createMessage',{
    from:'def',
    text:'blah blah blah'
})