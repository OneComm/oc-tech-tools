"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Spinner_1 = __importDefault(require("react-bootstrap/Spinner"));
function Loading() {
    return (react_1.default.createElement("div", { className: 'page-content vertical-center' },
        react_1.default.createElement("center", null,
            react_1.default.createElement(Spinner_1.default, { animation: "border", role: "status" },
                react_1.default.createElement("span", { className: "visually-hidden" }, "Loading...")))));
}
exports.default = Loading;
