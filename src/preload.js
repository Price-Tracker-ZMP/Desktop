const { contextBridge, ipcRenderer, ipcMain } = require('electron')
const keytar = require('keytar');
const Api = require('./components/Api');
const remote = require("@electron/remote")
const listElementBuilder = require('./components/ListElementBuilder');
const PopupDisplay = require('./components/PopupDisplay');

contextBridge.exposeInMainWorld('electron', {
    getGlobal: (name) => remote.getGlobal(name),
    newWindow: (name) => {
        ipcRenderer.send('open-' + name);
        remote.getCurrentWindow().close();
    },
    showLoading: () => ipcRenderer.send('show-loading'),

    listElementBuilder: listElementBuilder,
    addGameDisplay: () => PopupDisplay.AddGameDisplay(),
    gameDetailDisplay: (game, index) => PopupDisplay.gameDetailDisplay(game, index),
})

contextBridge.exposeInMainWorld('token', {
    setAuthenticated: (state) => ipcRenderer.send('set-authenticated', state),
    setToken: (token) => keytar.setPassword("PriceTracker", "userToken", token),
    getToken: () => keytar.getPassword("PriceTracker", "userToken"),
})

contextBridge.exposeInMainWorld('api', {
    login: (email, password) => Api.login(email, password),
    register: (email, password) => Api.register(email, password),
    logout: () => Api.logout(),

    userInfo: () => Api.userInfo(),
    userGames: () => Api.userGames(),

    addGameByLink: (link) => Api.addGameByLink(link),
    removeGame: (id) => Api.removeGame(id),
})