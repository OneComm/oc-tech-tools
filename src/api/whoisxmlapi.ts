import axios from "axios";

export async function LookupDomain(domain: string) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const whoisApi = axios.create({
    baseURL,
  });

  try {
    const domain = await whoisApi.get('/whois/whois', {
      params: {
        domainName,
        apiKey,
      }
    });
    return domain;
  } catch (error) {
    
  }
}

export async function LookupDNS(domain: string) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const whoisApi = axios.create({
    baseURL,
  });

  try {
    const dns = await whoisApi.get('/whois/dns', {
      params: {
        domainName,
        apiKey,
      }
    });
    return dns;
  } catch (error) {
    
  }
}
