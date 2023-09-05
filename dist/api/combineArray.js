"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombineArray = void 0;
function CombineArray(obj) {
    var joinedArray = [];
    for (var i = 0; i < obj.data.length; i++) {
        var element = obj.data[i];
        joinedArray = __spreadArrays(joinedArray, element);
    }
    return joinedArray;
}
exports.CombineArray = CombineArray;
