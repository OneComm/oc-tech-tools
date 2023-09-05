"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var msal_react_1 = require("@azure/msal-react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var logo_svg_1 = __importDefault(require("../../assets/img/logo.svg"));
var oc_logo_png_1 = __importDefault(require("../../assets/img/oc-logo.png"));
var package_json_1 = __importDefault(require("../../../package.json"));
function Navigation() {
    var _a = react_1.useState('githash'), gitHash = _a[0], setGitHash = _a[1];
    var _b = react_1.useState('builddate'), buildDate = _b[0], setBuildDate = _b[1];
    react_1.useEffect(function () {
        if (process.env.REACT_APP_SLUG_DESCRIPTION)
            setGitHash(process.env.REACT_APP_SLUG_DESCRIPTION);
        if (process.env.REACT_APP_RELEASE_CREATED_AT)
            setBuildDate(process.env.REACT_APP_RELEASE_CREATED_AT);
    }, []);
    var accounts = msal_react_1.useMsal().accounts;
    var account = accounts[0];
    var azureGroupId = process.env.REACT_APP_AZURE_TIMELOGS_GROUP_ID;
    // @ts-ignore
    var accountGroups = account.idTokenClaims.groups;
    var isTimelogsAuthorizedUser = accountGroups.some(function (group) {
        return group === azureGroupId;
    });
    return (react_1.default.createElement("div", { className: 'd-flex flex-column vertical-nav text-white', id: 'sidebar' },
        react_1.default.createElement("div", { className: "py-4 px-3 mb-4" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", style: { cursor: 'pointer', textDecoration: 'none', color: 'white' } },
                react_1.default.createElement("div", { className: "media d-flex align-items-center" },
                    react_1.default.createElement("img", { src: logo_svg_1.default, alt: "", width: "70", className: "d-inline-block align-top" }),
                    ' ',
                    react_1.default.createElement("div", { className: "media-body" },
                        react_1.default.createElement("h4", { className: "m-0" }, "Tech Tools")))),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_bootstrap_1.Navbar, { variant: 'dark' },
                    react_1.default.createElement(react_bootstrap_1.Nav, { className: "flex-column" },
                        react_1.default.createElement(react_bootstrap_1.Navbar.Text, { as: 'h6', className: 'text-uppercase text-white' }, "Applications"),
                        react_1.default.createElement(react_router_dom_1.Link, { className: 'nav-link', to: "/" }, "Dashboard"),
                        react_1.default.createElement("hr", null),
                        react_1.default.createElement(react_bootstrap_1.Navbar.Text, { as: 'h6', className: 'text-uppercase text-white' }, "Utilities"),
                        react_1.default.createElement(react_router_dom_1.Link, { className: 'nav-link', to: "/tools/domain" },
                            react_1.default.createElement(react_bootstrap_1.OverlayTrigger, { key: 'domain', placement: 'right', overlay: react_1.default.createElement(react_bootstrap_1.Tooltip, null, "Tool for looking up domain information") },
                                react_1.default.createElement("p", null, "Domain Tool"))),
                        isTimelogsAuthorizedUser ?
                            react_1.default.createElement(react_router_dom_1.Link, { className: 'nav-link', to: "/tools/timelogs" },
                                react_1.default.createElement(react_bootstrap_1.OverlayTrigger, { key: 'domain', placement: 'right', overlay: react_1.default.createElement(react_bootstrap_1.Tooltip, null, "Tool for generating time logs from Teamwork Desk") },
                                    react_1.default.createElement("p", null, "Timelog Tool")))
                            : null,
                        react_1.default.createElement(react_router_dom_1.Link, { className: 'nav-link', to: "/tools/opt43" },
                            react_1.default.createElement(react_bootstrap_1.OverlayTrigger, { key: 'opt43', placement: 'right', overlay: react_1.default.createElement(react_bootstrap_1.Tooltip, null, "Tool for generating option 43 hex strings") },
                                react_1.default.createElement("p", null, "Option 43 Helper"))),
                        react_1.default.createElement(react_router_dom_1.Link, { className: 'nav-link', to: "/tools/opt125" },
                            react_1.default.createElement(react_bootstrap_1.OverlayTrigger, { key: 'opt125', placement: 'right', overlay: react_1.default.createElement(react_bootstrap_1.Tooltip, null, "Tool for generating option 125 hex strings") },
                                react_1.default.createElement("p", null, "Option 125 Helper"))))))),
        react_1.default.createElement("div", { className: "fixed-bottom py-4 px-3 " },
            react_1.default.createElement("small", null,
                react_1.default.createElement("p", null, "Version " + package_json_1.default.version,
                    " ",
                    react_1.default.createElement("br", null),
                    gitHash,
                    " ",
                    react_1.default.createElement("br", null),
                    buildDate,
                    " ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("a", { href: 'mailto:techtoolsbugreport@fire.fundersclub.com', style: { color: 'white' } }, "Submit Bugs"))),
            react_1.default.createElement("img", { src: oc_logo_png_1.default, alt: "", width: 75, className: "py-2" }),
            ' ')));
}
exports.default = Navigation;
