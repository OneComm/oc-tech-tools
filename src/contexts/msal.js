import * as msal from "@azure/msal-browser";

const msalConfig = {
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

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance }
