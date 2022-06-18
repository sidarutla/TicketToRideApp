


export const getCurrentPlayer = (board) => {
    return board.players.find(player=>player.playerID === board.currentPlayerID)
}


export const getPlayer = (board, playerID) => {
    return board.players.find(player=>player.playerID === playerID)
}


export const getCardsCountByColor = (cards) => {
    const cardsCountByColor = cards.reduce((map, card)=>{
        if(map[card.gameColor] != null) {
            map[card.gameColor] = map[card.gameColor] + 1;
        } else {
            map[card.gameColor] = 1;
        }
        return map;
    },{});
    return cardsCountByColor;
}


export const getGroupedAndSortedCardArray = (cardsCountByColor) => {
    const cardsArray = Object.keys(cardsCountByColor).map((key, index) =>{
        return {
            color:key,
            count:cardsCountByColor[key]
        }
    }).sort((group1, group2)=>{
        if (group1.color < group2.color) {
            return -1;
        }
        if (group1.color > group2.color) {
            return 1;
        }
        return 0;
    })

    return cardsArray;
}
