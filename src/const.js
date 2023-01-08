/**
 * 
 * @param {string} name 
 * @param {any} value 
 */
function _const(name, value) {
    var g = typeof window === "object" ? window : global;
    Object.defineProperty(g, name, {
        configurable: false,
        enumerable: false,
        set: function() {
            throw new Error(`Can't modify ${name}`);
        },
        get: function() {
            return value;
        }
    });
}

_const("foo", 4);
// foo = 5;
console.log(foo);