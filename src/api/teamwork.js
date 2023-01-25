import axios from 'axios';

function GetAgents(apiKey) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });
  
  const agents = teamworkApi.get('/teamwork/agents');
  return agents;
}

function GetCompanies(apiKey) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });
  
  const companies = teamworkApi.get('/teamwork/companies');
  return companies;
}

function GetTicket(apiKey, id) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

  return teamworkApi.get(`/teamwork/tickets/${id}`);
}

function CreateTimelog(apiKey, ticketId, agentId, date, seconds, description) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

 return teamworkApi.post(
  '/teamwork/timelogs',{
    ticketId,
    agentId,
    date,
    seconds,
    description
 });
}

function GetTimelogs(apiKey, company, showClosed) {
  const baseURL = "https://oc-tech-tools-api.herokuapp.com";

  const teamworkApi = axios.create({
    baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

  const timelogs = teamworkApi.get(
    '/teamwork/timelogs', {
      apiKey,
      company,
      showClosed
    });
  return timelogs;
}

export {GetAgents, GetCompanies, GetTicket, CreateTimelog, GetTimelogs};
