
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener('click', () => {
  window.api.logout().then(result => {
    window.electron.newWindow('login');
  });
  
});

gameListTable = document.getElementById('gameListTable');

function GenerateListElement() {
  let listElementHeight = 47;
  let gameTitle = "Title";
  let originalPrice = 999;
  let discountPrice = 499;
  let discountPercent = 50;

  let html = `
  <tr class="d-flex align-items-center">
    <td>              
      <img src="#" width="100" height="${listElementHeight}"/>
    </td>

    <td class="col-5">                          
      <span class="game-title">${gameTitle}</span>              
    </td>

    <td class="col d-flex align-items-center flex-row-reverse">             
      <div class="discountPrice">
        <div class="discountPrice originalPrice text-muted">€${originalPrice/100}</div><br>
        <div class="discountPrice">€${discountPrice/100}</div>
      </div>
      <div class="discountPercent">
        -${discountPercent}%
      </div>
    </td>
  </tr>`
  gameListTable.innerHTML += html;
}