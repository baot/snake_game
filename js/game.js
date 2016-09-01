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
canvas.width = screen.w;
canvas.height = screen.h;

var ctx = canvas.getContext("2d");

var candy = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    radius: 20
};

var drawSnakeNode = function(node) {
    ctx.beginPath();
    ctx.rect(node.data.x, node.data.y, node.data.width, node.data.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

var createCandy = function() {
    ctx.beginPath();
    ctx.arc(candy.x, candy.y, candy.radius, 0, Math.PI*2, false);
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
    drawSnakeNode(snake._head);
    createCandy();
    // collision detection of snake with wall
    if ((snake._head.data.x+snake._head.data.width) >= canvas.width || snake._head.data.x <= 0 || (snake._head.data.y+snake._head.data.height) >= canvas.height || snake.y <= 0) {
        gameOver();
    } else {
        // checking if snake eat 
        //if (((snake.x+snake.width)>=(candy.x-candy.radius) && (snake.x+snake.width)<=(candy.x+candy.radius)

        // checking for direction
        if (snake.direction === 39) { // right
            snake._head.data.x += snake.dx;
        } else if (snake.direction === 37) { // left
            snake._head.data.x -= snake.dx;
        } else if (snake.direction === 40) { // down
            snake._head.data.y += snake.dy;
        } else if (snake.direction  === 38) { // up
            snake._head.data.y -= snake.dy;
        }
        loopId = window.requestAnimationFrame(draw);
    }
};


loopId = window.requestAnimationFrame(draw);
