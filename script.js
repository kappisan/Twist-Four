
var app = angular.module('app', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/play' })	
			.when('/play', { templateUrl: 'templates/play.html', controller: 'pvpCtrl' })
			.when('/level/1', { templateUrl: 'templates/play.html', controller: 'lv1Ctrl' })
			.when('/level/2', { templateUrl: 'templates/play.html', controller: 'lv2Ctrl' })
			.when('/d3', { templateUrl: 'templates/d3.html' })			
			.otherwise({ redirectTo: '/play' });
	}]);




// CONTROLLERS

app.controller('PageCtrl', ['$scope', '$rootScope', '$http', '$location', function($s, $r, $http, $location) {


	console.log("location", $location.$$path);
	$s.currentPage = $location.$$path;


	$s.winText = "No Win";
	$s.AI = true;
	$s.gameOver = false;
	$s.showLoadingSpinner = true;
	$s.isTouch = !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

	function showSpinner() {
		$s.showLoadingSpinner = true;
		$("#loading-spinner").css("display", "initial");
		$("#center-spinner").css("display", "initial");
	}

	function hideSpinner() {
		console.log("hide");
		$("#loading-spinner").addClass("fade-away");
		$("#center-spinner").css("display", "none");
		setTimeout(function() { 
			$("#loading-spinner").css("display", "none"); 
			$("#loading-spinner").removeClass("fade-away");
		}, 1000);
	}


    angular.element(document).ready(function () {
        setTimeout(function() { hideSpinner(); }, 500);
    });






	$s.twistSection = function twistSection(section) {
		var box4 = $('#s'+section+'4').attr("class");

		$('#s'+section+'4').removeClass("p1-square p2-square");
		$('#s'+section+'4').addClass($('#s'+section+'3').attr("class"));

		$('#s'+section+'3').removeClass("p1-square p2-square");
		$('#s'+section+'3').addClass($('#s'+section+'2').attr("class"));

		$('#s'+section+'2').removeClass("p1-square p2-square");
		$('#s'+section+'2').addClass($('#s'+section+'1').attr("class"));

		$('#s'+section+'1').removeClass("p1-square p2-square");
		$('#s'+section+'1').addClass(box4);

	}




	$s.animateRotateSeg = function animateRotateSeg(seg) {

		$("#seg"+seg).addClass('twisting'); 
		setTimeout(function() { 

			$("#seg"+seg).click(); 
			$("#seg"+seg).removeClass('twisting');

		}, 750);

	}

	$s.rotateSegTouch = function rotateSegTouch(seg) {

		$s.twistSection(seg);

	}

	$s.rotateSegScreen = function rotateSegScreen(seg) {

		$s.twistSection(seg);

	}







	$s.player1Win = function player1Win() {
		$s.winText = "Player 1 Wins";
		$("#game-score").css("display", "inherit");
	}

	$s.player1Lose = function player1Lose() {
		$s.winText = "Game Over";
		$("#game-score").css("display", "inherit");
	}

	$s.player2Win = function player1Win() {
		if($s.AI) $s.winText = "Computer Wins";
		else $s.winText = "Player 2 Wins";
		$("#game-score").css("display", "inherit");
	}

	$s.playerDraw = function playerDraw() {
		$s.winText = "Draw";
		$("#game-score").css("display", "inherit");
	}



	function addWinEffects(sq1,sq2,sq3,sq4) {

		console.log("add win effects", $('#s'+sq1))

		$('#s'+sq1+' div').addClass('pulsating-square');
		$('#s'+sq2+' div').addClass('pulsating-square');
		$('#s'+sq3+' div').addClass('pulsating-square');
		$('#s'+sq4+' div').addClass('pulsating-square');
	}


	$s.checkPlayerWin = function checkPlayerWin(player) {
		var playerWin = false;

		// first row
		if($('#s11').hasClass(player+"-square") && $('#s12').hasClass(player+"-square") && $('#s21').hasClass(player+"-square") && $('#s22').hasClass(player+"-square")) {
			playerWin = true; console.log("first row");
			addWinEffects('11','12','21','22');
		}		


		// second row
		if($('#s14').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s23').hasClass(player+"-square")) {
			playerWin = true; console.log("second row");
			addWinEffects('14','13','24','23');
		}		


		// third row
		if($('#s31').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s42').hasClass(player+"-square")) {
			playerWin = true; console.log("third row");
			addWinEffects('31','32','41','42');
		}		


		// fourth row
		if($('#s34').hasClass(player+"-square") && $('#s33').hasClass(player+"-square") && $('#s44').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("fourth row");
			addWinEffects('34','33','44','43');
		}		


		// first column
		if($('#s11').hasClass(player+"-square") && $('#s14').hasClass(player+"-square") && $('#s31').hasClass(player+"-square") && $('#s34').hasClass(player+"-square")) {
			playerWin = true; console.log("first column");
			addWinEffects('11','14','31','34');
		}		


		// second column
		if($('#s12').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s33').hasClass(player+"-square")) {
			playerWin = true; console.log("second column");
			addWinEffects('12','13','32','33');
		}		


		// third column
		if($('#s21').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s44').hasClass(player+"-square")) {
			playerWin = true; console.log("third column");
			addWinEffects('21','24','41','44');
		}		

		// fourth column
		if($('#s22').hasClass(player+"-square") && $('#s23').hasClass(player+"-square") && $('#s42').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("fourth column");
			addWinEffects('22','23','42','43');
		}		


		// top left diagonal
		if($('#s11').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("left diagonal");
			addWinEffects('11','13','41','43');
		}		

		// top right diagonal
		if($('#s22').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s34').hasClass(player+"-square")) {
			playerWin = true; console.log("right diagonal");
			addWinEffects('22','24','32','34');
		}		

		return playerWin;

	}


	$s.checkWin = function checkWin() {

		/*
			11 12   21 22
			14 13   24 23

			31 32   41 42
			34 33   44 43

		*/

		var p1Win = $s.checkPlayerWin("p1");
		var p2Win = $s.checkPlayerWin("p2");

		// if all squares taken
		var allSquares = true;
		for(var i = 1; i <= 4; i++) {
			for(var j = 1; j <= 4; j++) {
				if(!$('#s'+i+''+j).hasClass("p1-square") && !$('#s'+i+''+j).hasClass("p2-square")) allSquares = false;
			}			
		}

		if($('#s11').hasClass("p1-square") && $('#s12').hasClass("p1-square") && $('#s21').hasClass("p1-square") && $('#s22').hasClass("p1-square")) {
			p1Win = true;
			console.log("first row");
		}


		if(p1Win && p2Win) { $s.playerDraw(); $s.gameOver = true; return true;}
		else if (p1Win) { $s.player1Win(); $s.gameOver = true; return true;}
		else if (p2Win) { $s.player2Win(); $s.gameOver = true; return true;}
		else if (allSquares) { $s.playerDraw(); $s.gameOver = true; return true;}

		return false;
	}



/*
	[{ square: 's11', value: 'player1' }]

*/
	$r.loadBoard = function loadBoard(config) {
		
		config.forEach(function(d) {
			console.log("config", d);
			if(d.value == 'p1-square') $('#'+d.square).addClass('p1-square');
			if(d.value == 'p2-square') $('#'+d.square).addClass('p2-square');
			if(d.value == 'block-square') $('#'+d.square).addClass('block-square');
		})
	}


}]);






































