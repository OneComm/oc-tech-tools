import axios from "axios";

export async function LookupDNS(domain) {
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  axios.get(`https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=${apiKey}&domainName=${domainName}$type=_all&outputFormat=json`)
    .then(response => {
      console.log(response.data.url);
      console.log(response.data.explination);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}