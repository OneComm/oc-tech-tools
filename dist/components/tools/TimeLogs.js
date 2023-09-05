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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var teamwork_1 = require("../../api/teamwork");
var react_bootstrap_1 = require("react-bootstrap");
var react_select_1 = __importDefault(require("react-select"));
require("react-date-range/dist/styles.css"); // main style file
require("react-date-range/dist/theme/default.css"); // theme css file
var Loading_1 = __importDefault(require("../global/Loading"));
var combineArray_1 = require("../../api/combineArray");
var moment_1 = __importDefault(require("moment"));
var humanize_duration_1 = __importDefault(require("humanize-duration"));
var msal_react_1 = require("@azure/msal-react");
function TimeLogs() {
    var _this = this;
    var _a;
    var accounts = msal_react_1.useMsal().accounts;
    var azureGroupId = process.env.REACT_APP_AZURE_TIMELOGS_GROUP_ID;
    var account = accounts[0];
    var accountGroups = ((_a = account.idTokenClaims) === null || _a === void 0 ? void 0 : _a.groups) || [];
    var isAuthorizedUser = accountGroups.some(function (group) {
        return group === azureGroupId;
    });
    var _b = react_2.useState(false), hasTeamworkApiKey = _b[0], setHasTeamworkApiKey = _b[1];
    var _c = react_2.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var companies = react_2.useRef([]);
    var joinedArray = react_2.useRef([]);
    var agents = react_2.useRef([]);
    var _d = react_2.useState({ value: null }), selectedAgent = _d[0], setSelectedAgent = _d[1];
    var timelogsRef = react_2.useRef([]);
    var _e = react_2.useState([]), tickets = _e[0], setTickets = _e[1];
    //create timelog state
    var initialCreateFormData = {
        date: "",
        description: "",
        ticket: 0,
        time: "",
    };
    var _f = react_2.useState(initialCreateFormData), createFormData = _f[0], updateCreateFormData = _f[1];
    var _g = react_2.useState(false), createResult = _g[0], updateCreateResult = _g[1];
    //settings state
    var initialSettingsState = {
        teamworkApiKey: "",
        intuitApiKey: ""
    };
    var _h = react_2.useState(initialSettingsState), timelogSettings = _h[0], setTimelogSettings = _h[1];
    react_2.useEffect(function () {
        var teamworkApiKey = localStorage.getItem("teamworkApiKey") || "";
        var intuitApiKey = localStorage.getItem("intuitApiKey") || "";
        setTimelogSettings(__assign(__assign({}, timelogSettings), { teamworkApiKey: teamworkApiKey,
            intuitApiKey: intuitApiKey }));
        setTimeout(function () {
            if (isAuthorizedUser) {
                if (teamworkApiKey === "") {
                    alert("Teamwork API Key missing! Please add in settings.");
                }
                else {
                    setHasTeamworkApiKey(true);
                    teamwork_1.GetCompanies(teamworkApiKey)
                        .then(function (result) {
                        joinedArray.current = [];
                        joinedArray.current = combineArray_1.CombineArray(result);
                        for (var i = 0; i < joinedArray.current.length; i++) {
                            var company = joinedArray.current[i];
                            companies.current.push({ value: company.id, label: company.name });
                        }
                    })
                        .catch(function (error) { return console.error(error); });
                    teamwork_1.GetAgents(teamworkApiKey)
                        .then(function (result) {
                        joinedArray.current = [];
                        joinedArray.current = combineArray_1.CombineArray(result);
                        for (var j = 0; j < joinedArray.current.length; j++) {
                            var agent = joinedArray.current[j];
                            agents.current.push({ value: agent.id, label: agent.firstName + " " + agent.lastName });
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                }
                setIsLoading(false);
            }
            else { }
        }, 2000);
    }, [isAuthorizedUser, timelogSettings]);
    var handleExportSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    e.preventDefault();
                    return [4 /*yield*/, teamwork_1.GetTimelogs(timelogSettings.teamworkApiKey, null, null)];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    if (data.message) {
                        alert("Error! Status: " + data.status + " Message: " + data.message);
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    timelogsRef.current = data;
                    setTickets(timelogsRef.current);
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCreateChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var value;
        var _a;
        return __generator(this, function (_b) {
            value = e.target.value;
            updateCreateFormData(__assign(__assign({}, createFormData), (_a = {}, _a[e.target.name] = value, _a)));
            return [2 /*return*/];
        });
    }); };
    var handleCreateSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var a, seconds, timelog;
        return __generator(this, function (_a) {
            e.preventDefault();
            a = createFormData.time.split(':');
            seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            timelog = {
                ticketId: Number(createFormData.ticket),
                agentId: selectedAgent.value,
                date: createFormData.date + "T00:00:00Z",
                time: seconds,
                description: createFormData.description
            };
            teamwork_1.CreateTimelog(timelogSettings.teamworkApiKey, timelog.ticketId, timelog.agentId, timelog.date, timelog.time, timelog.description)
                .then(function (response) {
                console.log(response.status);
                updateCreateResult(true);
                setTimeout(function () {
                    updateCreateResult(false);
                    updateCreateFormData(initialCreateFormData);
                    setSelectedAgent({ value: null });
                    e.target.reset();
                }, 5000);
            })
                .catch(function (error) { return console.log(error); });
            return [2 /*return*/];
        });
    }); };
    var handleTimelogSettingsChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var _a, name, value;
        var _b;
        return __generator(this, function (_c) {
            _a = e.target, name = _a.name, value = _a.value;
            setTimelogSettings(__assign(__assign({}, timelogSettings), (_b = {}, _b[name] = value, _b)));
            return [2 /*return*/];
        });
    }); };
    var handleSettingsSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            console.log(timelogSettings);
            localStorage.setItem("teamworkApiKey", timelogSettings.teamworkApiKey);
            localStorage.setItem("intuitApiKey", timelogSettings.intuitApiKey);
            window.location.reload();
            return [2 /*return*/];
        });
    }); };
    return (react_1.default.createElement("div", { className: 'page-content p-3' },
        react_1.default.createElement(react_bootstrap_1.Card, null, isAuthorizedUser ?
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: 'border-bottom' }, "Timelog Tool"),
                react_1.default.createElement(react_bootstrap_1.Row, { className: "py-2 mb-3" },
                    react_1.default.createElement("p", null, "Pulls time logs from Teamwork Desk. Select your company (or none for all), date range, and choose whether or not to see open tickets.")),
                isLoading ?
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(Loading_1.default, null))
                    :
                        react_1.default.createElement(react_1.default.Fragment, null, hasTeamworkApiKey ?
                            react_1.default.createElement(react_bootstrap_1.Tabs, { defaultActiveKey: "export", id: "uncontrolled-tab-example", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Tab, { eventKey: "export", title: "Export" },
                                    react_1.default.createElement(react_bootstrap_1.Row, null,
                                        react_1.default.createElement(react_bootstrap_1.Col, { as: react_bootstrap_1.Card, xs: 3 },
                                            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                                                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: 'border-bottom' }, "Parameters"),
                                                react_1.default.createElement(react_bootstrap_1.Form, null,
                                                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                                                        react_1.default.createElement(react_bootstrap_1.Button, { onClick: handleExportSubmit }, "Submit"))))),
                                        react_1.default.createElement(react_bootstrap_1.Col, null,
                                            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                                                react_1.default.createElement(react_bootstrap_1.Card.Title, { className: 'border-bottom' },
                                                    "Results (",
                                                    tickets.length,
                                                    ")"),
                                                react_1.default.createElement(react_bootstrap_1.Row, null, tickets.map(function (ticket) {
                                                    //let ticketUrl = `https://onecomm.teamwork.com/desk/tickets/${ticket.id}/messages`;
                                                    return (react_1.default.createElement(react_bootstrap_1.Card, { key: ticket.id, className: "mb-3 p-4" },
                                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                                            "SO# - ",
                                                            ticket.id,
                                                            react_1.default.createElement("br", null),
                                                            "Company - ",
                                                            ticket.company.name,
                                                            react_1.default.createElement("br", null),
                                                            "Customer - ",
                                                            ticket.customer.firstName,
                                                            " ",
                                                            ticket.customer.lastName,
                                                            react_1.default.createElement("br", null),
                                                            react_1.default.createElement("br", null),
                                                            "Description - ",
                                                            ticket.subject,
                                                            react_1.default.createElement("br", null)),
                                                        react_1.default.createElement(react_bootstrap_1.Table, { striped: true, bordered: true },
                                                            react_1.default.createElement("tbody", null, ticket.timelogsError ?
                                                                react_1.default.createElement("tr", null,
                                                                    react_1.default.createElement("td", null,
                                                                        react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger" }, "Timelogs missing!")))
                                                                :
                                                                    ticket.timelogs.map(function (timelog) {
                                                                        var ms = timelog.seconds * 1000;
                                                                        var hrTime = humanize_duration_1.default(ms);
                                                                        return (react_1.default.createElement("tr", { key: timelog.id },
                                                                            react_1.default.createElement("td", null,
                                                                                "Date - ",
                                                                                moment_1.default(timelog.date).format('MM/DD/YY'),
                                                                                " Time - ",
                                                                                hrTime,
                                                                                react_1.default.createElement("br", null),
                                                                                timelog.description)));
                                                                    })))));
                                                })))))),
                                react_1.default.createElement(react_bootstrap_1.Tab, { eventKey: "create", title: "Create Timelog" },
                                    createResult ?
                                        react_1.default.createElement(react_bootstrap_1.Alert, { variant: "success" }, "Timelog sucessfully created!")
                                        :
                                            null,
                                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleCreateSubmit },
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Ticket #"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "ticket", placeholder: "123456", onChange: handleCreateChange }),
                                                react_1.default.createElement(react_bootstrap_1.Form.Text, null, "Enter ticket ID without the hastag.")),
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Agent"),
                                                react_1.default.createElement(react_select_1.default, { name: "agent", options: agents.current, onChange: setSelectedAgent }))),
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Time"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "time", placeholder: "hh:mm:ss", onChange: handleCreateChange })),
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Date"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "date", name: "date", onChange: handleCreateChange }))),
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Description"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", name: "description", rows: 10, onChange: handleCreateChange }))),
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Col, null),
                                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                                react_1.default.createElement(react_bootstrap_1.Button, { style: { "float": "right" }, type: "submit" }, "Submit"))))),
                                react_1.default.createElement(react_bootstrap_1.Tab, { eventKey: "settings", title: "Settings" },
                                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleSettingsSubmit },
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Teamwork API Key"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", name: "teamworkApiKey", value: timelogSettings.teamworkApiKey, onChange: handleTimelogSettingsChange }),
                                                react_1.default.createElement(react_bootstrap_1.Form.Text, null,
                                                    "Go to your ",
                                                    react_1.default.createElement("a", { href: "https://onecomm.teamwork.com/desk/myprofile/apikeys", target: "_blank", rel: "noreferrer" }, "teamwork desk profile"),
                                                    " and generate a v2 api key with no expiration.")),
                                            react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Intuit API Key"),
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", name: "intuitApiKey", value: timelogSettings.intuitApiKey, onChange: handleTimelogSettingsChange }))),
                                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                            react_1.default.createElement(react_bootstrap_1.Col, null),
                                            react_1.default.createElement(react_bootstrap_1.Col, null,
                                                react_1.default.createElement(react_bootstrap_1.Button, { style: { "float": "right" }, type: "submit" }, "Update"))))))
                            :
                                react_1.default.createElement(react_bootstrap_1.Tabs, { defaultActiveKey: "settings", id: "uncontrolled-tab-example", className: "mb-3" },
                                    react_1.default.createElement(react_bootstrap_1.Tab, { eventKey: "settings", title: "Settings" },
                                        react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleSettingsSubmit },
                                            react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                                react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                    react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Teamwork API Key"),
                                                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", name: "teamworkApiKey", value: timelogSettings.teamworkApiKey, onChange: handleTimelogSettingsChange }),
                                                    react_1.default.createElement(react_bootstrap_1.Form.Text, null,
                                                        "Go to your ",
                                                        react_1.default.createElement("a", { href: "https://onecomm.teamwork.com/desk/myprofile/apikeys", target: "_blank", rel: "noreferrer" }, "teamwork desk profile"),
                                                        " and generate a v2 api key with no expiration.")),
                                                react_1.default.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col },
                                                    react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Intuit API Key"),
                                                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", name: "intuitApiKey", value: timelogSettings.intuitApiKey, onChange: handleTimelogSettingsChange }))),
                                            react_1.default.createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                                react_1.default.createElement(react_bootstrap_1.Col, null),
                                                react_1.default.createElement(react_bootstrap_1.Col, null,
                                                    react_1.default.createElement(react_bootstrap_1.Button, { style: { "float": "right" }, type: "submit" }, "Update"))))))))
            : react_1.default.createElement("span", null, "Not Allowed"))));
}
exports.default = TimeLogs;
