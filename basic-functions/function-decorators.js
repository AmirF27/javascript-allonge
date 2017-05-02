/*
 * A simple example illustrating function decorators.
 *
 * onlyOnce is a function decorator. It takes a function and returns a modified
 * version of it.
**/

var people = ["David", "Sarah", "James"];

// decorator that restricts a function to execute only once
function onlyOnce(fn) {
    var executed = false;

    return function(name) {
        if (!executed) {
            fn(name);
            executed = true;
        }
        else {
            throw new Error(`${fn.name} is allowed to execute only once`);
        }
    }
}

function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

console.log("Before decorator:");
for (let person of people) {
    sayHello(person);
}
// Output:
// Before decorator:
// Hello, David!
// Hello, Sarah!
// Hello, James!

// modify to disallow multiple executions
sayHello = onlyOnce(sayHello);

console.log("\nAfter decorator:");
for (let person of people) {
    try {
        sayHello(person);
    } catch (e) {
        console.log(`Sorry, ${person}, I've already said hello.`);
    }
}
// Output:
// After decorator:
// Hello, David!
// Sorry, Sarah, I've already said hello.
// Sorry, James, I've already said hello.
