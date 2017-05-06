/*
 * Object.assign can be used to assign properties to an object.
**/

var stock = {};

// assigning properties to an empty object
Object.assign(stock, {
    chocolate: 5,
    milk: 2
});

console.log(stock);
// Output:
// { chocolate: 5, milk: 2 }

var stock2 = {
    cheese: 3,
    bread: 4
};

// assigning properties of an object to another object
Object.assign(stock, stock2);

console.log(stock);
// Output:
// { chocolate: 5, milk: 2, cheese: 3, bread: 4 }
