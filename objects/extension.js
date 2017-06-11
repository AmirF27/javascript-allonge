/*
 * An example that shows how we can extend an existing component with additional
 * functionality.
 *
 * Here, we are extending a queue to function as a deque*.
 *
 * * deque: double-ended queue, or dequeue, often abbreviated to "deque."
**/

const Queue = (function() {
    function Queue() {
        this.array = [];
        this.head = 0;
        this.tail = -1;
    }

    Queue.prototype.pushTail = function(value) {
        this.array[++this.tail] = value;
    }

    Queue.prototype.pullHead = function() {
        if (this.tail >= this.head) {
            const value = this.array[this.head];
            this.array[this.head++] = undefined;
            return value;
        }
    }

    Queue.prototype.isEmpty = () => this.tail < this.head;

    return Queue;
})();

const Deque = (function() {
    function Deque() {
        Queue.call(this);
    }

    Deque.prototype = Object.create(Queue.prototype);

    const INCREMENT = 4;

    Deque.prototype.size = () => this.tail - this.head + 1;

    Deque.prototype.pullTail = function() {
        if (!this.isEmpty()) {
            const value = this.array[this.tail];
            this.array[this.tail--] = undefined;
            return value;
        }
    }

    Deque.prototype.pushHead = function(value) {
        if (this.head == 0) {
            for (let i = this.tail; i <= this.head; i++) {
                this.array[i + INCREMENT] = this.array[i];
            }
            this.tail += INCREMENT;
            this.head += INCREMENT;
        }
        return this.array[--this.head] = value;
    }

    return Deque;
})();

const deque = new Deque();

for (let i = 1; i <= 3; i++) {
    deque.pushHead(i);
}
console.log(deque.pullTail());
// 1

for (let i = 4; i <= 6; i++) {
    deque.pushTail(i);
}
console.log(deque.pullHead());
// 3
