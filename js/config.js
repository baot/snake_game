const screen = {};

/* ----- Get size of browser ----- */
screen.w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
screen.h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

const grid = {};

/* ----- Calculate Grid System ----- */
if (screen.w > screen.h) {
    grid.height = 64;
    grid.width = Math.floor(screen.w/(screen.h/grid.height));
} else {
    // TODO?
}

/* ----- Calculate Node Size For Candy Size & Snake Node Size ----- */
const nodeSize = screen.h/grid.height;

/* ----- Screen Config ----- */
export const screenConfig = {
    width : screen.w,
    height: screen.h
};

/* ----- Candy Config ----- */
export const candyConfig = {
    size: {
        width: nodeSize,
        height: nodeSize
    },
    color: 'red',
    firstPosition: {
        x: 10,
        y: 10
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
        x: 50,
        y: 50
    },
};
