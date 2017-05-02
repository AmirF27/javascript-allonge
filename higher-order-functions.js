/*
 * A simple implementation of Array.prototype.map in order to demonstrate
 * higher-order functions. mapArray is a higher-order function because it takes
 * a function as an argument.
**/

function mapArray(arr, fn) {
    for (let idx in arr) {
        arr[idx] = fn(arr[idx]);
    }
}

var a = [1, 2, 3];

console.log(`Before map: ${a}`);

mapArray(a, function(item) {
    return item ** 2;
});

console.log(`After map: ${a}`);
