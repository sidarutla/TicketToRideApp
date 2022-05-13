


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
