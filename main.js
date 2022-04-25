const start = function (board0){
    for (let i=0; i < (HEIGHT+2); i++ ){
        board0[i]=[];
        for (let j = 0; j < (WIDTH+2); j++){
            board0 [i][j] = 0
        }
    }
}

const create = function (){
    for (let i=0; i < (HEIGHT+1); i++ ){
        for (let j = 0; j < (WIDTH+1); j++){
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

const checkLife = function(game_board){
    var newBoard = [];
    start(newBoard);
    for (let i=1; i < (HEIGHT+1); i++ ){
        for (let j = 1; j < (WIDTH+1); j++){
            var count = game_board[i + 1][j - 1] + game_board[i + 1][j] + game_board[i + 1][j + 1] + 
                        game_board[i][j - 1]     + 0               + game_board[i][j + 1] + 
                        game_board[i - 1][j - 1] + game_board[i - 1][j] + game_board[i - 1][j + 1];
            if (game_board[i][j] === 1){
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

const drawbox = function(){
    return blessed.box({
        parent: screen,
        top: 1,
        left: 0,
        width: WIDTH * 2 + 4,
        height: HEIGHT + 3,
        border: {
            type: 'line'
        },
        style: {
            fg: 'black',
            bg: 'black',
            border: {
                fg: 'white',
            }
        },
    })
}

let color = "red";

const drawCells = function (cells) {
    cells.map(
        (row, y) => row.map(
            (cell, x) => {
                if (cell === 1) {
                    blessed.box({
                        parent: box,
                        top: y,
                        left: x * 2,
                        width: 2,
                        height: 1,
                        style: {
                            bg: color
                        },
                    })
                }
            }));
    screen.render();
}

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const fs = require('fs');

let screen = blessed.screen({
    smartCSR: true
});

screen.key(['escape', 'esc'], function () {
    return process.exit(0);
});

screen.key(['red', 'r'], function () {
    color="red";
});

screen.key(['yellow', 'y'], function () {
    color="yellow";
});

screen.key(['blue', 'b'], function () {
    color="blue";
});

screen.key(['green', 'g'], function () {
    color="green";
});

screen.key(['save', 's'], function () {
    let data = JSON.stringify(board);
    fs.writeFileSync('map1.json', data);
});

screen.key(['map1', '1'], function () {
    let map = fs.readFileSync('map1.json');
    board = JSON.parse(map);
    score = 1;
});


screen.key(['next', 'space'], function () {
    board = checkLife(board);
    box = drawbox();
    score++;
    scoreBox.setMarkdown(`Ітерація: ${score}`);
    drawCells(board);
});

const HEIGHT = 25;
const WIDTH = 39;
var board = [];
let score = 1;
let scoreBox = contrib.markdown();
screen.append(scoreBox);
scoreBox.setMarkdown(`Ітерація: ${score}`);
let box = drawbox();
start(board);
create();
drawCells(board);