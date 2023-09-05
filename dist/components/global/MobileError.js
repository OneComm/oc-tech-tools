"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var logo_svg_1 = __importDefault(require("../../assets/img/logo.svg"));
var react_bootstrap_1 = require("react-bootstrap");
function MobileError() {
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "d-flex justify-content-center" },
        react_1.default.createElement(react_bootstrap_1.Card, { style: { maxWidth: 350 } },
            react_1.default.createElement(react_bootstrap_1.Card.Header, null,
                react_1.default.createElement("img", { alt: "", src: logo_svg_1.default, width: "30", height: "30", className: "d-inline-block align-top" }),
                "Mobile Error"),
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement("p", null, "This application is not designed for mobile."),
                react_1.default.createElement("p", null, "Please visit from your computer.")))));
}
exports.default = MobileError;
