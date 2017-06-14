/*
 * A mixin is a metaobject that we can use to mix in the behavior into an object,
 * thus we gain the ability to separate our object properties from its behavior.
 *
 * We can mix the same metaobject into as many objects as we want, and the objects
 * themselves hold the state of the methods from the mixin.
**/

const stock = {
    items: {
        tomatoes: 10,
        milk: 5
    }
};

const Shop = {
    total() {
        const keys = Object.keys(this.items);
        var total = 0;
        for (let key of keys) {
            total += this.items[key];
        }
        return total;
    }
};

// we can mix the behavior into the object using Object.assign
Object.assign(stock, Shop);

console.log(stock.total());
