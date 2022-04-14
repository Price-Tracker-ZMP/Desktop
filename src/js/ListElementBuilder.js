const imageSize = 120;

let listIndex = 0;
let steamID = 0;
let gameTitle = "Title";
let originalPrice = 0;
let discountPrice = 0;
let discountPercent = 0;

module.exports = {
    Reset: () => {    
        steamID = 0;
        gameTitle = "Title";
        originalPrice = 0;
        discountPrice = 0;
        discountPercent = 0;
    },

    setListIndex: (index) => {
        listIndex = index;
    },

    setSteamID: (id) => {
        steamID = id;
    },

    setGameTitle: (title) => {
        gameTitle = title;
    },

    setPrice: (price) => {
        originalPrice = price;
    },

    setDiscount: (price, percent) => {
        discountPrice = price;
        discountPercent = percent;
    },

    GenerateListElement: () => {
        let html = `
        <tr class="d-flex align-items-center" onclick="OpenGameDetails(${listIndex})">
        <td>              
            <img src="https://cdn.akamai.steamstatic.com/steam/apps/${steamID}/header.jpg" width="${imageSize}" height="${imageSize * (215/460)}"/>
        </td>

        <td class="col">                          
            <span class="game-title">${gameTitle}</span>              
        </td>`

        if (discountPercent == 0) {
            html += `
            <td class="col mr-3 d-flex align-items-center flex-row-reverse">                                                  
                <div class="priceDisplay">${FormatCurrency(originalPrice)}</div>                
            </td>
            </tr>`
        }
        else
        {
            html += `
            <td class="col mr-3 d-flex align-items-center flex-row-reverse">              
                <div class="priceDisplay">
                    <div class="priceDisplay originalPrice text-muted">${FormatCurrency(originalPrice)}</div><br>
                    <div class="priceDisplay">${FormatCurrency(discountPrice)}</div>
                </div>
                <div class="discountPercent">
                -${discountPercent}%
                </div>
            </td>
            </tr>`
        }
        return html;
    }
}

function FormatCurrency(price) {
    return Intl.NumberFormat(`pl-PL`, { style: `currency`, currency: `PLN`}).format(price/100);
}