app.controller('lv1Ctrl', ['$scope', '$rootScope', '$http', '$location', function($s, $r, $http, $location) {

	$s.gameTitle = "Level 1";
	$s.move = "p1-twist";
	$s.availableMoves = 2;
	$s.gameDescription = "make 2 twists to win";
	$s.showPlayer2 = false;
	$s.showMovesRemaining = true;

	var config = [{ square: 's31', value: 'p1-square' },
				  { square: 's33', value: 'p1-square' },
				  { square: 's21', value: 'p1-square' },
				  { square: 's23', value: 'p1-square' },
				  { square: 's12', value: 'p1-square' },
				  { square: 's14', value: 'p1-square' },
				  { square: 's42', value: 'p1-square' },
				  { square: 's44', value: 'p1-square' }];

	$r.loadBoard(config);


	$s.selectSquare = function selectSquare(seg,sqr) {

	}

	$s.playAgain = function playAgain() {
		$("#game-score").css("display", "none");
		$(".square").removeClass("p1-square p2-square");
		$(".square div").removeClass("pulsating-square");
		$s.gameOver = false;

		$s.move = "p1-twist";
		$s.availableMoves = 2;
		$r.loadBoard(config);
	}



	$s.rotateSeg = function rotateSeg(seg) {
		console.log("seg",seg);
		if($s.gameOver == true) return;

		if($s.move == "p1-place" || $s.move == "p2-place" || $s.gameOver) return;

		if(!$s.isTouch) {
			$s.rotateSegScreen(seg);
		} else {
			$s.rotateSegTouch(seg);
		}

		
		if($s.move == "p1-twist") {
			$s.move = "p1-twist";
			$s.availableMoves--;
		}

		var won = $s.checkWin();

		if($s.availableMoves <= 0 && !won) $s.player1Lose();

	}







		


}]);





























