ToggleForm('registerForm', false);
window.electron.toasts.setToastObject(document.getElementById('toast'));

const emailLoginInput = document.getElementById('emailLoginInput');
const passLoginInput = document.getElementById('passLoginInput');

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', () => {  
  window.api.login(emailLoginInput.value, passLoginInput.value).then(result => {    
    if (result)
      window.electron.newWindow('index');        
    else
      window.electron.toasts.ToastFailure("Login failed"); 
  })
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
  window.api.register(emailRegisterInput.value, passRegisterInput.value).then(result => {
    if (result) {
      window.electron.toasts.ToastSuccess("Account created!"); 
      SwitchBetweenLoginRegister();
    }
    else
      window.electron.toasts.ToastFailure("Registration failed"); 
  })
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
      elements[i].value = '';
  }
}