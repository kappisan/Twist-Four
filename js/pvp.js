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

    function findWinningLine(elements, player, opponent) {
        //console.log("find winning line", elements);
        if($(elements[0]).hasClass(player + "-square") 
            && $(elements[1]).hasClass(player + "-square") 
            && $(elements[2]).hasClass(player + "-square") 
            && !$(elements[3]).hasClass(player + "-square")
            && !$(elements[3]).hasClass(opponent + "-square")) {
                return 3;
        }
        if($(elements[0]).hasClass(player + "-square") 
            && $(elements[1]).hasClass(player + "-square") 
            && !$(elements[2]).hasClass(player + "-square") 
            && $(elements[3]).hasClass(player + "-square")
            && !$(elements[2]).hasClass(opponent + "-square")) {
                return 2;
        }
        if($(elements[0]).hasClass(player + "-square") 
            && !$(elements[1]).hasClass(player + "-square") 
            && $(elements[2]).hasClass(player + "-square") 
            && $(elements[3]).hasClass(player + "-square")
            && !$(elements[1]).hasClass(opponent + "-square")) {
                return 1;
        }
        if(!$(elements[0]).hasClass(player + "-square") 
            && $(elements[1]).hasClass(player + "-square") 
            && $(elements[2]).hasClass(player + "-square") 
            && $(elements[3]).hasClass(player + "-square")
            && !$(elements[0]).hasClass(opponent + "-square")) {
                return 0;
        }
        return -1;
    }

    $s.getWinningSeg = function() {

        console.log("$s.getWinningSeg");

        return Math.floor(Math.random() * 4) + 1;
    }

    $s.findWinningSquare = function() {

        console.log("$s.findWinningSquare");

        var compMove = findWinner('p2', true);
        if (!compMove) { compMove = findWinner('p1', false); }

        var move = {
            seg: Math.floor(Math.random() * 4) + 1,
            sqr: Math.floor(Math.random() * 4) + 1
        };

        while ($("#s" + move.seg + move.sqr).hasClass("p1-square") || $("#s" + move.seg + move.sqr).hasClass("p2-square")) {
            move.seg = Math.floor(Math.random() * 4) + 1;
            move.sqr = Math.floor(Math.random() * 4) + 1;
        }

        return compMove ? compMove : "#s" + move.seg + "" + move.sqr;
    }

    function findWinner(player, isSelf) {

        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // first row
        var firstRow = ['#s11','#s12','#s21','#s22'];
        if(findWinningLine(firstRow, player, opponent) !== -1) {
            console.log("firstRow", firstRow, findWinningLine(firstRow, player, opponent));
            var winningIndex = findWinningLine(firstRow, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return firstRow[winningIndex];
        }

        // second row
        var secondRow = ['#s14','#s13','#s24','#s23'];
        if(findWinningLine(secondRow, player, opponent) !== -1) {
            console.log("secondRow", secondRow, findWinningLine(secondRow, player, opponent));
            var winningIndex = findWinningLine(secondRow, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return secondRow[winningIndex];
        }

        // third row
        var thirdRow = ['#s31','#s32','#s41','#s42'];
        if(findWinningLine(thirdRow, player, opponent) !== -1) {
            console.log("thirdRow", thirdRow, findWinningLine(thirdRow, player, opponent));
            var winningIndex = findWinningLine(thirdRow, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return thirdRow[winningIndex];
        }

        // fourth row
        var fourthRow = ['#s34','#s33','#s44','#s43'];
        if(findWinningLine(fourthRow, player, opponent) !== -1) {
            console.log("fourthRow", fourthRow, findWinningLine(fourthRow, player, opponent));
            var winningIndex = findWinningLine(fourthRow, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return fourthRow[winningIndex];
        }

        // first column
        var firstColumn = ['#s11','#s14','#s31','#s34'];
        if(findWinningLine(firstColumn, player, opponent) !== -1) {
            console.log("firstColumn", firstColumn, findWinningLine(firstColumn, player, opponent));
            var winningIndex = findWinningLine(firstColumn, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return firstColumn[winningIndex];
        }

        // second column
        var secondColumn = ['#s12','#s13','#s32','#s33'];
        if(findWinningLine(secondColumn, player, opponent) !== -1) {
            console.log("secondColumn", secondColumn, findWinningLine(secondColumn, player, opponent));
            var winningIndex = findWinningLine(secondColumn, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return secondColumn[winningIndex];
        }

        // third column
        var thirdColumn = ['#s21','#s24','#s41','#s44'];
        if(findWinningLine(thirdColumn, player, opponent) !== -1) {
            console.log("thirdColumn", thirdColumn, findWinningLine(thirdColumn, player, opponent));
            var winningIndex = findWinningLine(thirdColumn, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return thirdColumn[winningIndex];
        }

        // fourth column
        var fourthColumn = ['#s22','#s23','#s42','#s43'];
        if(findWinningLine(fourthColumn, player, opponent) !== -1) {
            console.log("fourthColumn", fourthColumn, findWinningLine(fourthColumn, player, opponent));
            var winningIndex = findWinningLine(fourthColumn, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return fourthColumn[winningIndex];
        }

        // top left diagonal
        var tlDiagonal = ['#s11','#s13','#s41','#s43'];
        if(findWinningLine(tlDiagonal, player, opponent) !== -1) {
            console.log("tlDiagonal", tlDiagonal, findWinningLine(tlDiagonal, player, opponent));
            var winningIndex = findWinningLine(tlDiagonal, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return tlDiagonal[winningIndex];
        }

        // top right diagonal
        var trDiagonal = ['#s22','#s24','#s32','#s34'];
        if(findWinningLine(trDiagonal, player, opponent) !== -1) {
            console.log("trDiagonal", trDiagonal, findWinningLine(trDiagonal, player, opponent));
            var winningIndex = findWinningLine(trDiagonal, player, opponent);

            if (isSelf) { $s.gameOver = true; }
            return trDiagonal[winningIndex];
        }

        return false;
    }

    $s.moveAI = function() {
        if ($s.gameOver === true) {
            return;
        }

        if ($s.move === "p2-place") {
            // find empty square
            if ($s.difficulty == "2") {
                var winningSeg = $s.findWinningSquare();
                console.log("search for winning place move", winningSeg);
                // var randSeg = winningSeg.seg;
                // var randSqr = winningSeg.sqr;

                setTimeout( function() {
                    $(winningSeg).addClass("p2-square");
                    $s.winText = "Computer Wins";
                    $s.checkPlayerWin("p2");
                    $s.checkWin();
                }, 500);


                setTimeout( function() {
                    if (!$s.gameOver) {
                        $s.move = "p2-twist"; $s.$apply(); $s.moveAI();
                    }
                }, 700);

                return;
            } else {
                console.log("random place move");
                var randSeg = Math.floor(Math.random() * 4) + 1;
                var randSqr = Math.floor(Math.random() * 4) + 1;
            }


            while ($("#s" + randSeg + randSqr).hasClass("p1-square") || $("#s" + randSeg + randSqr).hasClass("p2-square")) {
                randSeg = Math.floor(Math.random() * 4) + 1;
                randSqr = Math.floor(Math.random() * 4) + 1;
            }

            setTimeout( function() {$("#s" + randSeg + randSqr).addClass("p2-square");}, 500);
            setTimeout( function() {
                if (!$s.gameOver) {
                    $s.move = "p2-twist"; 
                    $s.$apply(); 
                    $s.moveAI();
                }
            }, 600);

        } else if ($s.move == "p2-twist") {

            if ($s.difficulty == "2") {
                console.log("search for winning twist move");
                // rotate random segment
                // var _randSeg = Math.floor(Math.random() * 4) + 1;
                var winningSeg = $s.getWinningSeg();

                $s.animateRotateSeg(winningSeg);
            } else {

                console.log("random twist move");
                // rotate random segment
                var _randSeg = Math.floor(Math.random() * 4) + 1;

                $s.animateRotateSeg(_randSeg);
            }

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