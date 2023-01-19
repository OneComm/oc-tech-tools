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

function GetTicket(id) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });

  return teamworkApi.get(`/teamwork/tickets/${id}`);
}

function GetTimelogs(company, showClosed) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL
  });

  const timelogs = teamworkApi.get(
    '/teamwork/timelogs', {
      params: {
        company,
        showClosed
      }
    });
  return timelogs;
}

export {GetAgents, GetCompanies, GetTicket, GetTimelogs};
