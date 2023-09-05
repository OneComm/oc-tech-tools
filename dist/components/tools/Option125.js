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
var dhcp_1 = require("../../api/dhcp");
var react_bootstrap_1 = require("react-bootstrap");
function Opt125() {
    var initialFormData = Object.freeze({
        id: "ipphone.mitel.com",
        sw_tftp: "",
        call_srv: "",
        vlan: "2",
        l2p_default: "6",
        l2p_voice: "3",
        l2p_signaling: "3",
        dscp_default: "46",
        dscp_voice: "26",
        dscp_signaling: "26",
    });
    var initialHexData = Object.freeze({
        ascii: "",
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
        var result = dhcp_1.GenerateHex(formData);
        console.log(result);
        updateHexData({
            ascii: result.ascii,
            unformatted: result.hexResult,
            formatted: result.formattedHex
        });
        setOpen(true);
    };
    return (react_1.default.createElement("div", { className: "page-content p-3" },
        react_1.default.createElement(react_bootstrap_1.Card, null,
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: "border-bottom" }, "Option 125 Helper"),
                react_1.default.createElement(react_bootstrap_1.Form, { className: "py-2", onSubmit: handleSubmit },
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingTFTP", label: "TFTP Server Address", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "sw_tftp", placeholder: "TFTP Server Address", onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingCSRV", label: "Call Server Address", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "call_srv", placeholder: "Call Server Address", onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingVLAN", label: "VLAN ID", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "vlan", placeholder: "VLAN ID", value: formData.vlan, onChange: handleChange })))),
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "VLAN Priority (l2p)"),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingDefault", label: "default", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "l2p_default", placeholder: "default", value: formData.l2p_default, onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingV", label: "voice media ( v )", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "l2p_voice", placeholder: "voice", value: formData.l2p_voice, onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingS", label: "voice signaling ( s )", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "l2p_signaling", placeholder: "signaling", value: formData.l2p_signaling, onChange: handleChange })))),
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Diffserv Codepoint (dscp)"),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingDSCPDefault", label: "default", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "dscp_default", placeholder: "default", value: formData.dscp_default, onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingDSCPV", label: "voice media ( v )", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "dscp_voice", placeholder: "voice", value: formData.dscp_voice, onChange: handleChange }))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                            react_1.default.createElement(react_bootstrap_1.FloatingLabel, { controlId: "floatingDSCPS", label: "voice signaling ( s )", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "dscp_signaling", placeholder: "signaling", value: formData.dscp_signaling, onChange: handleChange })))),
                    react_1.default.createElement(react_bootstrap_1.Row, { className: "m-4" },
                        react_1.default.createElement(react_bootstrap_1.Button, { typeof: "submit", onClick: handleSubmit }, "Generate"))),
                react_1.default.createElement(react_bootstrap_1.Collapse, { in: open },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "Hex String")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", style: { height: "130px" }, disabled: true, value: hexData.unformatted })),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return navigator.clipboard.writeText(hexData.unformatted); } }, "Copy"))),
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "Sophos Hex String")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", style: { height: "160px" }, disabled: true, value: hexData.formatted })),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return navigator.clipboard.writeText(hexData.formatted); } }, "Copy"))),
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement("b", null, "ASCII String")),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", style: { height: "70px" }, disabled: true, value: hexData.ascii })),
                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: function () { return navigator.clipboard.writeText(hexData.ascii); } }, "Copy")))))))));
}
exports.default = Opt125;