app.controller('lv2Ctrl', ['$scope', '$rootScope', '$http', '$location', function($s, $r, $http, $location) {

	$s.gameTitle = "Level 2";
	$s.move = "p1-twist";
	$s.availableMoves = 2;
	$s.gameDescription = "make two twists to win";
	$s.showPlayer2 = false;
	$s.showMovesRemaining = true;

		








	var config = [{ square: 's31', value: 'p1-square' },
				  { square: 's34', value: 'p1-square' },
				  { square: 's12', value: 'p1-square' },
				  { square: 's13', value: 'p1-square' },
				  { square: 's21', value: 'p1-square' },
				  { square: 's24', value: 'p1-square' },
				  { square: 's42', value: 'p1-square' },
				  { square: 's43', value: 'p1-square' }];

	$r.loadBoard(config);


	$s.selectSquare = function selectSquare(seg,sqr) {

	}

	$s.playAgain = function playAgain() {
		$("#game-score").css("display", "none");
		$(".square").removeClass("p1-square p2-square");
		$(".square div").removeClass("pulsating-square");
		$s.gameOver = false;

		$s.move = "p1-twist";
		$s.availableMoves = 2;
		$r.loadBoard(config);
	}



	$s.rotateSeg = function rotateSeg(seg) {
		console.log("seg",seg);
		if($s.gameOver == true) return;

		if($s.move == "p1-place" || $s.move == "p2-place" || $s.gameOver) return;

		if(!$s.isTouch) {
			$s.rotateSegScreen(seg);
		} else {
			$s.rotateSegTouch(seg);
		}

		
		if($s.move == "p1-twist") {
			$s.move = "p1-twist";
			$s.availableMoves--;
		}

		var won = $s.checkWin();

		if($s.availableMoves <= 0 && !won) $s.player1Lose();

	}


}]);







































// P v P

app.controller('pvpCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("pvpCtrl");

	$s.gameTitle = "Player vs Player";
	$s.move = "p1-place";
	$s.showPlayer2 = true;
	$s.showMovesRemaining = false;

	$s.playAgain = function playAgain() {
		$("#game-score").css("display", "none");
		$(".square").removeClass("p1-square p2-square");
		$(".square div").removeClass("pulsating-square");
		$s.gameOver = false;

		$s.move = "p1-place";
	}



	$s.selectSquare = function selectSquare(seg,sqr) {

		if($s.AI && $s.move == "p2-place" || $s.gameOver) return;

		if($("#s"+seg+sqr).hasClass("p1-square") || $("#s"+seg+sqr).hasClass("p2-square")) {
			console.log("has class");
			return;
		}

		console.log("selectSquare");
		if($s.move == "p1-place") {
			$('#s'+seg+sqr).addClass("p1-square");
			setTimeout(function() { $s.move = "p1-twist"; $s.$apply()}, 20);
		} else if($s.move == "p2-place") {
			$('#s'+seg+sqr).addClass("p2-square");
			setTimeout(function() { $s.move = "p2-twist"; $s.$apply()}, 20);
		}

		$s.checkWin();
	}


	$s.rotateSeg = function rotateSeg(seg) {
		console.log("seg",seg);
		if($s.gameOver == true) return;

		if($s.move == "p1-place" || $s.move == "p2-place" || $s.gameOver) return;

		if(!$s.isTouch) {
				$s.rotateSegScreen(seg);
		} else {
				$s.rotateSegTouch(seg);
		}

		
		if($s.move == "p1-twist") {
			$s.move = "p2-place";
			//setTimeout(function() { $s.move = "p2-place"; $s.$apply()}, 20);
			if($s.AI) setTimeout(function() { $s.moveAI(); }, 800);

		} else if($s.move == "p2-twist") {
			$s.move = "p1-place";
			 //setTimeout(function() { $s.move = "p1-place"; $s.$apply()}, 20);
		}


		$s.checkWin();

	}

	$s.moveAI = function moveAI() {
		if($s.gameOver == true) return;

		if($s.move == "p2-place") {
			// find empty square
			var randSeg = Math.floor(Math.random() * 4) + 1;
			var randSqr = Math.floor(Math.random() * 4) + 1;

			while($("#s"+randSeg+randSqr).hasClass("p1-square") || $("#s"+randSeg+randSqr).hasClass("p2-square")) {
					randSeg = Math.floor(Math.random() * 4) + 1;
					randSqr = Math.floor(Math.random() * 4) + 1;
			}

			setTimeout(function() { $("#s"+randSeg+randSqr).addClass("p2-square");}, 500);
			setTimeout(function() { $s.move = "p2-twist"; $s.$apply(); $s.moveAI()}, 600);

		} else if($s.move == "p2-twist") {
			// rotate random segment
			var randSeg = Math.floor(Math.random() * 4) + 1;

			$s.animateRotateSeg(randSeg);
		}
	}



	$s.toggleAI = function toggleAI() {
		$s.AI = !$s.AI;

		if($s.AI) $s.moveAI();
	}



}]);



