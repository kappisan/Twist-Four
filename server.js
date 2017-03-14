const PORT=8844; 

var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./'));

var game = {
	player1: null,
	player2: null,
	active: false,
	move: null
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

		if(game.player1 && game.player2) game.active = true;

		io.emit('status', game);
	});

	socket.on('player move', function(move){
		console.log('player move: ' + move);

		io.emit('move made', move);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
		game = {
			player1: null,
			player2: null,
			active: false,
			move: null
		}
		io.emit('status', game);

	});

});

http.listen(PORT, function(){
  console.log('listening on port:', PORT);
});

