let GameList = {}; 
window.electron.toasts.setToastObject(document.getElementById('toast'));

window.electron.toasts.ToastSuccess("Logged in!");

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
  popupWindow.innerHTML = window.electron.gameDetailDisplay(GameList[value], value);
}

function stopObserving(index) {
  window.api.removeGame(GameList[index].steam_appid).then(result => {
    UpdateGameList();
    ClosePopup();
    window.electron.toasts.ToastSuccess("Game removed");
  });
}

function GameAdded(result) {
  UpdateGameList();  
  ClosePopup();
  if (result)
    window.electron.toasts.ToastSuccess("Game added!");
  else
    window.electron.toasts.ToastFailure("There was an error while adding the game");
}

// Clicking on the + buton
addGameButton.addEventListener('click', () => {
  OpenPopup();
  popupWindow.innerHTML = window.electron.addGameDisplay();

  linkInput = document.getElementById('linkInput');
  linkInputButton = document.getElementById('linkInputButton')

  searchGameInput = document.getElementById('searchGameInput')
  searchResultTable = document.getElementById('searchResultTable')
  searchPlaceholder = document.getElementById('searchPlaceholder')

  linkInputButton.addEventListener('click', () => {
    window.api.addGameByLink(linkInput.value).then(result => {
      GameAdded(result)
    });
  })
})

function keyPressLinkInput(e)
{    
    e = e || window.event;
    if (e.keyCode == 13)
    {
      linkInputButton.click();
    }    
}

let SteamGameList;
let SteamSearchInterval;

let IntervalSpeed = 100;
let IntervalDuration = 500;

function UpdateSteamGameList() {
  window.api.getSteamGameList().then(list => {
    SteamGameList = list;
  });
}

UpdateSteamGameList();

function keyPressSteamSearch()
{ 
  if (SteamGameList == null)
    return;
  
  if (searchGameInput.value == "") {
    searchResultTable.innerHTML = "";
    searchPlaceholder.classList.add('hide');
    return;
  }
    
  
  searchPlaceholder.innerHTML = "Fetching game list...";
  searchPlaceholder.classList.remove('hide');

  if (IntervalDuration < 500)
    IntervalDuration += 500;

  if (SteamSearchInterval != null)
    return;

  SteamSearchInterval = setInterval(() => {

    if (IntervalDuration % 500 == 0) {      
      searchResult = SteamGameList.filter(game => game.name.toLowerCase().includes(searchGameInput.value.toLowerCase()));
      searchResultTable.innerHTML = window.electron.quickSearchTable(searchResult.slice(0, 29));

      if (searchResult.length == 0) {
        searchPlaceholder.innerHTML = "No results...";
        searchPlaceholder.classList.remove('hide');
      }
      else
        searchPlaceholder.classList.add('hide');      


    }

    IntervalDuration -= IntervalSpeed;

    if (IntervalDuration <= 0) {
      clearInterval(SteamSearchInterval);
      SteamSearchInterval = null;
    }

  }, IntervalSpeed);
  
}

function steamListRemove(id) {
  SteamGameList = SteamGameList.filter(game => game.appid !== id);
}

function addGameById(id) {
  window.api.addGameById(id).then(result => {
    GameAdded(result);
  })
}