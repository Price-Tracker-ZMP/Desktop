const axios = require('axios');
const remote = require('@electron/remote');
const keytar = require('keytar');
const { ipcRenderer } = require('electron');
const fetch = require('node-fetch');

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

    }).catch((err) => {console.log(err.response)});

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

    await axios.post(ApiURL + '/Auth/Register', registerBody).then(response => {
      LogResponse(response);   
    }).catch((err) => {console.log(err.response)});
  }

  async logout() {
    await keytar.deletePassword("PriceTracker", "userToken");
    ipcRenderer.send('set-authenticated', false)
  }

  /*async userInfo() {
    keytar.getPassword("PriceTracker", "userToken").then(token => {
      axios.post(ApiURL + '/user-info/user-email', { token: token }).then(response => {
        LogResponse(response);   
      }).catch((err) => {console.log(err.response)});
    });    
  }*/

  async userInfo() {    
    return axios.get(ApiURL + '/user-info/user-email', await getConfig()).then(response => {
      LogResponse(response);   
      return response.data.content.email;
    }).catch((err) => {console.log(err.response)}); 
  }

  async userGames() {    
    return axios.get(ApiURL + '/user-info/user-games', await getConfig()).then(response => {
      LogResponse(response);   
      return response.data.content;
    }).catch((err) => {console.log(err.response)}); 
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