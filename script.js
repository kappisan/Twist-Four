
var app = angular.module('app', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/play' })	
			.when('/play', { templateUrl: 'templates/play.html' })
			.when('/d3', { templateUrl: 'templates/d3.html' })			
			.otherwise({ redirectTo: '/play' });
	}]);




// CONTROLLERS
app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {


	console.log("location", $location.$$path);
	$s.currentPage = $location.$$path;

	$s.move = "p1-place";
	$s.winText = "No Win";
	$s.AI = true;
	$s.gameOver = false;
	$s.isTouch = !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;


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

	$s.rotateSegTouch = function rotateSegTouch(seg) {

		$s.twistSection(seg);

	}

	$s.rotateSegScreen = function rotateSegScreen(seg) {

		$s.twistSection(seg);




	}

	$s.rotateSeg = function rotateSeg(seg) {
		console.log("seg",seg);

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

	$s.animateRotateSeg = function animateRotateSeg(seg) {

		$("#seg"+seg).addClass('twisting'); 
		setTimeout(function() { 

			$("#seg"+seg).click(); 
			$("#seg"+seg).removeClass('twisting');

		}, 750);

	}


	$s.toggleAI = function toggleAI() {
		$s.AI = !$s.AI;

		if($s.AI) $s.moveAI();
	}


	$s.player1Win = function player1Win() {
		$s.winText = "Player 1 Wins";
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


	$s.playAgain = function playAgain() {
		$("#game-score").css("display", "none");
		$(".square").removeClass("p1-square p2-square");
		$s.gameOver = false;
		$s.move = "p1-place";
	}


	$s.checkPlayerWin = function checkPlayerWin(player) {
		var playerWin = false;

		// first row
		if($('#s11').hasClass(player+"-square") && $('#s12').hasClass(player+"-square") && $('#s21').hasClass(player+"-square") && $('#s22').hasClass(player+"-square")) {
			playerWin = true; console.log("first row");
		}		


		// second row
		if($('#s14').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s23').hasClass(player+"-square")) {
			playerWin = true; console.log("second row");
		}		


		// third row
		if($('#s31').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s42').hasClass(player+"-square")) {
			playerWin = true; console.log("third row");
		}		


		// fourth row
		if($('#s34').hasClass(player+"-square") && $('#s33').hasClass(player+"-square") && $('#s44').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("fourth row");
		}		


		// first column
		if($('#s11').hasClass(player+"-square") && $('#s14').hasClass(player+"-square") && $('#s31').hasClass(player+"-square") && $('#s34').hasClass(player+"-square")) {
			playerWin = true; console.log("first column");
		}		


		// second column
		if($('#s12').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s33').hasClass(player+"-square")) {
			playerWin = true; console.log("second column");
		}		


		// third column
		if($('#s21').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s44').hasClass(player+"-square")) {
			playerWin = true; console.log("third column");
		}		

		// fourth column
		if($('#s22').hasClass(player+"-square") && $('#s23').hasClass(player+"-square") && $('#s42').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("fourth column");
		}		


		// top left diagonal
		if($('#s11').hasClass(player+"-square") && $('#s13').hasClass(player+"-square") && $('#s41').hasClass(player+"-square") && $('#s43').hasClass(player+"-square")) {
			playerWin = true; console.log("left diagonal");
		}		

		// top right diagonal
		if($('#s22').hasClass(player+"-square") && $('#s24').hasClass(player+"-square") && $('#s32').hasClass(player+"-square") && $('#s34').hasClass(player+"-square")) {
			playerWin = true; console.log("right diagonal");
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


		if(p1Win && p2Win) { $s.playerDraw(); $s.gameOver = true; }
		else if (p1Win) { $s.player1Win(); $s.gameOver = true; }
		else if (p2Win) { $s.player2Win(); $s.gameOver = true; }
		else if (allSquares) { $s.playerDraw(); $s.gameOver = true; }

	}


	// ON MOUSE MOVE
	$(document).on('mousemove', function(e){
	    //console.log( e.pageX, e.pageY);
	});


}]);


