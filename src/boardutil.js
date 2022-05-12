


export const getCurrentPlayer = (board) => {
    return board.players.find(player=>player.playerID === board.currentPlayerID)
}


export const getPlayer = (board, playerID) => {
    return board.players.find(player=>player.playerID === playerID)
}
