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

/* ----- Snake Head Position Observable . TODO: opposite keydown ----- */
const snakeHeadPos = ticker.withLatestFrom(input)
    .map(([ticker, direction]) => {
        let x = 0;
        let y = 0;
        if (direction === 37) {
            x = x - snakeConfig.size.width;
        } else if (direction === 38) {
            y = y - snakeConfig.size.height;
        } else if (direction === 39) {
            x = x + snakeConfig.size.width;
        } else if (direction === 40) {
            y = y + snakeConfig.size.height;
        }

        return {
            x,
            y
        };
    })
    .startWith({x: snakeConfig.size.width, y: 0});

/* ----- Game State Observable ----- */

const gameState = ticker
  .withLatestFrom(snakeHeadPos)
  .scan(({candy, snake, score}, [ticker, snakeHeadPos]) => {
    // TODO: Have Side Effect

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

const update = function(state) {
  clearNode(snakeConfig, last(state.snake));
  drawSnake(head(state.snake));
  drawCandy(state.candy);
}

gameState.subscribe(x => {
  clearNode(snakeConfig, last(x.snake));
  drawSnake(head(x.snake));
  drawCandy(x.candy);
});

/* ----- BOOSTRAP GAME ----- */
drawCandy(candyConfig.firstPosition);
drawSnake(snakeConfig.firstPosition);

//const game = gameState.subscribe(update);
