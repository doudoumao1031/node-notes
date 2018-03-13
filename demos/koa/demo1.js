var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(3000,function(){
    console.log("demo1 app listening on port 3000!")
});