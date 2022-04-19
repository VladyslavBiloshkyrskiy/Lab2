const blessed = require('blessed');

const start = function (board0){
    for (let i=0; i < (HEIGHT+2); i++ ){
        board0[i]=[];
        for (let j = 0; j < (WIDTH+2); j++){
            board0 [i][j] = 0
        }
    }
}

const create = function (){
    for (let i=1; i < (HEIGHT+1); i++ ){
        for (let j = 1; j < (WIDTH+1); j++){
            board [i][j] = Math.random();
            if (board [i][j] > 0.6){
                board [i][j] = 1;
            }
            else{
                board [i][j] = 0;
            }
        }
    }
}

const outputBoard = function(boardForOutput){
    console.clear();
    for (let i=0; i < (HEIGHT+2); i++ ){
        for (let j = 0; j < (WIDTH+2); j++){
            if (boardForOutput[i][j] === 0){
                process.stdout.write(' ');
            }
            else{
                process.stdout.write('*');
            }
        }
        console.log("");
    }
}

const checkLife = function(){
    var newBoard = [];
    start(newBoard);
    for (let i=1; i < (HEIGHT+1); i++ ){
        for (let j = 1; j < (WIDTH+1); j++){
            var count = board[i + 1][j - 1] + board[i + 1][j] + board[i + 1][j + 1] + 
                        board[i][j - 1]     + 0               + board[i][j + 1] + 
                        board[i - 1][j - 1] + board[i - 1][j] + board[i - 1][j + 1];
            if (board[i][j] === 1){
                if ((count <= 1)||(count >= 4)){
                    newBoard[i][j] = 0;
                }
                else{
                    newBoard[i][j] = 1;
                }
            }
            else{
                if (count === 3){
                    newBoard[i][j] = 1;
                }
                else{
                    newBoard[i][j] = 0;
                }
            }
        }
    }
    return newBoard;
}

var screen = blessed.screen({
    smartCSR: true
  });

const continuee = function(){
    board = checkLife();
    outputBoard(board);
}

const readlineSync = require('readline-sync');


console.clear();
const HEIGHT = 25;
const WIDTH = 80;
var board = [];
start(board);
create();
outputBoard(board);
setInterval (continuee, 200);