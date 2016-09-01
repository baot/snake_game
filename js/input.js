"use strict";

module.exports = function(snake) {
    var keyDownHandler = function(e) {
        if (!(e.keyCode === 39 && snake.direction === 37) && !(e.keyCode === 37 && snake.direction === 39) &&
            !(e.keyCode === 40 && snake.direction === 38) && !(e.keyCode === 38 && snake.direction === 40)) {
            snake.direction = e.keyCode;
        }
    };

    document.addEventListener("keydown", keyDownHandler);
};


