require('node-fetch');
const constants = require('../js/Constants.js');

const electron = require('@electron/remote');
const net = electron.net;



module.exports = {
  login: async function(email, password) {  
    let loginBody = {
      email: email,
      password: password
    }

    const response = await fetch(constants.ApiUrl + constants.AuthLoginRoute, {
      method: 'post',
      body: JSON.stringify(loginBody),
      headers: {'Content-Type': 'application/json'}
    });
    

    console.log(await `STATUS: ${response.status}, ${response.statusText}`);    
    console.log(await response.json());
  },

  register: async function(email, password) {  
    let registerBody = {
      email: email,
      password: password
    }

    const response = await fetch(constants.ApiUrl + constants.AuthRegisterRoute, {
      method: 'post',
      body: JSON.stringify(registerBody),
      headers: {'Content-Type': 'application/json'}
    });
    

    console.log(await `STATUS: ${response.status}, ${response.statusText}`);    
    console.log(await response.json());
  }
};