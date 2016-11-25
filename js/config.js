/* Get size of browser */
const screenInfo = {
  w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};

/* ----- Screen Config ----- */
export const screenConfig = {
    width : screenInfo.w,
    height: screenInfo.h
};

/* ----- Grid Config ----- */
export const gridConfig = {
  height: 64,
  width: Math.floor(screenInfo.w/(screenInfo.h/64))
};

/* Calculate Node Size For Candy Size & Snake Node Size */
const nodeSize = screenInfo.h/gridConfig.height;

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
        snake: [snakeConfig.firstPosition],
        score: 0
    }
};
