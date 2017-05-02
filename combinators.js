/*
 * An example of combinators.
 *
 * compose takes two function, and returns a new function that when invoked,
 * executes the two functions it takes in order.
 *
 * compose is a combinator because it takes only functions and returns a function
 * that we can later execute.
**/


// helper function for the countdown
function count(seconds) {
    return new Promise(function(resolve, reject) {
        var interval = setInterval(function() {
            console.log(seconds);

            if (--seconds === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
}

function countdown() {
    return count(5);
}

function greet() {
    console.log("Hello, world!");
}

function compose(countdown, greet) {
    return function() {
        countdown().then(
            function fulfilled(message) {
                greet();
            },
            function rejected(reason) {
                console.err(reason);
            });
    }
}

var countAndGreet = compose(countdown, greet);
countAndGreet();
// Output:
// 5
// 4
// 3
// 2
// 1
// Hello, world!
