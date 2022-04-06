
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener('click', () => {
  window.auth.logout().then(result => {
    window.electron.newWindow('login');
  });
  
});

function testCookie()
{
  window.token.getToken().then(token => {
    document.getElementById('testCookie').innerHTML = token + " " + window.electron.getGlobal('isAuthenticated');
  })
}