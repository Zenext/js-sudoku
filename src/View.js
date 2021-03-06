import R from 'ramda';
import Sudoku from './Sudoku';
import Generator from './generator/Generator';

var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0xffffff});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

const CELL_SIZE = 50;
const ROWS = 9;
const COLS = 9;
const sudoku = new Sudoku([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const board = sudoku.generate();
const boardGraphics = drawBoard();
stage.addChild(boardGraphics);

fillBoard(R.splitEvery(9, board));
sudoku.solve(board);

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

function drawBoard(board) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000);

    for (let i = 0; i < ROWS + 1; i++) {
        if (i % 3 === 0) {
            graphics.lineStyle(4, 0x00698C);
        } else {
            graphics.lineStyle(2, 0x000000);
        }
        graphics.moveTo(0, i * CELL_SIZE);
        graphics.lineTo(CELL_SIZE * COLS, i * CELL_SIZE);

        for (let j = 0; j < COLS + 1; j++) {
            if (j % 3 === 0) {
                graphics.lineStyle(4, 0x00698C);
            } else {
                graphics.lineStyle(2, 0x000000);
            }
            graphics.moveTo(j * CELL_SIZE, 0);
            graphics.lineTo(j * CELL_SIZE, ROWS * CELL_SIZE);
        }

        graphics.endFill();
    }

    return graphics;
};

function fillBoard(board) {
    var text, value, style;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            value = board[i][j].value;
            style = {fill: 0x000000};
            if (value !== 0)
                style.fill = 0xff0000;
            if (board[i][j].nakedSingles) {
                style = {fill: board[i][j].nakedSingles};
            }
            if (board[i][j].hiddenSingles) {
                style = {fill: board[i][j].hiddenSingles};
            }
            text = new PIXI.Text(value + '', style);
            text.x = i * CELL_SIZE + 15;
            text.y = j * CELL_SIZE + 12;
            stage.addChild(text);
        }
    }
};
