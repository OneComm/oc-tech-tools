"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var msal_react_1 = require("@azure/msal-react");
var react_bootstrap_1 = require("react-bootstrap");
function Header() {
    var _a = msal_react_1.useMsal(), instance = _a.instance, accounts = _a.accounts;
    var account = accounts[0];
    function Logout() {
        instance.logoutRedirect();
    }
    return (react_1.default.createElement("div", { className: 'page-content fixed-top border-bottom' },
        react_1.default.createElement(react_bootstrap_1.Navbar, { bg: "light px-4" },
            react_1.default.createElement(react_bootstrap_1.Nav, { className: 'me-auto' }),
            react_1.default.createElement(react_bootstrap_1.Nav, null,
                react_1.default.createElement(react_bootstrap_1.NavDropdown, { title: account.name, id: "account-dropdown" },
                    react_1.default.createElement(react_bootstrap_1.NavDropdown.Item, { onClick: Logout, eventKey: "4.4" }, "Logout"))))));
}
exports.default = Header;
