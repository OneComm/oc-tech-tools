import axios from "axios";

export async function LookupBlacklists(domain) {
  const apiKey = process.env.REACT_APP_HETRIX_API_KEY;
  const domainName = domain;

  const hetrixApi = axios.create({
    baseURL: `https://api.hetrixtools.com/v2/${apiKey}`,
    Headers: {
      "Content-Type": "text/json"
    }
  });

  try {
    const res = await axios.get(`https://api.hetrixtools.com/v2/${apiKey}/blacklist-check/domain/${domainName}/`);
    return res;
  } catch (error) {
    console.log(error);
  }
}