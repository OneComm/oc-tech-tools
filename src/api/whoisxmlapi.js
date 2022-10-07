import axios from "axios";

export async function LookupDNS(domain) {
  const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
  const domainName = domain;

  const api = axios.create({
    baseURL: "https://www.whoisxmlapi.com/whoisserver"
  });

  api.get(`/DNSService?apiKey=${apiKey}&domainName=${domainName}&type=_all&outputFormat=json`)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}