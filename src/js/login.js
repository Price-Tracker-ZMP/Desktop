const loginButton = document.getElementById("loginButton");

const loginRegisterModule = require('../js/loginRegisterModule');

loginButton.addEventListener('click', () => {
  loginRegisterModule.login();
});

