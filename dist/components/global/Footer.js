"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Footer() {
    return (react_1.default.createElement("div", { className: "page-footer fixed-bottom bg-light d-flex p-2", style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } },
        react_1.default.createElement("div", { className: "flex-column" },
            react_1.default.createElement("p", null, "One Comm Tech Tools v0.2.a."),
            react_1.default.createElement("p", null, "\u00A9 2022 Copyright One Communications.")),
        react_1.default.createElement("div", { className: 'flex-column me-auto' },
            react_1.default.createElement("p", null,
                "Please ",
                react_1.default.createElement("a", { href: 'mailto:jgeorge@one-comm.com' }, "submit"),
                " any bugs found."))));
}
exports.default = Footer;
