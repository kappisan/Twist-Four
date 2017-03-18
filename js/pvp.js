app.controller('pvpCtrl', ['$rootScope', function ($s) {

    console.log("pvpCtrl");

    $s.gameTitle = "Player vs Computer1";
    $s.move = "p1-place";
    $s.showPlayer2 = true;
    $s.showMovesRemaining = false;
    $s.firstMove = true;
    $s.difficulty = 1;


    $s.playAgain = function() {
        $s.firstMove = true;
        $("#game-score").css("display", "none");
        $(".square").removeClass("p1-square p2-square");
        $(".square div").removeClass("pulsating-square");
        $s.gameOver = false;

        $s.move = "p1-place";
    };

    $s.toggleDifficulty = function(diff) {
        console.log("difficulty toggled", diff);
        $s.difficulty = diff;
        $s.gameTitle = "Player vs Computer" + diff;
        $("#difficulty"+diff).prop("checked", true);
        setTimeout(function() {$s.$apply();}, 100);
    }

    $s.selectSquare = function(seg, sqr) {
        $s.firstMove = false;

        if (($s.AI && $s.move) === "p2-place" || $s.gameOver) {
            return;
        }

        if ($("#s" + seg + sqr).hasClass("p1-square") || $("#s" + seg + sqr).hasClass("p2-square")) {
            console.log("has class");
            return;
        }

        console.log("selectSquare");
        if ($s.move === "p1-place") {
            $('#s' + seg + sqr).addClass("p1-square");
            setTimeout(function() { $s.move = "p1-twist"; $s.$apply();}, 20);
        } else if ($s.move === "p2-place") {
            $('#s' + seg + sqr).addClass("p2-square");
            setTimeout(function() { $s.move = "p2-twist"; $s.$apply();}, 20);
        }

        $s.checkWin();
    };


    $s.rotateSeg = function(seg) {
        $s.firstMove = false;
        console.log("seg", seg);
        if ($s.gameOver === true) { return; }

        if ($s.move === "p1-place" || $s.move === "p2-place" || $s.gameOver) {
            return;
        }

        if (!$s.isTouch) {
            $s.rotateSegScreen(seg);
        } else {
            $s.rotateSegTouch(seg);
        }

        if ($s.move === "p1-twist") {
            $s.move = "p2-place";
            if ($s.AI) { setTimeout(function() { $s.moveAI(); }, 800); }

        } else if ($s.move == "p2-twist") {
            $s.move = "p1-place";
        }

        $s.checkWin();
    };

    $s.moveAI = function() {
        if ($s.gameOver === true) {
            return;
        }

        if ($s.move === "p2-place") {
            // find empty square
            var randSeg = Math.floor(Math.random() * 4) + 1;
            var randSqr = Math.floor(Math.random() * 4) + 1;

            while ($("#s" + randSeg + randSqr).hasClass("p1-square") || $("#s" + randSeg + randSqr).hasClass("p2-square")) {
                randSeg = Math.floor(Math.random() * 4) + 1;
                randSqr = Math.floor(Math.random() * 4) + 1;
            }

            setTimeout( function() {$("#s" + randSeg + randSqr).addClass("p2-square");}, 500);
            setTimeout( function() {$s.move = "p2-twist"; $s.$apply(); $s.moveAI();}, 600);

        } else if ($s.move == "p2-twist") {
            // rotate random segment
            var _randSeg = Math.floor(Math.random() * 4) + 1;

            $s.animateRotateSeg(_randSeg);
        }
    };

    $s.toggleAI = function() {
        $s.AI = !$s.AI;

        if ($s.AI) { 
            $s.gameTitle = "PLAYER VS COMPUTER" + $s.difficulty;
            $s.moveAI(); 
        } else {
            $s.gameTitle = "PLAYER VS PLAYER";
        }
    };

}]);