const PORT=8844; 

/*
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

server = app.listen(PORT);

var host = server.address().address
var port = server.address().port

console.log("four twist server listening on port %s", port);

*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('./d3.html');
});

app.get('/libs/d3.min.js', function(req, res){
  res.sendfile('./libs/d3.min.js');
});

app.get('/libs/jquery.min.js', function(req, res){
  res.sendfile('./libs/jquery.min.js');
});

var game = {
	player1: null,
	player2: null
}

var player1;
var player2;

io.on('connection', function(socket){

	io.emit('status', game);

	console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});

	socket.on('join game', function(player){
		console.log('join game: ' + player);
		if(!game.player1) game.player1 = player;
		else if(!game.player2) game.player2 = player;

		io.emit('status', game);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');

	});

});

http.listen(PORT, function(){
  console.log('listening on port:', PORT);
});