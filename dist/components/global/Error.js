"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var logo_svg_1 = __importDefault(require("../../assets/img/logo.svg"));
var react_bootstrap_1 = require("react-bootstrap");
function Error(props) {
    var error = props;
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "d-flex justify-content-center" },
        react_1.default.createElement(react_bootstrap_1.Card, { style: { maxWidth: 350 } },
            react_1.default.createElement(react_bootstrap_1.Card.Header, null,
                react_1.default.createElement("img", { alt: "", src: logo_svg_1.default, width: "30", height: "30", className: "d-inline-block align-top" }),
                "404 Not Found"),
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement("p", null, "An Error has occured."),
                react_1.default.createElement("p", null, error)))));
}
exports.default = Error;
