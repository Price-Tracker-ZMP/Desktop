const { test, expect } = require('@playwright/test');
const { _electron: electron } = require('playwright');
const keytar = require('keytar');
require('dotenv').config();

const loginEmail = process.env['TEST_ACC'];
const loginPass = process.env['TEST_PASS'];

let electronApp;
let CurrentPage;

test.beforeAll(async () => {
    electronApp = await electron.launch({ args: ['src/main.js'] });
    
    // Logout if possible
    await keytar.deletePassword("PriceTracker", "userToken");

    await electronApp.evaluate(({ ipcMain }) => {
        ipcMain.emit('set-authenticated', false);
    })

    // Wait for Login Page
    CurrentPage = await electronApp.waitForEvent('window');
    expect(await CurrentPage.title()).toBe("Steam Price Tracker - Login");
})

test.afterAll(async () => {
    await electronApp.evaluate(({ app }) => {
        app.quit();
    });
})

test("Login", async () => {
    CurrentPage = await electronApp.firstWindow();    
    
    await CurrentPage.fill('#emailLoginInput', loginEmail);
    await CurrentPage.fill('#passLoginInput', loginPass);
    
    await CurrentPage.click('#loginButton')
    
    CurrentPage = await electronApp.waitForEvent('window');
    expect(await CurrentPage.title()).toBe("Steam Price Tracker");
});

test("Add Game", async () => {
    await CurrentPage.click('#addGameButton');

    await CurrentPage.fill('#linkInput', "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/")
    await CurrentPage.keyboard.press('Enter');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    let game = await CurrentPage.$('text=Witcher')        
    expect(game).not.toBeNull();
})

test("Open Game Details", async () => {
    await CurrentPage.click('text=Witcher');

    await CurrentPage.click('#stopObserving')

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let game = await CurrentPage.$('text=Witcher')    
    expect(game).toBeNull();
})

test("Logout", async () => {        
    CurrentPage.click('#logoutButton');

    CurrentPage = await electronApp.waitForEvent('window');
    expect(await CurrentPage.title()).toBe("Steam Price Tracker - Login");
})