"use strict";

var HEIGHT = 10;
var WIDTH = 10;
var SIZE = 40;
var DEAD = "white";
var ALIVE = "black";

function drawInitialBoard(table) {
  var board = [];
  var nodeBoard = [];
  for (var i = 0; i < HEIGHT; i++) {

    var tr = document.createElement("tr");
    table.appendChild(tr);

    board[i] = [];
    nodeBoard[i] = [];

    for (var j = 0; j < WIDTH; j++) {
      var state = DEAD;
      if (i == 2 && j == 0 || i == 2 && j == 1 || i == 2 && j == 2
          || i == 0 && j == 1 || i == 1 && j == 2) {
        state = ALIVE;
      }
      var td = document.createElement("td");
      td.style.width = SIZE + "px";
      td.style.height = SIZE + "px";
      td.style.background = state;

      tr.appendChild(td);

      board[i][j] = state;
      nodeBoard[i][j] = td;
    }
  }
  return {b:board, nb:nodeBoard};
}

function main() {
  var table = document.createElement("table");
  table.style.border = "1px solid #000";
  document.body.appendChild(table);
  var init = drawInitialBoard(table);
  var board = init.b;
  var nodeBoard = init.nb;
  setInterval(function() {
    board = getUpdatedBoard(board);
    drawBoard(board, nodeBoard);
  },
  100
  );
}


function getUpdatedBoard(oldBoard) {
  var newBoard = [];
  for (var i = 0; i < HEIGHT; i++) {
    newBoard[i] = [];
    for (var j = 0; j < WIDTH; j++) {
      var aliveCount = 0;
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x == 0 && y == 0) {
            continue;
          }
          var entry = oldBoard[(i + x + HEIGHT) % HEIGHT][(j + y + WIDTH) % WIDTH];
          if (entry == ALIVE) {
            aliveCount++;
          }
        }
      }
      if (oldBoard[i][j] == DEAD && aliveCount == 3) {
        newBoard[i][j] = ALIVE;
      } else if (oldBoard[i][j] == ALIVE) {
        if (aliveCount < 2 || aliveCount > 3) {
          newBoard[i][j] = DEAD;
        } else {
          newBoard[i][j] = ALIVE;//oldBoard[i][j];
        }
      } else {
        newBoard[i][j] = DEAD;//oldBoard[i][j];
      }
    }
  }
  return newBoard;
}

function drawBoard(board, nodeBoard) {
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      nodeBoard[i][j].style.background = board[i][j];
    }
  }
}

main();
