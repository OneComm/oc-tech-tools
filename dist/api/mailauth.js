"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var authenticate = require('mailauth');
function AuthenticateMail(file) {
    var message = fs_1.default.createReadStream(file);
    var res = authenticate(message);
    console.log(res);
}
exports.default = AuthenticateMail;
