/**
 * currying作用:
 *     提高适用性
 *     延迟执行: 不断的柯里化，累积传入的参数，最后执行
 */

function add() {
    let sum = 0, i, len;
    for (i = 0, len = arguments.length; i < len; i++) {
        sum += arguments[i];
    }
    return sum;
}

let currying = function (fn) {
    var _args = [];

    /**
     * core: all params in _args
     */
    return function cb() {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }

        Array.prototype.push.apply(_args, arguments);
        return cb;
    };
};

var curryingAdd = currying(add);

console.log(curryingAdd(1)(2)(3)(4)());