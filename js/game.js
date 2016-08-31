"use strict";

var input = require('./input.js');
var snake = require('./snake.js');

input();

/*
 *  Get the size of window
 */
var screen = {};

screen.w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
screen.h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

/*
 *  Start our canvas drawing
 */
var canvas = document.getElementById("game");
// Change canvas size to fit window size
//canvas.setAttribute("width", screen.w);
//canvas.setAttribute("height", screen.h);
canvas.width = screen.w;
canvas.height = screen.h;

var ctx = canvas.getContext("2d");

var candy = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height)
};

var createSnake = function() {
    ctx.beginPath();
    ctx.rect(snake.x, snake.y, snake.width, snake.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

var createCandy = function() {
    ctx.beginPath();
    ctx.arc(candy.x, candy.y, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
};

var gameOver = function() {
    cancelAnimationFrame(loopId);
    alert("gameOver");
    snake.x = 1;
    snake.y = 1;
};

var loopId;

var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createSnake();
    createCandy();
    // collision detection of snake with wall
    if ((snake.x+snake.width) >= canvas.width || snake.x <= 0 || (snake.y+snake.height) >= canvas.height || snake.y <= 0) {
        gameOver();
    } else {
        // checking for direction
        if (snake.direction === 39) { // right
            snake.x += snake.dx;
        } else if (snake.direction === 37) { // left
            snake.x -= snake.dx;
        } else if (snake.direction === 40) { // down
            snake.y += snake.dy;
        } else if (snake.direction  === 38) { // up
            snake.y -= snake.dy;
        }
        loopId = window.requestAnimationFrame(draw);
    }
};


loopId = window.requestAnimationFrame(draw);
