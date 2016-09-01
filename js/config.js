"use strict";

/*
 *  Get the size of window
 */
var screen = {};

screen.w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
screen.h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

var grid = {};

if (screen.w > screen.h) {
    grid.height = 64;
    grid.width = Math.floor(screen.w/(screen.h/grid.height));
}

var nodeSize = screen.h/grid.height;

module.exports = {
    screenWidth: screen.w,
    screenHeight: screen.h,
    grid: grid,
    nodeSize: nodeSize
};