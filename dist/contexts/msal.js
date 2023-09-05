"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphConfig = exports.loginRequest = exports.msalConfig = void 0;
exports.msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_APP_ID,
        authority: process.env.REACT_APP_AZURE_AUTHORITY,
        redirectUri: process.env.REACT_APP_AZURE_REDIRECT_URI,
        postLogoutRedirectUri: process.env.REACT_APP_AZURE_REDIRECT_URI
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    }
};
exports.loginRequest = {
    scopes: ["User.Read"]
};
exports.graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};
