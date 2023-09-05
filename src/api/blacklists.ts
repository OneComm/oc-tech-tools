import axios from "axios";

export async function LookupBlacklists(domain) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";
  const apiKey = process.env.REACT_APP_BLACKLIST_API_KEY;
  const domainName = domain;

  const blacklistApi = axios.create({
    baseURL,
  });

  try {
    const res = await blacklistApi.get('/whois/blacklist', {
      params:{
        apiKey,
        domainName,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}