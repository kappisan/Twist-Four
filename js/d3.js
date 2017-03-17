app.controller('d3Ctrl', ['$rootScope', '$http', '$location', function($s, $http, $location) {


    var socket = io();
    $s.player = { name: "", player: "" };
    $s.inPlay = false;

    $s.position = "";

    $s.game = {
        player1: null,
        player2: null,
        active: false,
        move: null
    };

    socket.emit('chat message', "hello, iiiii have connected");

    socket.on('status', function(g){
        $s.game = g;

        console.log("$s.game", g);
        updatePlayers();
    });

    socket.on('move made', function(square){

        console.log("move made", square);

        clickSquare(square);

    });

    $s.join = function join() {
        console.log("join", $s.player.name);
        socket.emit('join game', $s.player);
    };

    function updatePlayers() {
        if($s.game.player1) $("#player1text").html("" + $s.game.player1.name);
        else $("#player1text").html("____________");

        if($s.game.player2) $("#player2text").html("" + $s.game.player2.name);
        else $("#player2text").html("____________");

    }

    updatePlayers();



    function clickSquare(square) {

        console.log("-----square", square);

        var sqrClass = "sqr" + square.parent + square.square;
        var self = $("." + sqrClass)[0];


        console.log("square.class", $("." + sqrClass)[0]);

        if(move == "p1place") {
            square.state = "red-square";
            move = "p2place";
        } else {
            square.state = "blue-square";
            move = "p1place";
        }

        console.log("d3.select(self)", d3.select(self));

        d3.select(self).attr("class", square.state);

        document.getElementById("move").innerHTML = "" + move;

        socket.emit('player move', square);
    }




















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
            if(i === 0 || i == 1) x = 0;

            var y = segmentSize + segmentGap;
            if(i === 0 || i == 2) y = 0;

            var seg = {
                x: x,
                y: y,
                seg: i,
                angle: 0,
                centerx: x + (segmentSize / 2),
                centery: y + (segmentSize / 2),
                squares: []
            };

            for(var j = 0; j < squaresPerSeg; j++) {

                var sx = squareSize + (2 * squarePadding);
                if(j === 0 || j == 1) sx = squarePadding;

                var sy = squareSize + (2 * squarePadding);
                if(j === 0 || j == 2) sy = squarePadding;

                var sqr = {
                    x: sx,
                    y: sy,
                    parent: i,
                    square: j,
                    angle: 0,
                    state: "empty-square",
                    squares: []
                };

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
                            .attr("width", segmentSize);
                            /*
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
                            */

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
                        .attr("class", square.state + " sqr" + square.parent + square.square )
                        .attr("x", function() {
                            return square.x + segment.x;
                        })
                        .attr("y", function() {
                            return square.y + segment.y;
                        })
                        .attr("height", squareSize)
                        .attr("width", squareSize)
                        .on("click", function(d) { clickSquare(square); });
                });

            });
        }

        drawBoard();
}]);