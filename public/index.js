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

jQuery('#btn-geolocation').on('click',function(params) {
    if(!navigator.geolocation){
        alert('Something went wrong');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createMessage',{
            from:'Admin',
            text: `Latitude is ${position.coords.latitude} and Longitide is ${position.coords.longitude}`
        })
        
    },function(){
        console.log('Unable to fetch location');
        
    })
})
