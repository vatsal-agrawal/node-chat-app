const express = require('express')
const path = require('path')

var pathJoin = path.join(__dirname,'../public')
var app = express();

app.use(express.static(pathJoin));

app.listen('3000',()=>{
    console.log('Server is up and Running');
    
})