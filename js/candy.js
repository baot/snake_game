"use strict";

var config = require("./config.js");
var ctx = require("./canvasContext.js");

function Candy() {
    this.x = Math.floor(Math.random() * config.grid.width) * config.nodeSize;
    this.y = Math.floor(Math.random() * config.grid.height) * config.nodeSize;
}

Candy.prototype.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x + 2, this.y + 2, config.nodeSize - 4, config.nodeSize - 4);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
};

Candy.prototype.remove = function() {
    ctx.clearRect(this.x, this.y, config.nodeSize, config.nodeSize);
}

module.exports = Candy;

