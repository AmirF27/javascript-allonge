function Y(f) {
    function something(x) {
        return f(function(v) {
            return x(x)(v);
        });
    };

    return something(something);
}

const factorial = Y(function(fac) {
    return function(n) {
        if (n == 0) {
            return 1;
        }
        else {
            return n * fac(n - 1);
        }
    }
});

console.log(factorial(5));
// Output:
// 120
