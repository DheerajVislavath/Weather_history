'use strict'

var express = require('express');
var app = express();
var path = require("path");
app.use(express.static('public'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/weather.html'));
});


var server = app.listen(process.env.PORT || '8080', function(){
	console.log('App listening on port %s', server.address().port);
});