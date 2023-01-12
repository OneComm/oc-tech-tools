import axios from 'axios';

export function GetCompanies() {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });
  
  const companies = teamworkApi.get('/teamwork/companies');
  return companies;
}
