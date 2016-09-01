"use strict";

function Snake() {
    // acceleration
    this.dx = 1;
    this.dy = 1;
    // moving direction of the head
    this.direction = 39;
    this._length = 0;
    this._head = null;
    this._tail = null;

}

Snake.prototype.add = function(data) {
    var node = {
        data: data,
        next: null,
        prev: null
    };

    if (this._length === 0) {
        this._head = node;
        this._tail = node;
    } else {
        // attach new node to the head
        this._head.next = node;
        node.prev = this._head;
        this._head = node;
    }

    this._length++;
}

var head = {
    // position
    x: 1,
    y: 1,
    // size
    width: 50,
    height: 50,
};

var snake = new Snake();
snake.add(head);

module.exports = snake;
