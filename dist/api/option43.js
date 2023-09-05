"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateHex = void 0;
var hexWithColons_1 = require("./hexWithColons");
function GenerateHex(obj) {
    var type = obj.type;
    var ip = obj.ip;
    var aa = "";
    var bb = "";
    var vc = "";
    var hexResult = "";
    var formattedHex = "";
    if (type === "SCG") {
        aa = "06";
    }
    else {
        aa = "03";
    }
    bb = "0" + (ip.length).toString(16).toUpperCase();
    var i, hex;
    for (i = 0; i < ip.length; i++) {
        hex = ip.charCodeAt(i).toString(16);
        vc += hex;
    }
    hexResult = aa + bb + vc.toUpperCase();
    formattedHex = hexWithColons_1.HexWithColons(hexResult, 2, ":");
    var resultObj = {
        ip: obj.ip,
        hexResult: hexResult,
        formattedHex: formattedHex
    };
    return resultObj;
}
exports.GenerateHex = GenerateHex;
