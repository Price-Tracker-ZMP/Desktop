ToggleForm('registerForm', false);
const loginModule = require('../js/loginRegisterModule.js');


const emailLoginInput = document.getElementById('emailLoginInput');
const passLoginInput = document.getElementById('passLoginInput');

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', () => {
  loginModule.login(emailLoginInput.value, passLoginInput.value);
});

function searchKeyPress(e)
{    
    e = e || window.event;
    if (e.keyCode == 13)
    {
      if (OnLoginForm)
        loginButton.click();        
      else
        registerButton.click();
    }    
}



const emailRegisterInput = document.getElementById('emailRegisterInput');
const passRegisterInput = document.getElementById('passRegisterInput');

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener('click', () => {
  loginModule.register(emailRegisterInput.value, passRegisterInput.value);
});

const switchViewPage = document.getElementById("switchViewPageLink");
switchViewPage.addEventListener('click', () => {  
  SwitchBetweenLoginRegister();
})


let OnLoginForm = true;
function SwitchBetweenLoginRegister()
{
  if (OnLoginForm)  // Change to Register Form
  {
    ToggleForm('loginForm', false);
    ToggleForm('registerForm', true);
    document.getElementById('switchViewPageText').innerHTML = "Already have an account?";
    switchViewPage.innerHTML = "Log in";
    OnLoginForm = false;
  }
  else {          // Change to Login Form
    ToggleForm('registerForm', false);
    ToggleForm('loginForm', true);
    document.getElementById('switchViewPageText').innerHTML = "Don't have an account yet?";
    switchViewPage.innerHTML = "Register";
    OnLoginForm = true;
  }
  
}

function ToggleForm(formId, enable)
{
  document.getElementById(formId).style.display = enable ? "block": "none";

  var form = document.getElementById(formId);
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled =  enable ? false : true;
  }
}