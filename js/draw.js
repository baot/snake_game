import ctx from './canvasContext';
import { gridConfig, candyConfig, snakeConfig } from './config';

export const drawCandy = function(position) {
  ctx.beginPath();
  ctx.rect(position.x+1, position.y+1, candyConfig.size.width-2, candyConfig.size.height-2);
  ctx.fillStyle = candyConfig.color;
  ctx.fill();
  ctx.closePath();
};

export const drawSnake = function(position) {
  ctx.beginPath();
  ctx.rect(position.x+1, position.y+1, snakeConfig.size.width-2, snakeConfig.size.height-2);
  ctx.fillStyle = snakeConfig.color;
  ctx.fill();
  ctx.closePath();
};

export const clearNode = function(config, position) {
  ctx.clearRect(position.x, position.y, config.size.width, config.size.height);
};
