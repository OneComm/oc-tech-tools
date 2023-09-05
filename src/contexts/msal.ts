import { Configuration, PopupRequest} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth:{
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

export const loginRequest: PopupRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};
