"use strict"

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
canvas.setAttribute("width", screen.w);
canvas.setAttribute("height", screen.h);

var ctx = canvas.getContext("2d");

var snake = {
    // position
    x: 0,
    y: 0,
    // acceleration
    dx: 0,
    dy: 1
};

var createSnake = function() {
    ctx.beginPath();
    ctx.rect(snake.x, snake.y, 50, 50);
    ctx.fillStyle = "black" 
    ctx.fill();
    ctx.closePath();
    snake.x += snake.dx;
    snake.y += snake.dy;
    window.requestAnimationFrame(createSnake);
};

var createApple = function() {
    ctx.beginPath();
    ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
};

var draw = function() {
    window.requestAnimationFrame(createSnake);
    createApple();
};

draw();
