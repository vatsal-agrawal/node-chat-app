var socket = io('http://localhost:3000/');
socket.on('connect',function (){
console.log('user now connected')
})
socket.on('disconnect',function (){
console.log('user now disconnected')
})

socket.on('newMessage',function(message){

    var li = jQuery('<li></li>');
    li.text(`${message.from} :  ${message.text}`)
    jQuery('#messg').append(li);
    console.log(message);
})
jQuery('#message-form').on('submit',function (e) {
    e.preventDefault()

    socket.emit('createMessage',{
        from:'user',
        text: jQuery('[name=messages]').val(),
    })
});
