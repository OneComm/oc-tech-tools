import axios from "axios";

export async function LookupBlacklists(domain) {
  const apiKey = process.env.REACT_APP_BLACKLIST_API_KEY;
  const domainName = domain;

  const blacklistApi = axios.create({
    baseURL: `https://api.blacklistchecker.com`,
    auth: {
      username: apiKey,
      password: null
    },
    headers: {
      "Content-Type": "text/json",
      "Referer": "https://tech-tools.one-comm.com",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  });

  try {
    const res = await blacklistApi.get(`/check/${domainName}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}