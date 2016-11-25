import Immutable from 'immutable';

/* ----- Get size of browser ----- */
const screenInfo = {
  w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};

/* ----- Calculate Grid System ----- */
const grid = {};

if (screenInfo.w > screenInfo.h) {
    grid.heightNums = 64;
    grid.widthNums = Math.floor(screenInfo.w/(screenInfo.h/grid.heightNums));
} else {
    // TODO?
}

/* ----- Calculate Node Size For Candy Size & Snake Node Size ----- */
const nodeSize = screenInfo.h/grid.heightNums;

/* ----- Screen Config ----- */
export const screenConfig = {
    width : screenInfo.w,
    height: screenInfo.h
};

export const gridConfig = {
    width: grid.widthNums,
    height: grid.heightNums
};

/* ----- Candy Config ----- */
export const candyConfig = {
    size: {
        width: nodeSize,
        height: nodeSize
    },
    color: 'red',
    firstPosition: {
        x: nodeSize * 10,
        y: nodeSize * 10
    },
};

/* ----- Snake Config ----- */
export const snakeConfig = {
    size: {
        width: nodeSize,
        height: nodeSize
    },
    color: 'black',
    firstPosition: {
        x: nodeSize,
        y: nodeSize
    },
};

/* ----- Game Config ----- */
export const gameConfig = {
    ticker_interval: 60,
    initial_game_state: {
        candy: candyConfig.firstPosition,
        snake: Immutable.List.of(snakeConfig.firstPosition),
        score: 0
    }
};
