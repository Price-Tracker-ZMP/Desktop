setTimeout(function() {
  window.electron.showLoading();
}, 500);

const INFINITE_LOADING = false;

if (!INFINITE_LOADING) {
  if (window.electron.getGlobal('isAuthenticated')) { //Check if already logged in
    window.api.userInfo().then(result => {
      if (result) {
        window.electron.newWindow('index');
      }
      else
        window.electron.newWindow('login');
    });

  }
}