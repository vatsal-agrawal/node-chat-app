const moment =require('moment');

var generateMessage = (from,text)=>{
return {
    from:from,
    text:text,
    createdAt:moment().format("ddd, hA")
}
}

var generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from:from,
        url:`https://www.google.com/maps/@${latitude},${longitude}`,
        createdAt:moment().format("ddd, hA")
    }
    }
module.exports = {generateMessage,generateLocationMessage}