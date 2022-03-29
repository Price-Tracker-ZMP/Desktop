const registerButton = document.getElementById("registerButton");

const registerModule = require('../js/loginRegisterModule.js');

registerButton.addEventListener('click', () => {
  registerModule.register();
});

