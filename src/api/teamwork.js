import axios from "axios";

export async function GetCompanies() {
  const apiKey = process.env.REACT_APP_TEAMWORK_API_KEY;

  const teamworkApi = axios.create({
    baseURL: "https://onecomm.teamwork.com/desk/api/v2",
    Headers: {
      "Content-Type": "text/json",
      "Referer": "https://tech-tools.one-comm.com",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  try {
   await teamworkApi.get('/companies.json').then( res => {
      console.log(res);
      return res;
    }
    );
    
  } catch (error) {
    
  }
}
