"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexWithColons = void 0;
function HexWithColons(hex, num, char) {
    hex = hex.split("").reverse().join("");
    var regex = new RegExp(".{1," + num + "}", "g");
    hex = hex.match(regex).join(char);
    hex = hex.split("").reverse().join("");
    return hex;
}
exports.HexWithColons = HexWithColons;
