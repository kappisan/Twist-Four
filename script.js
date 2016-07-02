var app = angular.module('app', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/play' })	
			.when('/play', { templateUrl: 'templates/play.html' })
			.otherwise({ redirectTo: '/play' });
	}]);


// CONTROLLERS
app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("location", $location.$$path);
	$s.currentPage = $location.$$path;

	$s.move = "p1-place";
	$s.winText = "No Win";


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


    $s.okToMove = true;

	$s.selectSquare = function selectSquare(seg,sqr) {

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

		if($s.move == "p1-place" || $s.move == "p2-place") return;

		if($s.move == "p1-twist") {
			$s.twistSection(seg);
			setTimeout(function() { $s.move = "p2-place"; $s.$apply()}, 20);
		} else if($s.move == "p2-twist") {
			$s.twistSection(seg);
			 setTimeout(function() { $s.move = "p1-place"; $s.$apply()}, 20);
		}

		$s.checkWin();

	}

	$s.player1Win = function player1Win() {
		$s.winText = "Player 1 Wins";
		$("#game-score").css("display", "inherit");
	}

	$s.player2Win = function player1Win() {
		$s.winText = "Player 2 Wins";
		$("#game-score").css("display", "inherit");
	}

	$s.playerDraw = function playerDraw() {
		$s.winText = "Draw";
		$("#game-score").css("display", "inherit");
	}


	$s.playAgain = function playAgain() {
		$("#game-score").css("display", "none");
		$(".square").removeClass("p1-square p2-square");
		$s.move = "p1-place";
	}


	$s.checkWin = function checkWin() {

		var p1Win = false;
		var p2Win = false;

		// first row
		if($('#s11').hasClass("p1-square") && $('#s12').hasClass("p1-square") && $('#s21').hasClass("p1-square") && $('#s22').hasClass("p1-square")) {
			p1Win = true;
			console.log("first row");
		}		

		if($('#s11').hasClass("p2-square") && $('#s12').hasClass("p2-square") && $('#s21').hasClass("p2-square") && $('#s22').hasClass("p2-square")) {
			p2Win = true;
			console.log("first row");
		}



		// second row
		if($('#s14').hasClass("p1-square") && $('#s13').hasClass("p1-square") && $('#s24').hasClass("p1-square") && $('#s23').hasClass("p1-square")) {
			p1Win = true;
			console.log("second row");
		}		

		if($('#s14').hasClass("p2-square") && $('#s13').hasClass("p2-square") && $('#s24').hasClass("p2-square") && $('#s23').hasClass("p2-square")) {
			p2Win = true;
			console.log("second row");
		}


		// third row
		if($('#s31').hasClass("p1-square") && $('#s32').hasClass("p1-square") && $('#s41').hasClass("p1-square") && $('#s42').hasClass("p1-square")) {
			p1Win = true;
			console.log("third row");
		}		

		if($('#s31').hasClass("p2-square") && $('#s32').hasClass("p2-square") && $('#s41').hasClass("p2-square") && $('#s42').hasClass("p2-square")) {
			p2Win = true;
			console.log("third row");
		}


		// fourth row
		if($('#s34').hasClass("p1-square") && $('#s33').hasClass("p1-square") && $('#s44').hasClass("p1-square") && $('#s43').hasClass("p1-square")) {
			p1Win = true;
			console.log("fourth row");
		}		

		if($('#s34').hasClass("p2-square") && $('#s33').hasClass("p2-square") && $('#s44').hasClass("p2-square") && $('#s43').hasClass("p2-square")) {
			p2Win = true;
			console.log("fourth row");
		}


		// first column
		if($('#s11').hasClass("p1-square") && $('#s14').hasClass("p1-square") && $('#s31').hasClass("p1-square") && $('#s34').hasClass("p1-square")) {
			p1Win = true;
			console.log("first column");
		}		

		if($('#s11').hasClass("p2-square") && $('#s14').hasClass("p2-square") && $('#s31').hasClass("p2-square") && $('#s34').hasClass("p2-square")) {
			p2Win = true;
			console.log("first column");
		}


		// second column
		if($('#s12').hasClass("p1-square") && $('#s13').hasClass("p1-square") && $('#s32').hasClass("p1-square") && $('#s33').hasClass("p1-square")) {
			p1Win = true;
			console.log("second column");
		}		

		if($('#s12').hasClass("p2-square") && $('#s13').hasClass("p2-square") && $('#s32').hasClass("p2-square") && $('#s33').hasClass("p2-square")) {
			p2Win = true;
			console.log("second column");
		}


		// third column
		if($('#s21').hasClass("p1-square") && $('#s24').hasClass("p1-square") && $('#s41').hasClass("p1-square") && $('#s44').hasClass("p1-square")) {
			p1Win = true;
			console.log("third column");
		}		

		if($('#s21').hasClass("p2-square") && $('#s24').hasClass("p2-square") && $('#s41').hasClass("p2-square") && $('#s44').hasClass("p2-square")) {
			p2Win = true;
			console.log("third column");
		}

		// fourth column
		if($('#s22').hasClass("p1-square") && $('#s23').hasClass("p1-square") && $('#s42').hasClass("p1-square") && $('#s43').hasClass("p1-square")) {
			p1Win = true;
			console.log("fourth column");
		}		

		if($('#s22').hasClass("p2-square") && $('#s23').hasClass("p2-square") && $('#s42').hasClass("p2-square") && $('#s43').hasClass("p2-square")) {
			p2Win = true;
			console.log("fourth column");
		}


		// top left diagonal
		if($('#s11').hasClass("p1-square") && $('#s13').hasClass("p1-square") && $('#s41').hasClass("p1-square") && $('#s43').hasClass("p1-square")) {
			p1Win = true;
			console.log("left diagonal");
		}		

		if($('#s11').hasClass("p2-square") && $('#s13').hasClass("p2-square") && $('#s41').hasClass("p2-square") && $('#s43').hasClass("p2-square")) {
			p2Win = true;
			console.log("left diagonal");
		}

		// top right diagonal
		if($('#s22').hasClass("p1-square") && $('#s24').hasClass("p1-square") && $('#s32').hasClass("p1-square") && $('#s34').hasClass("p1-square")) {
			p1Win = true;
			console.log("right diagonal");
		}		

		if($('#s22').hasClass("p2-square") && $('#s24').hasClass("p2-square") && $('#s32').hasClass("p2-square") && $('#s34').hasClass("p2-square")) {
			p2Win = true;
			console.log("right diagonal");
		}

		if(p1Win && p2Win) { $s.playerDraw(); }
		else if (p1Win) { $s.player1Win(); }
		else if (p2Win) { $s.player2Win(); }

	}


	// ON MOUSE MOVE
	$(document).on('mousemove', function(e){
	    //console.log( e.pageX, e.pageY);
	});




	// REMOVE HOVER FOR MOBILE DEVICES
/*
	var touch = window.ontouchstart || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

	if (touch) { // remove all :hover stylesheets
	    try { // prevent exception on browsers not supporting DOM styleSheets properly
	        for (var si in document.styleSheets) {
	            var styleSheet = document.styleSheets[si];
	            if (!styleSheet.rules) continue;

	            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
	                if (!styleSheet.rules[ri].selectorText) continue;

	                if (styleSheet.rules[ri].selectorText.match(':hover')) {
	                    styleSheet.deleteRule(ri);
	                }
	            }
	        }
	    } catch (ex) {}
	}
*/


}]);


