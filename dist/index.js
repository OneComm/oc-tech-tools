"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msalInstance = void 0;
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var react_router_dom_1 = require("react-router-dom");
require("./index.css");
var App_1 = __importDefault(require("./App"));
var msal_browser_1 = require("@azure/msal-browser");
var msal_1 = require("./contexts/msal");
exports.msalInstance = new msal_browser_1.PublicClientApplication(msal_1.msalConfig);
var accounts = exports.msalInstance.getAllAccounts();
if (accounts.length > 0) {
    exports.msalInstance.setActiveAccount(accounts[0]);
}
exports.msalInstance.addEventCallback(function (event) {
    if (event.eventType === msal_browser_1.EventType.LOGIN_SUCCESS && event.payload) {
        var payload = event.payload;
        var account = payload.account;
        exports.msalInstance.setActiveAccount(account);
    }
});
var root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_1.default, { pca: exports.msalInstance })));
