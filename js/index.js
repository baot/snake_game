import { Scheduler, Observable } from 'rxjs';
import { equals, any, head, prepend, prop, compose, dropLast, flip, last } from 'ramda';

import input from './input';
import { drawCandy, drawSnake, clearNode } from './draw';
import { gameConfig, snakeConfig, candyConfig, screenConfig, gridConfig } from './config';
import ctx from './canvasContext';

/* --------- HELPER FUNCTIONS --------- */

/* ----- Collision Detection Between Snake And Wall ----- */
const snakeWallCollision = function(headPosition, snakeConfig, screenConfig) {
  return ((headPosition.x+snakeConfig.size.width) >= screenConfig.width ||
    (headPosition.x <= 0) || (headPosition.y <= 0) ||
    (headPosition.y+snakeConfig.size.height) >= screenConfig.height);
};

/* ----- Collision Detection For Snake Head And Snake Tail ----- */
const snakeHeadTailCollision = function(headPosition, snake) {
  const testPosition = {
    x: prop('x')(headPosition) + compose(prop('x'), head)(snake),
    y: prop('y')(headPosition) + compose(prop('y'), head)(snake)
  };

  return any(equals(testPosition))(snake);
};

/* ----- Checking Snake Eat Candy ----- */
const eat = function(headPosition, candyPosition, candyConfig) {
  return ((headPosition.x > (candyPosition.x-candyConfig.size.width) &&
    headPosition.x < (candyPosition.x+candyConfig.size.width) &&
    headPosition.y === candyPosition.y) ||
    (headPosition.y > (candyPosition.y-candyConfig.size.height) &&
    headPosition.y < (candyPosition.y+candyConfig.size.height) &&
    headPosition.x === candyPosition.x));
};

/* ----- TODO: Better Random ----- */
export const randomCandyPosition = function() {
  return {
    x: Math.floor(Math.random() * gridConfig.width) * candyConfig.size.width,
    y: Math.floor(Math.random() * gridConfig.height) * candyConfig.size.height
  };
};

/* --------- OBSERVABLES --------- */

/* ----- Ticker Observable That Tick For TICKER_INTERVAL ----- */
const ticker = Observable.interval(gameConfig.ticker_interval, Scheduler.requestAnimationFrame)

/* ----- Snake Head Position Observable ----- */
const snakeHeadPos = ticker.withLatestFrom(input)
  .scan(({x, y}, [ticker, direction]) => {
    let newX = 0;
    let newY = 0;
    if (x !== snakeConfig.size.width && direction === 37) {
      newX = -snakeConfig.size.width;
    } else if (y !== snakeConfig.size.height && direction === 38) {
      newY = -snakeConfig.size.height;
    } else if (x !== -snakeConfig.size.width && direction === 39) {
      newX = snakeConfig.size.width;
    } else if (y !== -snakeConfig.size.height && direction === 40) {
      newY = snakeConfig.size.height;
    } else {
      newX = x;
      newY = y;
    }

    return {
      x: newX,
      y: newY
    };
  }, {x: snakeConfig.size.width, y: 0});

/* ----- Game State Observable ----- */
const gameState = ticker
  .withLatestFrom(snakeHeadPos)
  .scan(({candy, snake, score}, [ticker, snakeHeadPos]) => {
    // TODO: Move Side Effect Out

    const newHeadPos = {
      x: compose(prop('x'), head)(snake) + prop('x')(snakeHeadPos),
      y: compose(prop('y'), head)(snake) + prop('y')(snakeHeadPos)
    };

    let newSnakeState = ((snake.length > 1) ?
      compose(prepend(newHeadPos), dropLast(1))(snake) :
      prepend(newHeadPos)(snake));

    if (eat(newHeadPos, candy, candyConfig)) {
      newSnakeState = flip(prepend)(newSnakeState)({
        x: compose(prop('x'), head)(newSnakeState) + prop('x')(snakeHeadPos),
        y: compose(prop('y'), head)(newSnakeState) + prop('y')(snakeHeadPos)
      });
      candy = randomCandyPosition();
    }

    if (snakeWallCollision(head(snake), snakeConfig, screenConfig) ||
        snakeHeadTailCollision(snakeHeadPos, snake)) {
      // indicate game over
      alert("game Over");
      return null;
    }

    return {
      candy,
      snake: newSnakeState,
      score
    };
  }, gameConfig.initial_game_state);

/* ----- Game Observer Method ----- */
const update = function(state) {
  clearNode(snakeConfig, last(state.snake));
  drawSnake(head(state.snake));
  drawCandy(state.candy);
}

/* ----- BOOSTRAP GAME ----- */
drawCandy(candyConfig.firstPosition);
drawSnake(snakeConfig.firstPosition);

const game = gameState.subscribe(update);
