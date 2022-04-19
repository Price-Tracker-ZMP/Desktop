const imageSize = 180;
const searchImageSize = 100;


module.exports = {

    gameDetailDisplay: (game, index) => {
        return `
            <table class="table">
                <tr>
                    <td class="col">
                        <h5>${game.name}</h5>
                    </td>
                    <td class="col">
                        <img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steam_appid}/header.jpg" width="${imageSize}" height="${imageSize * (215/460)}">
                    </td>        
                </tr>
            </table>
            <div>
                test
            </div>

            <button class="btn btn-danger stopObservingButton" onclick="stopObserving(${index})">Stop Observing</button>
        `
    },


    AddGameDisplay: () => {
        return `
            <label for="linkInput" class="form-label">Add game with Steam Link</label>
            <div class="input-group">          
                <input type="text" class="form-control" id="linkInput" placeholder="Paste Steam Store page link" onkeypress="keyPressLinkInput(event)">
                
                <div class="input-group-append">
                    <button id="linkInputButton" class="btn btn-outline-secondary" type="button" tabindex="-1">Send</button>
                </div>
            </div>

            <div id="addDivider" class="text-muted">or</div>

            <label for="linkInput" class="form-label">Search Steam</label>
            <div class="input-group">
                <input type="text" class="form-control" id="searchGameInput" placeholder="Search..." onkeypress="keyPressSteamSearch(event)">

                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" tabindex="-1"><img src="../assets/Search_Icon.png" height=20></button>
                </div>
            </div>
            <div class="my-2 search-result">
                <table id="searchResultTable" class="table table-hover">            
                    <span id="searchPlaceholder" class='m-5 text-muted hide'>Fetching game list...</span>
                </table>
            </div>
        `
    },

    QuickSearchTable: (gameList) => {
        let html = "";
        gameList.forEach(game => {
            html += `
                    <tr>
                        <td><img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg" width="${searchImageSize}" height="${searchImageSize * (215/460)}" onerror="this.onerror=null;this.src='https://cdn.akamai.steamstatic.com/steam/apps/0/header.jpg';"></td>
                        <td>${game.name}</td>
                    </tr>
            `
        })
        return html;
    }
}