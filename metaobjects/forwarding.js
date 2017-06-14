/*
 * Forwarding is when an object forwards method calls to metaobject.
 *
 * The object doesn't hold its own state of the methods, it calls the methods
 * defined on the metaobject itself.
**/

function forward(receiver, metaobject, methods) {
    for (const method of methods) {
        receiver[method] = function(...args) {
            return metaobject[method](...args);
        };
    }

    return receiver;
}

const shop = (function() {
    const items = Symbol();

    return {
        [items]: {},
        addItem(item) {
            Object.assign(this[items], item);
        },
        total() {
            const keys = Object.keys(this[items]);
            var total = 0;
            for (let key of keys) {
                total += this[items][key];
            }
            return total;
        }
    };
})();

const stock = forward({}, shop, ["addItem", "total"]);

stock.addItem({ tomatoes: 10 });
stock.addItem({ milk: 5 });

console.log(stock.total());
// 15

// when we overwrite the method on the metaobject, the object that forwards
// its method calls to it is affected as well
shop.total = () => "Stock is empty";
console.log(stock.total());
// stock is empty
