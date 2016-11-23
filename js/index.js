import input from './input';
import Snake from './snake';
import Candy from './candy';
import config from './config';

var data = {
    // position
    x: config.nodeSize,
    y: config.nodeSize,
    // size
    size: config.nodeSize
};

var snake = new Snake();
var candy = new Candy();

input(snake);
snake.add(data);

var loopId;
var gameOver = function() {
    cancelAnimationFrame(loopId);
    alert("gameOver");
    snake.x = config.nodeSize;
    snake.y = config.nodeSize;
};

var draw = function() {
    candy.draw();
    var headData = snake.head.data;
    // collision detection of snake head with wall
    if ((headData.x+snake.head.data.size) >= config.screenWidth || snake.head.data.x <= 0 ||
        (snake.head.data.y+snake.head.data.size) >= config.screenHeight || snake.head.data.y <= 0) {
        gameOver();
    } else {
        snake.remove();
        // checking for direction & add head
        if (snake.direction === 39) { // right
            snake.add({
                x: headData.x + config.nodeSize,
                y: headData.y,
                size: config.nodeSize
            });
        } else if (snake.direction === 37) { // left
            snake.add({
                x: headData.x - config.nodeSize,
                y: headData.y,
                size: config.nodeSize
            });
        } else if (snake.direction === 40) { // down
            snake.add({
                x: headData.x,
                y: headData.y + config.nodeSize,
                size: config.nodeSize
            });
        } else if (snake.direction === 38) { // up
            snake.add({
                x: headData.x,
                y: headData.y - config.nodeSize,
                size: config.nodeSize
            });
        }
        // checking if snake head eat
        if ((headData.x>(candy.x-config.nodeSize) && headData.x<(candy.x+config.nodeSize) && headData.y===candy.y) ||
            (headData.y>(candy.y-config.nodeSize) && headData.y<(candy.y+config.nodeSize) && headData.x===candy.x)) {
            console.log("eat");

            var newHead = {};
            if (snake.direction === 39) { // right
                newHead = {
                    x: candy.x + config.nodeSize,
                    y: candy.y,
                    size: config.nodeSize
                };
            } else if (snake.direction === 37) { // left
                newHead = {
                    x: candy.x - config.nodeSize,
                    y: candy.y,
                    size: config.nodeSize
                };
            } else if (snake.direction === 40) { // down
                newHead = {
                    x: candy.x,
                    y: candy.y + config.nodeSize,
                    size: config.nodeSize
                };
            } else if (snake.direction === 38) { // up
                newHead = {
                    x: candy.x ,
                    y: candy.y - config.nodeSize,
                    size: config.nodeSize
                };
            }
            // add new head
            snake.add(newHead);
            candy.remove();
            candy = new Candy();
        }
        loopId = window.requestAnimationFrame(draw);
    }
};


loopId = window.requestAnimationFrame(draw);
