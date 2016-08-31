"use strict";

var snake = require('./snake.js');

module.exports = function() {
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(e) {
        if (e.keyCode === 39) { // right
            rightPressed = true;
        } else if (e.keyCode === 37) { // left
            leftPressed = true;
        } else if (e.keyCode === 40) { // down
            downPressed = true;
        } else if (e.keyCode === 38) { // up
            upPressed = true;
        }
        snake.direction = e.keyCode;
    }

    function keyUpHandler(e) {
        if (e.keyCode === 39) { // right
            rightPressed = false;
        } else if (e.keyCode === 37) { // left
            leftPressed = false;
        } else if (e.keyCode === 40) { // down
            downPressed = false;
        } else if (e.keyCode === 38) { // up
            upPressed = false;
        }
    }
};


