/*
 * This example of a stack demonstrates encapsulation in JavaScript.
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

    return Stack;
})();

const stack = new Stack();

console.log(stack.isEmpty());
// true
console.log(stack.push("hello"));
// hello
console.log(stack.push("JavaScript"));
// JavaScript
console.log(stack.isEmpty());
// false
console.log(stack.pop());
// JavaScript
console.log(stack.pop());
// hello
console.log(stack.isEmpty());
// true
console.log(stack.hasOwnProperty("array") || stack.hasOwnProperty("index"));
// true



/*
 * Here's the same stack implemented with information hiding:
**/

function Stack2() {
    let array = [],
        index = -1;

    return {
        push(value) {
            return array[++index] = value;
        },
        pop() {
            const value = array[index];

            array[index] = undefined;

            if (index >= 0) {
                --index;
            }

            return value;
        },
        isEmpty() {
            return index < 0;
        }
    };
}

const stack2 = Stack2();

console.log(stack2.isEmpty());
// true
console.log(stack2.push("hello"));
// hello
console.log(stack2.push("JavaScript"));
// JavaScript
console.log(stack2.isEmpty());
// false
console.log(stack2.pop());
// JavaScript
console.log(stack2.pop());
// hello
console.log(stack2.isEmpty());
// true
console.log(stack2.hasOwnProperty("array") || stack2.hasOwnProperty("index"));
// false
