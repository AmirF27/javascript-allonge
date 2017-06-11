/*
 * Composition is when we build components out of smaller components.
 *
 * In the following example we are using stacks as components of a model.
**/

// helper function to shallow copy objects
function shallowCopy(source) {
    const dest = {};

    for (let key in source) {
        dest[key] = source[key];
    }

    return dest;
}

function Stack() {
    const array = [];
    let index = -1;

    return {
        push(value) {
            array[++index] = value;
        },
        pop() {
            let value = array[index];
            if (index >= 0) {
                index--;
            }
            return value;
        },
        isEmpty() {
            return index < 0;
        }
    };
}

function Model(initialAttributes) {
    const undoStack = Stack(),
          redoStack = Stack();
    var attributes = shallowCopy(initialAttributes || {});

    const obj = {
        set(attrsToSet) {
            undoStack.push(shallowCopy(attributes));
            if (!redoStack.isEmpty()) {
                redoStack.length = 0;
            }
            for (let key in (attrsToSet || {})) {
                attributes[key] = attrsToSet[key];
            }
            return obj;
        },
        undo() {
            if (!undoStack.isEmpty()) {
                redoStack.push(shallowCopy(attributes));
                attributes = undoStack.pop();
            }
            return obj;
        },
        redo() {
            if (!redoStack.isEmpty()) {
                undoStack.push(shallowCopy(attributes));
                attributes = redoStack.pop();
            }
            return obj;
        },
        get: (key) => attributes[key],
        has: (key) => attributes.hasOwnProperty(key),
        attributes: () => shallowCopy(attributes)
    };

    return obj;
}

const model = Model();

console.log(model.set({"Doctor": "de Grasse"}).attributes());
// { Doctor: 'de Grasse' }
console.log(model.set({"Doctor": "Who"}).attributes());
// { Doctor: 'Who' }
console.log(model.undo().attributes());
// { Doctor: 'de Grasse' }
console.log(model.get("Doctor"));
// de Grasse
