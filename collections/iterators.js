/*
 * This is an example of a stack that's iterable, and we perform different
 * operations on it, described below.
**/

const Stack = (function() {
    function Stack() {
        this.array = [];
        this.index = -1;
    }

    Stack.prototype.push = function(value) {
        return this.array[++this.index] = value;
    }

    Stack.prototype.pop = function() {
        const value = this.array[this.index];

        this.array[this.index] = undefined;

        if (this.index >= 0) {
            --this.index;
        }

        return value;
    }

    Stack.prototype.isEmpty = function() {
        return this.index < 0;
    }

    // the stack iterator iterates over the elements in the stack
    Stack.prototype[Symbol.iterator] = function() {
        var iterationIndex = this.index;

        return {
            next: () => {
                if (iterationIndex > this.index) {
                    iterationIndex = this.index;
                }
                if (iterationIndex < 0) {
                    return { done: true };
                }
                else {
                    return { done: false, value: this.array[iterationIndex--] };
                }
            }
        };
    }

    // this static method creates a stack out of an iterable
    Stack.from = function(iterable) {
        const stack = new this();

        for (let element of iterable) {
            stack.push(element);
        }

        return stack;
    }

    return Stack;
})();

// this function returns the sum of an iterable collection's elements
function collectionSum(collection) {
    const it = collection[Symbol.iterator]();
    let sum = 0,
        current;

    while (current = it.next(), !current.done) {
        sum += current.value;
    }

    return sum;
}

// same as above, but this time using a for...of loop
function iterableSum(iterable) {
    let sum = 0;

    for (let num of iterable) {
        sum += num;
    }

    return sum;
}

const stack = new Stack(),
      stack2 = new Stack();

for (let i = 1; i <= 3; i++) {
    stack.push(i);
    stack2.push(i * 2);
}

console.log(collectionSum(stack));
// 6
console.log(iterableSum(stack2));
// 12

// we can also use the spread operator with iterables
console.log(...stack, ...stack2);
// 3 2 1 6 4 2

const stack3 = Stack.from([1, 4, 9]);
console.log(...stack3);
// 9 4 1
