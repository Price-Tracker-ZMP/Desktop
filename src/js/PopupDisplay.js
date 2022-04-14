module.exports = {

    gameDetailDisplay: (game) => {
        return game.name;
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