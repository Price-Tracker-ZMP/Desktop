let GameList = {}; 

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener('click', () => {
  window.api.logout().then(result => {
    window.electron.newWindow('login');
  });
  
});

const emailDisplay = document.getElementById('emailDisplay');
window.api.userInfo().then(email =>
  emailDisplay.innerHTML = email);

gameListTable = document.getElementById('gameListTable');

async function UpdateGameList() {  // Get the Game list from API
  await window.api.userGames().then(games => {
    GameList = games;
    GenerateGameList();
  });
}

function GenerateGameList() {  // Generate the html for the list
  gameListTable.innerHTML = "";

  let index = 0;
  GameList.forEach(game => {
    window.electron.listElementBuilder.setListIndex(index);
    window.electron.listElementBuilder.setSteamID(game.steam_appid);
    window.electron.listElementBuilder.setGameTitle(game.name);
    window.electron.listElementBuilder.setPrice(game.priceInitial);
    window.electron.listElementBuilder.setDiscount(game.priceFinal, game.discountPercent);
    gameListTable.innerHTML += window.electron.listElementBuilder.GenerateListElement();
    index++;
  })  
}

UpdateGameList();

popupBackground = document.getElementById('fullscreenDim');
popupWindow = document.getElementById('popupWindow');
addGameButton = document.getElementById('addGameButton');

function OpenPopup() {
  popupBackground.style.display = 'flex';
  logoutButton.tabIndex = -1;
  addGameButton.tabIndex = -1;
}
 
function ClosePopup() {
  popupBackground.style.display = 'none'; 
  logoutButton.tabIndex = 0;
  addGameButton.tabIndex = 0;
}

// Clicking on the background / out of the popup window
popupBackground.addEventListener('click', () => {
  ClosePopup();
})

// Clicking on any of the list elements
function OpenGameDetails(value) {
  OpenPopup();
  popupWindow.innerHTML = window.electron.gameDetailDisplay(GameList[value]);
}

// Clicking on the + buton
addGameButton.addEventListener('click', () => {
  OpenPopup();
  popupWindow.innerHTML = window.electron.addGameDisplay();

  linkInput = document.getElementById('linkInput');
  linkInputButton = document.getElementById('linkInputButton')
  function keyPressLinkInput(e)
  {    
      e = e || window.event;
      if (e.keyCode == 13)
      {
        linkInputButton.click();
      }    
  }

  linkInputButton.addEventListener('click', () => {
    window.api.addGameByLink(linkInput.value).then(result => {
      UpdateGameList();  
    });
  })
})