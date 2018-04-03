var socket = io('http://localhost:3000/');

socket.on('connect',function (){
    socket.emit('join',jQuery.deparam(window.location.search),function (err) {
        if(err){
            alert('data entered is incorrect')
            window.location.href = '/'
        }
        else{

        }
    })
})

socket.on('updateUsersList',function(users){
    var ol = jQuery('<ol></ol>')

    users.forEach(user => {
        ol.append(jQuery('<li></li>').text(user))
    });
    jQuery('#users').html(ol);
})


socket.on('disconnect',function (){
console.log('user now disconnected')
})

socket.on('newMessage',function(message){
    var html = Mustache.render(jQuery('#message-template').html(),{
        from:message.from,
        createdAt:message.createdAt,
        text:message.text
    })

    jQuery('#messg').append(html);

    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${message.createdAt} :  ${message.text}`)
    // jQuery('#messg').append(li);
    // console.log(message);
})
socket.on('getLocation',function(message){


    var html = Mustache.render(jQuery('#message-template-location').html(),{
        from:message.from,
        createdAt:message.createdAt,
        url:message.url
    })
    jQuery('#messg').append(html);

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target=_blank>Click Me!</a>')
    // li.text(`${message.from} ${message.createdAt}: `)
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messg').append(li);
    // console.log(message);
})

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault()
    var messageBox = jQuery('[name=messages]');
    socket.emit('createMessage',{
        text: messageBox.val(),
    },function () {
        messageBox.val('')
    })
});

var locationButton = jQuery('#btn-geolocation');

locationButton.on('click',function(params) {
    if(!navigator.geolocation){
        alert('Something went wrong');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('sendLocationMessage',{
            
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        
    },function(){
        locationButton.removeattr('disabled').text('Send Location');        
        console.log('Unable to fetch location');
        
    })
})
