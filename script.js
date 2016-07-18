
var app = angular.module('app', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/play' })	
			.when('/play', { templateUrl: 'templates/play.html', controller: 'pvpCtrl' })
			.when('/level/1', { templateUrl: 'templates/play.html', controller: 'lv1Ctrl' })
			.when('/d3', { templateUrl: 'templates/d3.html' })			
			.otherwise({ redirectTo: '/play' });
	}]);




// CONTROLLERS

app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {


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


		if(p1Win && p2Win) { $s.playerDraw(); $s.gameOver = true; }
		else if (p1Win) { $s.player1Win(); $s.gameOver = true; }
		else if (p2Win) { $s.player2Win(); $s.gameOver = true; }
		else if (allSquares) { $s.playerDraw(); $s.gameOver = true; }

	}


	$s.loadBoard = function loadBoard(config) {
		if(true) console.log("board", config);
	}


}]);






































app.controller('lv1Ctrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.gameTitle = "Level 1";
	$s.move = "p1-twist";
	$s.gameDescription = "make 2 twists to win";
	$s.showPlayer2 = false;




	$s.selectSquare = function selectSquare(seg,sqr) {
		return;
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
		}

		$s.checkWin();
	}

}]);








































// P v P

app.controller('pvpCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("pvpCtrl");

	$s.gameTitle = "Player vs Player";
	$s.move = "p1-place";
	$s.showPlayer2 = true;

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
