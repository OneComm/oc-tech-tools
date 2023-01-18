import axios from "axios";

export async function LookupDomain(domain) {
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const whoisApi = axios.create({
    baseURL: "https://www.whoisxmlapi.com/whoisserver",
    Headers: {
      "Content-Type": "text/json",
      "Referer": "https://tech-tools.one-comm.com",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  });

  try {
    const res = await whoisApi.get(`/WhoisService?apiKey=${apiKey}&domainName=${domainName}&outputFormat=json`);
    console.log(res);
    return res;
  } catch (error) {
    
  }
}

export async function LookupDNS(domain) {
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const whoisApi = axios.create({
    baseURL: "https://www.whoisxmlapi.com/whoisserver",
    Headers: {
      "Content-Type": "text/json",
      "Referer": "https://tech-tools.one-comm.com",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  });

  try {
    const res = await whoisApi.get(`/DNSService?apiKey=${apiKey}&domainName=${domainName}&type=A,MX,TXT,AAAA,&outputFormat=json`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
