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
socket.on('getLocation',function(message){

    var li = jQuery('<li></li>');
    var a = jQuery('<a target=_blank>Click Me!</a>')
    li.text(`${message.from} : `)
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messg').append(li);
    console.log(message);
})

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault()
    var messageBox = jQuery('[name=messages]');
    socket.emit('createMessage',{
        from:'user',
        text: messageBox.val(),
    },function () {
        messageBox.val('12345')
    })
});

var locationButton = jQuery('#btn-geolocation');

locationButton.on('click',function(params) {
    if(!navigator.geolocation){
        alert('Something went wrong');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeattr('disabled').text('Send Location');
        socket.emit('sendLocationMessage',{
            
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        
    },function(){
        locationButton.removeattr('disabled').text('Send Location');        
        console.log('Unable to fetch location');
        
    })
})
