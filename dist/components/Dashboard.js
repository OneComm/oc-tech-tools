"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
function Dashboard() {
    return (react_1.default.createElement("div", { className: "page-content p-3", id: "content" },
        react_1.default.createElement(react_bootstrap_1.Container, null,
            react_1.default.createElement(react_bootstrap_1.Row, null,
                react_1.default.createElement(react_bootstrap_1.Col, null,
                    react_1.default.createElement(react_bootstrap_1.Card, null,
                        react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                            react_1.default.createElement(react_bootstrap_1.Card.Title, { className: "border-bottom py-1" }, "Recent news"),
                            react_1.default.createElement("p", null, "This is a growing set of tools to assist with daily operations. Functionality is currently in development, but a few utilities are available for use.")),
                        react_1.default.createElement(react_bootstrap_1.Card.Footer, null,
                            react_1.default.createElement("small", null,
                                react_1.default.createElement("strong", null, "Updated:"),
                                " Oct 11, 2022")))),
                react_1.default.createElement(react_bootstrap_1.Col, null,
                    react_1.default.createElement(react_bootstrap_1.Card, null,
                        react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                            react_1.default.createElement(react_bootstrap_1.Card.Title, { className: "border-bottom py-1" }, "Found bugs?"),
                            react_1.default.createElement("p", null, "This tool is still in development. Bugs and issues may be encountered."),
                            react_1.default.createElement("p", null,
                                "Please submit any bugs or issues found ",
                                react_1.default.createElement("a", { href: 'mailto:techtoolsbugreport@fire.fundersclub.com', style: { color: 'white' } }, "via email"),
                                "."))))))));
}
exports.default = Dashboard;
