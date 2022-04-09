const { contextBridge, ipcRenderer, ipcMain } = require('electron')
const keytar = require('keytar');
const AuthApi = require('../js/Api.js');
const remote = require("@electron/remote")

contextBridge.exposeInMainWorld('electron', {
    getGlobal: (name) => remote.getGlobal(name),
    newWindow: (name) => {
        ipcRenderer.send('open-' + name);
        remote.getCurrentWindow().close();
    }    
})

contextBridge.exposeInMainWorld('token', {
    setAuthenticated: (state) => ipcRenderer.send('set-authenticated', state),
    setToken: (token) => keytar.setPassword("PriceTracker", "userToken", token),
    getToken: () => keytar.getPassword("PriceTracker", "userToken"),
})

contextBridge.exposeInMainWorld('auth', {
    login: (email, password) => AuthApi.login(email, password),
    register: (email, password) => AuthApi.register(email, password),
    logout: () => AuthApi.logout(),
})