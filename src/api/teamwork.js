import axios from 'axios';

function GetAgents() {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });
  
  const agents = teamworkApi.get('/teamwork/agents');
  return agents;
}

function GetCompanies() {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });
  
  const companies = teamworkApi.get('/teamwork/companies');
  return companies;
}

function GetTimelogs(company, dateRange, showClosed) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });

  const timelogs = teamworkApi.get(
    '/teamwork/timelogs', {
      params: {
        company,
        dateRange,
        showClosed
      }
    });
  return timelogs;
}

export {GetAgents, GetCompanies, GetTimelogs};
