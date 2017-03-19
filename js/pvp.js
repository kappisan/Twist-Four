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

    // checks if three out of these four squares is occupied by the player and the remaining is free
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

        // check if first segment returns win
        if (findFirstTwistWinner('p2')) { console.log("rotating segment 1 will yield victory"); return 1; }

        // check if second segment returns win
        if (findSecondTwistWinner('p2')) { console.log("rotating segment 2 will yield victory"); return 2; }

        // check if third segment returns win
        if (findThirdTwistWinner('p2')) { console.log("rotating segment 3 will yield victory"); return 3; }

        // check if fourth segment returns win
        if (findFourthTwistWinner('p2')) { console.log("rotating segment 4 will yield victory"); return 4; }

        // otherwise pick random
        return Math.floor(Math.random() * 4) + 1;
    }

    $s.findWinningSquare = function() {

        console.log("$s.findWinningSquare");

        var compMove = findWinner('p2', true); // winning move
        if (!compMove) { compMove = findWinner('p1', false); } // block opponent win

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

    function getWinnerFromRow(row, player, opponent) {
        if(findWinningLine(row, player, opponent) !== -1) {

            console.log("row", row, findWinningLine(row, player, opponent));
            var winningIndex = findWinningLine(row, player, opponent);

            return row[winningIndex];
        }
        return false;
    }

    // find a winning move on the current board
    function findWinner(player, isSelf) {

        // assign opponent
        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // first row
        var firstRow = ['#s11','#s12','#s21','#s22'];
        if (getWinnerFromRow(firstRow, player, opponent)) { return getWinnerFromRow(firstRow, player, opponent); }

        // second row
        var secondRow = ['#s14','#s13','#s24','#s23'];
        if (getWinnerFromRow(secondRow, player, opponent)) { return getWinnerFromRow(secondRow, player, opponent); }

        // third row
        var thirdRow = ['#s31','#s32','#s41','#s42'];
        if (getWinnerFromRow(thirdRow, player, opponent)) { return getWinnerFromRow(thirdRow, player, opponent); }

        // fourth row
        var fourthRow = ['#s34','#s33','#s44','#s43'];
        if (getWinnerFromRow(fourthRow, player, opponent)) { return getWinnerFromRow(fourthRow, player, opponent); }

        // first column
        var firstColumn = ['#s11','#s14','#s31','#s34'];
        if (getWinnerFromRow(firstColumn, player, opponent)) { return getWinnerFromRow(firstColumn, player, opponent); }

        // second column
        var secondColumn = ['#s12','#s13','#s32','#s33'];
        if (getWinnerFromRow(secondColumn, player, opponent)) { return getWinnerFromRow(secondColumn, player, opponent); }

        // third column
        var thirdColumn = ['#s21','#s24','#s41','#s44'];
        if (getWinnerFromRow(thirdColumn, player, opponent)) { return getWinnerFromRow(thirdColumn, player, opponent); }

        // fourth column
        var fourthColumn = ['#s22','#s23','#s42','#s43'];
        if (getWinnerFromRow(fourthColumn, player, opponent)) { return getWinnerFromRow(fourthColumn, player, opponent); }

        // top left diagonal
        var tlDiagonal = ['#s11','#s13','#s41','#s43'];
        if (getWinnerFromRow(tlDiagonal, player, opponent)) { return getWinnerFromRow(tlDiagonal, player, opponent); }

        // top right diagonal
        var trDiagonal = ['#s22','#s24','#s32','#s34'];
        if (getWinnerFromRow(trDiagonal, player, opponent)) { return getWinnerFromRow(trDiagonal, player, opponent); }

        return false;
    }

    function checkRowWin(array, player) {
        if($(array[0]).hasClass(player + "-square") 
            && $(array[1]).hasClass(player + "-square") 
            && $(array[2]).hasClass(player + "-square") 
            && $(array[3]).hasClass(player + "-square")) {
                return true;
        }
        return false;
    }

    // find a winning move on a 1st segment twisted board
    function findFirstTwistWinner(player) {

        // assign opponent
        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // first row
        var firstRow = ['#s14','#s11','#s21','#s22'];
        if (checkRowWin(firstRow, player)) { return true; }

        // second row
        var secondRow = ['#s13','#s12','#s24','#s23'];
        if (checkRowWin(secondRow, player)) { return true; }

        // first column
        var firstColumn = ['#s14','#s13','#s31','#s34'];
        if (checkRowWin(firstColumn, player)) { return true; }

        // second column
        var secondColumn = ['#s11','#s12','#s32','#s33'];
        if (checkRowWin(secondColumn, player)) { return true; }

        // top left diagonal
        var tlDiagonal = ['#s14','#s12','#s41','#s43'];
        if (checkRowWin(tlDiagonal, player)) { return true; }

        return false;
    }

    // find a winning move on a 2st segment twisted board
    function findSecondTwistWinner(player) {

        // assign opponent
        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // first row
        var firstRow = ['#s11','#s12','#s24','#s21'];
        if (checkRowWin(firstRow, player)) { return true; }

        // second row
        var secondRow = ['#s14','#s13','#s23','#s22'];
        if (checkRowWin(secondRow, player)) { return true; }

        // third column
        var thirdColumn = ['#s24','#s23','#s41','#s44'];
        if (checkRowWin(thirdColumn, player)) { return true; }

        // fourth column
        var fourthColumn = ['#s21','#s22','#s42','#s43'];
        if (checkRowWin(fourthColumn, player)) { return true; }

        // top right diagonal
        var trDiagonal = ['#s21','#s23','#s32','#s34'];
        if (checkRowWin(trDiagonal, player)) { return true; }

        return false;
    }

    // find a winning move on a 3rd segment twisted board
    function findThirdTwistWinner(player) {

        // assign opponent
        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // third row
        var thirdRow = ['#s34','#s31','#s41','#s42'];
        if (checkRowWin(thirdRow, player)) { return true; }

        // fourth row
        var fourthRow = ['#s33','#s32','#s44','#s43'];
        if (checkRowWin(fourthRow, player)) { return true; }

        // first column
        var firstColumn = ['#s11','#s14','#s34','#s33'];
        if (checkRowWin(firstColumn, player)) { return true; }

        // second column
        var secondColumn = ['#s12','#s13','#s31','#s32'];
        if (checkRowWin(secondColumn, player)) { return true; }

        // top right diagonal
        var trDiagonal = ['#s22','#s24','#s31','#s33'];
        if (checkRowWin(trDiagonal, player)) { return true; }

        return false;
    }


    // find a winning move on a 4th segment twisted board
    function findFourthTwistWinner(player) {

        // assign opponent
        var opponent = 'p1';
        if (player == 'p1') {
            opponent = 'p2';
        }

        // third row
        var thirdRow = ['#s31','#s32','#s44','#s41'];
        if (checkRowWin(thirdRow, player)) { return true; }

        // fourth row
        var fourthRow = ['#s34','#s33','#s43','#s42'];
        if (checkRowWin(fourthRow, player)) { return true; }

        // third column
        var thirdColumn = ['#s21','#s24','#s44','#s43'];
        if (checkRowWin(thirdColumn, player)) { return true; }

        // fourth column
        var fourthColumn = ['#s22','#s23','#s41','#s42'];
        if (checkRowWin(fourthColumn, player)) { return true; }

        // top left diagonal
        var trDiagonal = ['#s11','#s13','#s44','#s42'];
        if (checkRowWin(trDiagonal, player)) { return true; }

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
                var winningSeg = $s.getWinningSeg();

                $s.animateRotateSeg(winningSeg);
            } else {

                console.log("random twist move");
                // rotate random segment
                var _randSeg = Math.floor(Math.random() * 4) + 1;

                $s.animateRotateSeg(_randSeg);
            }

            // if all squares taken
            var allSquares = true;
            for(var i = 1; i <= 4; i++) {
                for(var j = 1; j <= 4; j++) {
                    if(!$('#s'+i+''+j).hasClass("p1-square") && !$('#s'+i+''+j).hasClass("p2-square")) allSquares = false;
                }
            }
            if (allSquares) {
                console.log("all squares taken, draw");
                $s.winText = "Draw";
                $s.playerDraw(); 
                $s.gameOver = true;
                return;
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