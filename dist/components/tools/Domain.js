"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Loading_1 = __importDefault(require("../global/Loading"));
var whoisxmlapi_1 = require("../../api/whoisxmlapi");
var blacklists_1 = require("../../api/blacklists");
var secsToTime_1 = __importDefault(require("../../api/secsToTime"));
var react_bootstrap_1 = require("react-bootstrap");
function Domain() {
    var _this = this;
    var _a = react_1.useState(false), isLoading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(false), isSubmitted = _b[0], setIsSubmitted = _b[1];
    var _c = react_1.useState({ domain: "" }), formData = _c[0], updateFormData = _c[1];
    var _d = react_1.useState({
        createdDate: "",
        updatedDate: "",
        expiresDate: "",
        domainName: "",
        registrant: {
            organization: "",
            state: "",
            countryCode: ""
        },
        contactEmail: ""
    }), domainData = _d[0], updateDomainData = _d[1];
    var _e = react_1.useState([]), dnsData = _e[0], updateDnsData = _e[1];
    var _f = react_1.useState({
        detections: 0,
        input_raw: "",
        blacklists: [],
        checks_remaining: "",
    }), blacklistData = _f[0], updateBlacklistData = _f[1];
    var _g = react_1.useState(false), open = _g[0], setOpen = _g[1];
    var _h = react_1.useState(false), bldLgShow = _h[0], setBldLgShow = _h[1];
    var handleChange = function (e) {
        var _a;
        updateFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value.trim(), _a)));
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var domainResult, whois, dnsResult, dns, _loop_1, i, blacklistResult, blacklist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (open)
                        setOpen(false);
                    setIsSubmitted(true);
                    setLoading(true);
                    e.preventDefault();
                    updateDomainData({
                        createdDate: "",
                        updatedDate: "",
                        expiresDate: "",
                        domainName: "",
                        registrant: {
                            organization: "",
                            state: "",
                            countryCode: ""
                        },
                        contactEmail: ""
                    });
                    updateDnsData([]);
                    updateBlacklistData({
                        detections: 0,
                        input_raw: "",
                        blacklists: [],
                        checks_remaining: "",
                    });
                    return [4 /*yield*/, whoisxmlapi_1.LookupDomain(formData.domain)];
                case 1:
                    domainResult = _a.sent();
                    whois = domainResult.data.WhoisRecord;
                    updateDomainData(whois);
                    return [4 /*yield*/, whoisxmlapi_1.LookupDNS(formData.domain)];
                case 2:
                    dnsResult = _a.sent();
                    dns = dnsResult.data.DNSData.dnsRecords;
                    _loop_1 = function (i) {
                        var record = dns[i];
                        updateDnsData(function (dnsData) { return __spreadArrays(dnsData, [record]); });
                    };
                    for (i = 0; i < dns.length; i++) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, blacklists_1.LookupBlacklists(formData.domain)];
                case 3:
                    blacklistResult = _a.sent();
                    blacklist = blacklistResult.data;
                    updateBlacklistData(blacklist);
                    setLoading(false);
                    setOpen(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleNew = function (e) {
        setLoading(true);
        setIsSubmitted(false);
        setOpen(false);
        e.preventDefault();
        updateDomainData({
            createdDate: "",
            updatedDate: "",
            expiresDate: "",
            domainName: "",
            registrant: {
                organization: "",
                state: "",
                countryCode: ""
            },
            contactEmail: ""
        });
        updateDnsData([]);
        updateBlacklistData({
            detections: 0,
            input_raw: "",
            blacklists: [],
            checks_remaining: "",
        });
        setLoading(false);
    };
    return (react_1.default.createElement("div", { className: 'page-content p-3' },
        react_1.default.createElement(react_bootstrap_1.Card, null,
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: 'border-bottom' }, "Domain Tool"),
                react_1.default.createElement(react_bootstrap_1.Row, { className: "py-2 mb-3" },
                    react_1.default.createElement("p", null, "Input the domain name to pull back information such as DNS records, MX records, SPF records, as well as a blacklist check.")),
                isLoading ?
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(Loading_1.default, null))
                    :
                        react_1.default.createElement(react_bootstrap_1.Row, null,
                            !isSubmitted ?
                                react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleSubmit },
                                    react_1.default.createElement(react_bootstrap_1.Row, { className: "align-bottom mb-3" },
                                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Domain Name"),
                                            react_1.default.createElement(react_bootstrap_1.Form.Control, { name: "domain", type: "text", placeholder: "one-comm.com", onChange: handleChange })),
                                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                            react_1.default.createElement(react_bootstrap_1.Button, { className: '', onClick: handleSubmit }, "Submit"))))
                                : null,
                            react_1.default.createElement(react_bootstrap_1.Collapse, { in: open },
                                react_1.default.createElement(react_bootstrap_1.Container, null,
                                    react_1.default.createElement(react_bootstrap_1.Row, null,
                                        react_1.default.createElement(react_bootstrap_1.Col, { sm: 8 },
                                            react_1.default.createElement("h5", null, domainData.domainName)),
                                        react_1.default.createElement(react_bootstrap_1.Col, { sm: 4 },
                                            react_1.default.createElement(react_bootstrap_1.Button, { typeof: 'submit', onClick: handleNew }, "New Search"))),
                                    react_1.default.createElement("hr", null),
                                    react_1.default.createElement(react_bootstrap_1.Row, null,
                                        react_1.default.createElement(react_bootstrap_1.Col, { sm: 8 },
                                            react_1.default.createElement("strong", null, "A Records"),
                                            react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, size: 'sm' },
                                                react_1.default.createElement("thead", null,
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("th", null, "Type"),
                                                        react_1.default.createElement("th", null, "Domain Name"),
                                                        react_1.default.createElement("th", null, "TTL"),
                                                        react_1.default.createElement("th", null, "Record"))),
                                                react_1.default.createElement("tbody", null, dnsData.map(function (record, index) {
                                                    if (record.type === 1)
                                                        return (react_1.default.createElement("tr", { key: index },
                                                            react_1.default.createElement("td", null, record.dnsType),
                                                            react_1.default.createElement("td", null, record.name),
                                                            react_1.default.createElement("td", null, secsToTime_1.default(record.ttl)),
                                                            react_1.default.createElement("td", null, record.address)));
                                                    else
                                                        return null;
                                                }))),
                                            react_1.default.createElement("hr", null),
                                            react_1.default.createElement("strong", null, "AAAA Records"),
                                            react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, size: 'sm' },
                                                react_1.default.createElement("thead", null,
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("th", null, "Type"),
                                                        react_1.default.createElement("th", null, "Domain Name"),
                                                        react_1.default.createElement("th", null, "TTL"),
                                                        react_1.default.createElement("th", null, "Record"))),
                                                react_1.default.createElement("tbody", null, dnsData.map(function (record, index) {
                                                    if (record.type === 28)
                                                        return (react_1.default.createElement("tr", { key: index },
                                                            react_1.default.createElement("td", null, record.dnsType),
                                                            react_1.default.createElement("td", null, record.name),
                                                            react_1.default.createElement("td", null, secsToTime_1.default(record.ttl)),
                                                            react_1.default.createElement("td", null, record.address)));
                                                    else
                                                        return null;
                                                }))),
                                            react_1.default.createElement("hr", null),
                                            react_1.default.createElement("strong", null, "MX Records"),
                                            react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, size: 'sm' },
                                                react_1.default.createElement("thead", null,
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("th", null, "Type"),
                                                        react_1.default.createElement("th", null, "Domain Name"),
                                                        react_1.default.createElement("th", null, "TTL"),
                                                        react_1.default.createElement("th", null, "Priority"),
                                                        react_1.default.createElement("th", null, "Target"))),
                                                react_1.default.createElement("tbody", null, dnsData.map(function (record, index) {
                                                    if (record.type === 15)
                                                        return (react_1.default.createElement("tr", { key: index },
                                                            react_1.default.createElement("td", null, record.dnsType),
                                                            react_1.default.createElement("td", null, record.name),
                                                            react_1.default.createElement("td", null, secsToTime_1.default(record.ttl)),
                                                            react_1.default.createElement("td", null, record.priority),
                                                            react_1.default.createElement("td", null, record.target)));
                                                    else
                                                        return null;
                                                }))),
                                            react_1.default.createElement("hr", null),
                                            react_1.default.createElement("strong", null, "Text Records"),
                                            react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, size: 'sm' },
                                                react_1.default.createElement("thead", null,
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("th", null, "Type"),
                                                        react_1.default.createElement("th", null, "Domain Name"),
                                                        react_1.default.createElement("th", null, "TTL"),
                                                        react_1.default.createElement("th", null, "Record"))),
                                                react_1.default.createElement("tbody", null, dnsData.map(function (record, index) {
                                                    if (record.type === 16)
                                                        return (react_1.default.createElement("tr", { key: index },
                                                            react_1.default.createElement("td", null, record.dnsType),
                                                            react_1.default.createElement("td", null, record.name),
                                                            react_1.default.createElement("td", null, secsToTime_1.default(record.ttl)),
                                                            react_1.default.createElement("td", null, record.strings[0])));
                                                    else
                                                        return null;
                                                })))),
                                        react_1.default.createElement(react_bootstrap_1.Col, { sm: 4 },
                                            react_1.default.createElement(react_bootstrap_1.Card, { border: blacklistData.detections > 0 ? 'danger' : 'success' },
                                                react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                                                    react_1.default.createElement(react_bootstrap_1.Card.Title, null, "Blacklist Check"),
                                                    react_1.default.createElement(react_bootstrap_1.Card.Text, null,
                                                        domainData.domainName,
                                                        " is listed on ",
                                                        react_1.default.createElement("strong", null, blacklistData.detections),
                                                        " blacklists."),
                                                    blacklistData.detections > 0 ? react_1.default.createElement(react_bootstrap_1.Card.Link, { href: '#', onClick: function () { return setBldLgShow(true); } }, "Details") : null)),
                                            react_1.default.createElement("hr", null),
                                            react_1.default.createElement(react_bootstrap_1.Modal, { size: "lg", show: bldLgShow, onHide: function () { return setBldLgShow(false); }, "aria-labelledby": "example-modal-sizes-title-lg" },
                                                react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                                                    react_1.default.createElement(react_bootstrap_1.Modal.Title, { id: "example-modal-sizes-title-lg" },
                                                        "Blacklist details for ",
                                                        blacklistData.input_raw)),
                                                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                                                    react_1.default.createElement("strong", null,
                                                        blacklistData.input_raw,
                                                        " is listed on ",
                                                        blacklistData.detections,
                                                        " blacklists."),
                                                    react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, size: 'sm' },
                                                        react_1.default.createElement("thead", null,
                                                            react_1.default.createElement("tr", null,
                                                                react_1.default.createElement("th", null, "Blacklist"),
                                                                react_1.default.createElement("th", null, "Result"))),
                                                        react_1.default.createElement("tbody", null, blacklistData.blacklists.map(function (record) {
                                                            return (react_1.default.createElement("tr", { key: record.id, className: record.detected ? 'table-danger' : null },
                                                                react_1.default.createElement("td", null, record.name),
                                                                react_1.default.createElement("td", null, record.detected ? "❌ Listed" : "Not Listed")));
                                                        }))),
                                                    react_1.default.createElement("small", null, blacklistData.checks_remaining))),
                                            react_1.default.createElement(react_bootstrap_1.Table, null,
                                                react_1.default.createElement("tbody", null,
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Organization"),
                                                        react_1.default.createElement("td", null, domainData.registrant.organization)),
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Location"),
                                                        react_1.default.createElement("td", null,
                                                            domainData.registrant.state,
                                                            ", ",
                                                            domainData.registrant.countryCode)),
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Registration Date"),
                                                        react_1.default.createElement("td", null, domainData.createdDate)),
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Last Updated"),
                                                        react_1.default.createElement("td", null, domainData.updatedDate)),
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Expiration Date"),
                                                        react_1.default.createElement("td", null, domainData.expiresDate)),
                                                    react_1.default.createElement("tr", null,
                                                        react_1.default.createElement("td", null, "Contact Email"),
                                                        react_1.default.createElement("td", null,
                                                            react_1.default.createElement("a", { href: "mailto:" + domainData.contactEmail }, domainData.contactEmail))))))))))))));
}
exports.default = Domain;
