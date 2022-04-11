let GameList = {}; 

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener('click', () => {
  window.api.logout().then(result => {
    window.electron.newWindow('login');
  });
  
});

// TODO: If failed to get the email, go to login window
const emailDisplay = document.getElementById('emailDisplay');
window.api.userInfo().then(email =>
  emailDisplay.innerHTML = email);

gameListTable = document.getElementById('gameListTable');

async function UpdateGameList() {  // Get the Game list from API
  await window.api.userGames().then(games => GameList = games);
}

function GenerateGameList() {  // Generate the html for the list
  console.log(GameList);
  GameList.forEach(game => {
    window.electron.listElementBuilder.setSteamID(game.steam_appid);
    window.electron.listElementBuilder.setGameTitle(game.name);
    window.electron.listElementBuilder.setPrice(game.priceInitial);
    window.electron.listElementBuilder.setDiscount(game.priceFinal, game.discountPercent);
    gameListTable.innerHTML += window.electron.listElementBuilder.GenerateListElement();
  })  
}

UpdateGameList().then(r => {
  GenerateGameList();
});
