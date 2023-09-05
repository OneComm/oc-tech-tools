"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimelogs = exports.CreateTimelog = exports.GetTicket = exports.GetCompanies = exports.GetAgents = void 0;
var axios_1 = __importDefault(require("axios"));
function GetAgents(apiKey) {
    var baseURL = "https://oc-tech-tools-api.herokuapp.com";
    var teamworkApi = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    });
    var agents = teamworkApi.get('/teamwork/agents');
    return agents;
}
exports.GetAgents = GetAgents;
function GetCompanies(apiKey) {
    var baseURL = "https://oc-tech-tools-api.herokuapp.com";
    var teamworkApi = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    });
    var companies = teamworkApi.get('/teamwork/companies');
    return companies;
}
exports.GetCompanies = GetCompanies;
function GetTicket(apiKey, id) {
    var baseURL = "https://oc-tech-tools-api.herokuapp.com";
    var teamworkApi = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    });
    return teamworkApi.get("/teamwork/tickets/" + id);
}
exports.GetTicket = GetTicket;
function CreateTimelog(apiKey, ticketId, agentId, date, seconds, description) {
    var baseURL = "https://oc-tech-tools-api.herokuapp.com";
    var teamworkApi = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    });
    return teamworkApi.post('/teamwork/timelogs', {
        ticketId: ticketId,
        agentId: agentId,
        date: date,
        seconds: seconds,
        description: description
    });
}
exports.CreateTimelog = CreateTimelog;
function GetTimelogs(apiKey, company, showClosed) {
    var baseURL = "https://oc-tech-tools-api.herokuapp.com";
    var teamworkApi = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    });
    var timelogs = teamworkApi.get('/teamwork/timelogs');
    return timelogs;
}
exports.GetTimelogs = GetTimelogs;
