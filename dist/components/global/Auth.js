"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var logo_svg_1 = __importDefault(require("../../assets/img/logo.svg"));
var msal_react_1 = require("@azure/msal-react");
var msal_1 = require("../../contexts/msal");
var react_bootstrap_1 = require("react-bootstrap");
function Auth() {
    var instance = msal_react_1.useMsal().instance;
    var handleLogin = function (loginType) {
        if (loginType === "popup") {
            instance.loginPopup(msal_1.loginRequest);
        }
        else if (loginType === "redirect") {
            instance.loginRedirect(msal_1.loginRequest);
        }
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "d-flex justify-content-center" },
        react_1.default.createElement(react_bootstrap_1.Card, { style: { maxWidth: 350 } },
            react_1.default.createElement(react_bootstrap_1.Card.Header, null,
                react_1.default.createElement("img", { alt: "", src: logo_svg_1.default, width: "30", height: "30", className: "d-inline-block align-top" }),
                "OC Tech Tools"),
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement("p", null, "Please login using your Microsoft Credentials."),
                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return handleLogin("redirect"); }, key: "loginRedirect" }, "Log in")))));
}
exports.default = Auth;
