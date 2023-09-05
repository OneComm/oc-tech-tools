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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var option43_1 = require("../../api/option43");
var react_bootstrap_1 = require("react-bootstrap");
function Option43() {
    var initialFormData = Object.freeze({
        type: "",
        ip: ""
    });
    var initialHexData = Object.freeze({
        ip: "",
        unformatted: "",
        formatted: ""
    });
    var _a = react_1.default.useState(initialFormData), formData = _a[0], updateFormData = _a[1];
    var _b = react_1.default.useState(initialHexData), hexData = _b[0], updateHexData = _b[1];
    var _c = react_1.default.useState(false), open = _c[0], setOpen = _c[1];
    var handleChange = function (e) {
        var _a;
        updateFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value.trim(), _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var result = option43_1.GenerateHex(formData);
        updateHexData({
            ip: result.ip,
            unformatted: result.hexResult,
            formatted: result.formattedHex
        });
        setOpen(true);
    };
    return (react_1.default.createElement("div", { className: 'page-content p-3' },
        react_1.default.createElement(react_bootstrap_1.Card, null,
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: 'border-bottom' }, "Option 43 Helper"),
                react_1.default.createElement(react_bootstrap_1.Row, { className: "py-2 mb-3" },
                    react_1.default.createElement("p", null, "Input the IP address of the controller below and hit submit for option 43 formatted for windows and Sophos DHCP.")),
                react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleSubmit },
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Controller Type"),
                            react_1.default.createElement(react_bootstrap_1.Form.Select, { name: "type", defaultValue: "Select One", onChange: handleChange },
                                react_1.default.createElement("option", { disabled: true }, "Select One"),
                                react_1.default.createElement("option", { value: "SCG" }, "SCG"),
                                react_1.default.createElement("option", { value: "ZD" }, "ZD"))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "IP Address"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { name: "ip", type: "text", placeholder: "10.10.100.11", onChange: handleChange }))),
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "m-4" },
                        react_1.default.createElement(react_bootstrap_1.Button, { typeof: 'submit', onClick: handleSubmit }, "Generate"))),
                react_1.default.createElement(react_bootstrap_1.Collapse, { in: open },
                    react_1.default.createElement(react_bootstrap_1.Container, null,
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "IP Address")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", disabled: true, value: hexData.ip })),
                            react_1.default.createElement(react_bootstrap_1.Col, null)),
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "Hex String")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", disabled: true, value: hexData.unformatted })),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return navigator.clipboard.writeText(hexData.unformatted); } }, "Copy"))),
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "Sophos Option")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", disabled: true, value: hexData.formatted })),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return navigator.clipboard.writeText(hexData.formatted); } }, "Copy"))))),
                react_1.default.createElement(react_bootstrap_1.Row, null,
                    react_1.default.createElement(react_bootstrap_1.Accordion, null,
                        react_1.default.createElement(react_bootstrap_1.Accordion.Item, { eventKey: "0" },
                            react_1.default.createElement(react_bootstrap_1.Accordion.Header, null, "Understanding Option 43"),
                            react_1.default.createElement(react_bootstrap_1.Accordion.Body, null,
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement("p", null,
                                        "The result of the option 43 is \"",
                                        react_1.default.createElement("b", null, "option 43 hex aabb[variable code]"),
                                        "\" and the syntax would be,"),
                                    react_1.default.createElement("p", null,
                                        react_1.default.createElement("b", null, "aa"),
                                        " = Sub Option Code (this will be 03 or 06) - Typically 06 for SmartZone (SCG) APs."),
                                    react_1.default.createElement("p", null,
                                        react_1.default.createElement("b", null, "bb"),
                                        " = length of the IP address including the \u201C.\u201D characters in Hex. For example 192.168.1.1 = 11 characters the Hex value would be 11, so in Hex is 0B"),
                                    react_1.default.createElement("p", null,
                                        react_1.default.createElement("b", null, "[variable code]"),
                                        " = the IP address of the controller - This is the trickiest part, because It translates each decimal digit into ASCII code, including the \u201C.\u201D"),
                                    react_1.default.createElement("p", null,
                                        "- For each number, the ASCII translation is \u201C",
                                        react_1.default.createElement("b", null, "3"),
                                        "\u201D plus the ",
                                        react_1.default.createElement("b", null, "number"),
                                        " in decimal"),
                                    react_1.default.createElement("p", null,
                                        "- For the \u201C.\u201D character, the ASCII code is \u201C",
                                        react_1.default.createElement("b", null, "2e"),
                                        "\u201D")),
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement("p", null, "e.g. 10.10.100.11"),
                                    react_1.default.createElement("p", null,
                                        "option 43 hex 060c3",
                                        react_1.default.createElement("b", null, "1"),
                                        "3",
                                        react_1.default.createElement("b", null, "0"),
                                        "2e3",
                                        react_1.default.createElement("b", null, "1"),
                                        "3",
                                        react_1.default.createElement("b", null, "0"),
                                        "2e3",
                                        react_1.default.createElement("b", null, "1"),
                                        "3",
                                        react_1.default.createElement("b", null, "0"),
                                        "3",
                                        react_1.default.createElement("b", null, "0"),
                                        "2e3",
                                        react_1.default.createElement("b", null, "1"),
                                        "3",
                                        react_1.default.createElement("b", null, "1")),
                                    react_1.default.createElement("p", null, "06 - Option 6"),
                                    react_1.default.createElement("p", null, "0d - 13 characters"))))))))));
}
exports.default = Option43;
