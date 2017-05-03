/*
 * A simple example illustrating function decorators.
 *
 * onlyOnce is a function decorator. It takes a function and returns a modified
 * version of it.
**/

function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function() {
    console.log(`Hello, ${this.name}!`);
}

var people = [
    new Person("David"),
    new Person("Sarah"),
    new Person("James")
];

// decorator that restricts a function to execute only once
function onlyOnce(fn) {
    var executed = false;

    return function(...args) {
        if (!executed) {
            return (executed = true, fn.apply(this, args));
        }
        else {
            throw new Error(`${fn.name} is allowed to execute only once`);
        }
    }
}

// function sayHello(name) {
//     console.log(`Hello, ${name}!`);
// }

console.log("Before decorator:");
for (let person of people) {
    person.sayHello();
}
// Output:
// Before decorator:
// Hello, David!
// Hello, Sarah!
// Hello, James!

// modify to disallow multiple executions
Person.prototype.sayHello = onlyOnce(Person.prototype.sayHello);

console.log("\nAfter decorator:");
for (let person of people) {
    try {
        person.sayHello();
    } catch (e) {
        console.log(`Sorry, ${person.name}, I've already said hello.`);
    }
}
// Output:
// After decorator:
// Hello, David!
// Sorry, Sarah, I've already said hello.
// Sorry, James, I've already said hello.
