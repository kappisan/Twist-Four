
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

    };

    $s.playAgain = function playAgain() {
        $("#game-score").css("display", "none");
        $(".square").removeClass("p1-square p2-square");
        $(".square div").removeClass("pulsating-square");
        $s.gameOver = false;

        $s.move = "p1-twist";
        $s.availableMoves = 2;
        $r.loadBoard(config);
    };

    $s.rotateSeg = function rotateSeg(seg) {
        console.log("seg",seg);
        if($s.gameOver === true) return;

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
    };

}]);
