"use strict";

var config = require("./config.js");

var canvas = document.getElementById("game");
// Change canvas size to fit window size
canvas.width = config.screenWidth;
canvas.height = config.screenHeight;

var ctx = canvas.getContext("2d");

module.exports = ctx;