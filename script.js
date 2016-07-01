var app = angular.module('app', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/play' })	
			.when('/play', { templateUrl: 'templates/play.html' })	
			.when('/rules', { templateUrl: 'templates/rules.html' })
			.when('/playAI', { templateUrl: 'templates/playAI.html' })
			.otherwise({ redirectTo: '/play' });
	}]);


// CONTROLLERS
app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("location", $location.$$path);
	$s.currentPage = $location.$$path;

	$s.move = "p1-place";
	$s.winText = "No Win";


	$s.changeCurrentPage = function(page) {
		console.log("change", page);

		$('.nav-menu-item').removeClass('active');

		switch(page) {
			case('play'): 
				window.location = "#/play"; 
				$('#nav-menu-play').addClass('active');
				break;
			case('playAI'): 
				window.location = "#/playAI"; 
				$('#nav-menu-playAI').addClass('active');
				break;
			case('rules'): 
				window.location = "#/rules"; 
				$('#nav-menu-rules').addClass('active');
				break;
		}
	}

	$( document ).ready(function() {

		if($location.$$path== "/play") {
			$('#nav-menu-play').addClass('active');
		}
		if($location.$$path== "/playAI") {
			$('#nav-menu-playAI').addClass('active');
		}
		if($location.$$path== "/rules") {
			$('#nav-menu-rules').addClass('active');
			console.log("matched");
		}
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

	

	$s.selectSquare = function selectSquare(seg,sqr) {
		console.log("selectSquare");
		if($s.move == "p1-place") {
			$('#s'+seg+sqr).addClass("p1-square");
			$s.move = "p1-twist";
		} else if($s.move == "p1-twist") {
			$s.twistSection(seg);
			$s.move = "p2-place";
		} else if($s.move == "p2-place") {
			$('#s'+seg+sqr).addClass("p2-square");
			$s.move = "p2-twist";
		} else if($s.move == "p2-twist") {
			$s.twistSection(seg);
			$s.move = "p1-place";
		}

		$s.checkWin();
	}


	$s.rotateSeg = function rotateSeg(seg) {
		console.log("seg",seg);
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

		if(p1Win && p2Win) {
			$scope.playerDraw();
		}
		if(p1Win) $s.player1Win();
		if(p2Win) $s.player2Win();

	}


	// ON MOUSE MOVE
	$(document).on('mousemove', function(e){
	    //console.log( e.pageX, e.pageY);
	});




}]);


