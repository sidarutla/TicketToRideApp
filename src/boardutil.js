


export const getPlayer = (board) => {
    return board.players.find(player=>player.playerID === board.currentPlayerID)
}