app.controller('socketCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	var socket = io();
	$s.player = { name: "" }

	$s.game = {
		player1: null,
		player2: null
	};

	socket.emit('chat message', "hello, iiiii have connected");

	socket.on('status', function(g){
		$s.game = g;
		console.log("$s.game", g);
		updatePlayers();
	});

	$s.join = function join() {
		//$s.player.name = $s.nameinput;
		console.log("join", $s.player.name);
		socket.emit('join game', $s.player);
	}

	function updatePlayers() {
		if($s.game.player1) $("#player1text").html("" + $s.game.player1.name);
		else $("#player1text").html("____________");

		if($s.game.player2) $("#player2text").html("" + $s.game.player2.name);
		else $("#player2text").html("____________");
	}

	updatePlayers();


}]);









app.controller('d3Ctrl', ['$scope', '$http', '$location', function($s, $http, $location) {


		console.log("D3 angular controller");

		var width = 622,
		    height = 700,
		    segmentGap = 4,
		    squareRows = 2,
		    rotationSpeed = 1/20,
		    segmentRows = 2,
		    squarePadding = 4,
		    segmentSize = (width / segmentRows) - (segmentRows * segmentGap),
		    squareSize = (segmentSize / squareRows) - (squareRows * squarePadding);

		    segmentSize -= squarePadding;

		var svg = d3.select("#board-div").append("svg")
			.attr("class", "boardsvg")
		    .attr("width", width)
		    .attr("height", height);

		var _board = [];

		var segmentsOnBoard = segmentRows * segmentRows;
		var squaresPerSeg = squareRows * squareRows; 

		for(var i = 0; i < segmentsOnBoard; i++) {

			var x = segmentSize + segmentGap;
			if(i == 0 || i == 1) x = 0;

			var y = segmentSize + segmentGap;
			if(i == 0 || i == 2) y = 0;

			var seg = { 
				x: x, 
				y: y,
				seg: i,
				angle: 0,
				centerx: x + (segmentSize / 2),
				centery: y + (segmentSize / 2),
				squares: []
			}

			for(var j = 0; j < squaresPerSeg; j++) {

				var sx = squareSize + (2 * squarePadding);
				if(j == 0 || j == 1) sx = squarePadding;

				var sy = squareSize + (2 * squarePadding);
				if(j == 0 || j == 2) sy = squarePadding;

				var sqr = { 
					x: sx, 
					y: sy,
					parent: i,
					square: j,
					angle: 0,
					state: "empty-square",
					squares: []
				}

				seg.squares.push(sqr);
			}

			_board.push(seg);
		}

		console.log("_board", _board);

		var move = "p1place";

		function drawBoard() {
			_board.forEach(function(segment) {

				// segment group
				var g = svg.append("g")
						    .attr("x", segment.x)
						    .attr("y", segment.y)
						    .attr("height", segmentSize)
					    	.attr("width", segmentSize)
					    	.on("click", function() {

					    		var twisting = true;
					    		var t0 = Date.now();

								d3.timer(function() {

									if(twisting) {
										var delta = (Date.now() - t0);
										delta *= rotationSpeed;

										var composite = segment.angle + delta;

										g.selectAll("rect").attr("transform", function() {
											return "rotate(" + composite + ","+segment.centerx+","+segment.centery+")";
										});

										// return conditions
										if(delta >= 90) {
											delta = 90;
											segment.angle += delta;

											g.selectAll("rect").attr("transform", function() {
												return "rotate("+segment.angle+","+segment.centerx+","+segment.centery+")";
											});										
											twisting = false;
										}
									}
								});

								if(!twisting) return;

					    	});

				// segment background
				g.append("rect")
				    .attr("class", "segment")
				    .attr("x", segment.x)
				    .attr("y", segment.y)
				    .attr("height", segmentSize)
				    .attr("width", segmentSize);

				// iterate over squares 
				segment.squares.forEach(function(square) {

					g.append("rect")
					    .attr("class", square.state )
					    .attr("x", function() {
					    	return square.x + segment.x;
					    })
					    .attr("y", function() {
					    	return square.y + segment.y;
					    })
					    .attr("height", squareSize)
					    .attr("width", squareSize)
					    .on("click", function(d) {
					    	console.log("d", square, this);

					    	if(move == "p1place") {
					    		square.state = "red-square";
					    		move = "p2place";
					    	} else {
					    		square.state = "blue-square";
					    		move = "p1place";
					    	}

				    		d3.select(this).attr("class", square.state);

					    	document.getElementById("move").innerHTML = "" + move;
					    })
				});

			});
		}

		drawBoard();



}]);