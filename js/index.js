import { Scheduler, Observable } from 'rxjs';
import Immutable from 'immutable';

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
}

/* ----- TODO: Collision Detection For Snake Head And Snake Tail ----- */

/* ----- Checking Snake Eat Candy ----- */
const eat = function(headPosition, candyPosition, candyConfig) {
  return ((headPosition.x > (candyPosition.x-candyConfig.size.width) &&
    headPosition.x < (candyPosition.x+candyConfig.size.width) &&
    headPosition.y === candyPosition.y) ||
    (headPosition.y > (candyPosition.y-candyConfig.size.height) &&
    headPosition.y < (candyPosition.y+candyConfig.size.height) &&
    headPosition.x === candyPosition.x));
}

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
    .startWith({x: 0, y: 0});

/* ----- Game State Observable ----- */

const gameState = ticker
  .withLatestFrom(snakeHeadPos)
  .scan(({candy, snake, score}, [ticker, snakeHeadPos]) => {
    // TODO: Have Side Effect

    const newHeadPos = {
      x: snake.last().x + snakeHeadPos.x,
      y: snake.last().y + snakeHeadPos.y
    };

    let newSnakeState = (snake.size > 1) ? snake.shift().push(newHeadPos) : snake.push(newHeadPos);

    if (eat(newHeadPos, candy, candyConfig)) {
      newSnakeState = newSnakeState.push({
        x: newSnakeState.last().x + snakeHeadPos.x,
        y: newSnakeState.last().y + snakeHeadPos.y
      });
      candy = randomCandyPosition();
    }
    if (snakeWallCollision(snake.last(), snakeConfig, screenConfig)) {
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
  clearNode(snakeConfig, state.snake.first());
  drawSnake(state.snake.last());
  drawCandy(state.candy);
}

/* ----- BOOSTRAP GAME ----- */
drawCandy(candyConfig.firstPosition);
drawSnake(snakeConfig.firstPosition);

const game = gameState.subscribe(update);
