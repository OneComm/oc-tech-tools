import axios from "axios";

export async function LookupDNS(domain) {
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const whoisApi = axios.create({
    baseURL: "https://www.whoisxmlapi.com/whoisserver",
    Headers: {
      "Content-Type": "text/json"
    }
  });

  try {
    const res = await axios.get(`https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=${apiKey}&domainName=${domainName}&type=A,MX,TXT,AAAA,&outputFormat=json`);
    return res;
  } catch (error) {
    console.log(error);
  }
}