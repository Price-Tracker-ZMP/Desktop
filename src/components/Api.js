const axios = require('axios');
const keytar = require('keytar');
const { ipcRenderer } = require('electron');
const ApiURL = "https://zmp-price-tracker.herokuapp.com"

class ApiService {  

  async login(email, password) {  
    let loginBody = {
      email: email,
      password: password
    }

    let token;
    await axios.post(ApiURL + '/Auth/Login', loginBody).then(response => {
      LogResponse(response);
      
      if (response.data.status)
        token = response.data.content;

    }).catch((err) => {console.log(err.response); return false; });

    if (token != null) {
      await keytar.setPassword("PriceTracker", "userToken", token);
    
      ipcRenderer.send('set-authenticated', true)
      return true;
    }
    else return false;
  }

  async register(email, password) {  
    let registerBody = {
      email: email,
      password: password
    }

    return await axios.post(ApiURL + '/Auth/Register', registerBody).then(response => {
      LogResponse(response);
      return response.data.status;
    }).catch((err) => { console.log(err.response); return false; });
  }

  async logout() {
    await keytar.deletePassword("PriceTracker", "userToken");
    ipcRenderer.send('set-authenticated', false)
  }

  async userInfo() {    
    return axios.get(ApiURL + '/user-info/user-email', await getConfig()).then(response => {
      LogResponse(response);   
      return response.data.content.email;
    }).catch((err) => {console.log(err.response)}); 
  }

  async userGames() {    
    return axios.get(ApiURL + '/user-info/user-games', await getConfig()).then(response => {
      LogResponse(response);  
      if (response.data.status)
        return response.data.content;
      else 
        return false;
    }).catch((err) => {console.log(err.response)}); 
  }
  
  async addGameById(id) {
    return await axios.post(ApiURL + '/add-game/by-id', { gameId: id }, await getConfig()).then(response => {
      LogResponse(response);
      return response.data.status;
    })
  }

  async addGameByLink(link) {
    return await axios.post(ApiURL + '/add-game/by-link', { link: link }, await getConfig()).then(response => {
      LogResponse(response);
      return response.data.status;
    })
  }

  async removeGame(id) {
    await axios.delete(ApiURL + '/delete/game/' + id, await getConfig()).then(response => {
      LogResponse(response);
    })
  }

  async getPriceHistory(id) {
    return await axios.get(ApiURL + '/get/game-price-history/' + id).then(response => {
      LogResponse(response)
      return response.data.content
    })
  }

  async getSteamGameList() {
    return await axios.get(ApiURL + '/get-steam-games-list/').then(response => {
      LogResponse(response);
      return response.data.content;
    })
  }
}

function LogResponse(response)
{
  console.log(`STATUS: ${response.status}, ${response.statusText}`);        
  console.log(response.data);
}

function getConfig() {
  return keytar.getPassword("PriceTracker", "userToken").then(token => {
    let config = {
      headers: {
        Authentication: token,
      }
    };
    return config;        
  });
}


const API = new ApiService();

module.exports = API;