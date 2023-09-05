"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var msal_react_1 = require("@azure/msal-react");
var NavigationClient_1 = require("./utils/NavigationClient");
var react_device_detect_1 = require("react-device-detect");
var Auth_1 = __importDefault(require("./components/global/Auth"));
var Header_1 = __importDefault(require("./components/global/Header"));
var Navigation_1 = __importDefault(require("./components/global/Navigation"));
var Dashboard_1 = __importDefault(require("./components/Dashboard"));
var Domain_1 = __importDefault(require("./components/tools/Domain"));
var TimeLogs_1 = __importDefault(require("./components/tools/TimeLogs"));
var Option43_1 = __importDefault(require("./components/tools/Option43"));
var Option125_1 = __importDefault(require("./components/tools/Option125"));
var NotFound_1 = __importDefault(require("./components/global/NotFound"));
var MobileError_1 = __importDefault(require("./components/global/MobileError"));
require("bootstrap/dist/css/bootstrap.css");
function App(_a) {
    var pca = _a.pca;
    var history = react_router_dom_1.useNavigate();
    // @ts-ignore
    var navigationClient = new NavigationClient_1.CustomNavigationClient(history);
    pca.setNavigationClient(navigationClient);
    if (react_device_detect_1.isMobile) {
        return (react_1.default.createElement(MobileError_1.default, null));
    }
    else {
        return (react_1.default.createElement(msal_react_1.MsalProvider, { instance: pca },
            react_1.default.createElement(msal_react_1.UnauthenticatedTemplate, null,
                react_1.default.createElement(Auth_1.default, null)),
            react_1.default.createElement(msal_react_1.AuthenticatedTemplate, null,
                react_1.default.createElement(Navigation_1.default, null),
                react_1.default.createElement(Header_1.default, null),
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Dashboard_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/domain", element: react_1.default.createElement(Domain_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/timelogs", element: react_1.default.createElement(TimeLogs_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/opt43", element: react_1.default.createElement(Option43_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/opt125", element: react_1.default.createElement(Option125_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(NotFound_1.default, null) })))));
    }
}
exports.default = App;
