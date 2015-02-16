"use strict";

/*
*  This module can add property of object or merge two in one
*  first => Object
*  second => Object
*
*/

var extend = function (first, second) {
    for (var secondProp in second) {
        var secondVal = second[secondProp];

        if (secondVal && Object.prototype.toString.call(secondVal) === "[object Object]") {
            first[secondProp] = first[secondProp] || {};
            extend(first[secondProp], secondVal);
        }
        else {
            first[secondProp] = secondVal;
        }
    }
    return first;
}

module.exports = extend;