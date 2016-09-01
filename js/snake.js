"use strict";

var config = require('./config.js');
var ctx = require('./canvasContext.js');

function Snake() {
    // moving direction of the head
    this.direction = 39;
    this.length = 0;
    this.head = null;
    this.tail = null;
}

Snake.prototype.add = function(data) {
    var node = {
        data: data,
        next: null,
        prev: null
    };

    if (this.length === 0) {
        this.head = node;
        this.tail = node;
    } else {
        // attach new node to the head
        this.head.next = node;
        node.prev = this.head;
        this.head = node;
    }

    this.length++;

    //draw head
    ctx.beginPath();
    ctx.rect(this.head.data.x + 2, this.head.data.y + 2, this.head.data.size - 4, this.head.data.size - 4);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

Snake.prototype.remove = function() {
    // clear the tail 
    ctx.clearRect(this.tail.data.x, this.tail.data.y, this.tail.data.size , this.tail.data.size);
    if (this.length === 1) {
        this.tail = null;
        this.head = null;
        this.length = 0;
    } else {
        var current = this.tail;
        this.tail = current.next;
        this.tail.prev = null;
        current = null;
        this.length--;
    }
};

module.exports = Snake;
