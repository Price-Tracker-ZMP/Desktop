const registerButton = document.getElementById("registerButton");

const loginRegisterModule = require('../js/loginRegisterModule');

registerButton.addEventListener('click', () => {
  loginRegisterModule.register();
});

