const imageSize = 180;


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
            <input type="text" class="form-control" id="search" placeholder="Search..."">

            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" tabindex="-1"><img src="../assets/Search_Icon.png" height=20></button>
            </div>
        </div>
        `
    }
}