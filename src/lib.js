
import BoardAPI from './boardapi';

export const getBoards = async () => {
    return new Promise((resolve, error) => {
        BoardAPI.get("/boards").then(
            (boards)=>{
                if(boards) {
                    resolve(boards);
                } else {
                    error("null response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
      });
}


export const getBoard = async (boardId) => {
    return new Promise((resolve, error) => {
        BoardAPI.get("/boards/" + boardId).then(
            (board)=>{
                if(board) {
                    resolve(board);
                } else {
                    error("null response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
    });
}

export const createBoard = async (playerId, boardName) => {

    return new Promise((resolve, error) => {
        const values = {
            boardName,
            playerId
        }

        BoardAPI.post("/boards", values).then(
            (board)=>{
                if(board) {
                    resolve(board);
                } else {
                    error("No response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
    });
}

export const joinBoard = async (playerId, boardId) => {
    return new Promise((resolve, error) => {
        BoardAPI.post("/boards/" + boardId + "/players/" + playerId).then(
            (board)=>{
                if(board) {
                    resolve(board);
                } else {
                    error("No response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
    });
}

// export const createGame = (playerId, boardName) => {
//     let r = (Math.random() + 1).toString(36).substring(2);
//
//     const board = {
//         boardName: "Keerthi's Board",
//         boardId: "board2",
//         gameState: "Playing",
//         owningPlayerId: "keerthi",
//         playerId:"sid",
//         currentPlayerId: "sid",
//         players:[
//         ]
//     }
//     board.boardId = r;
//     board.boardName = boardName;
//
//     const player = {
//         playerId:"keerthi",
//         playerName:"Defautl Name",
//         playerColor:"yellow",
//     }
//     player.playerId = playerId;
//     board.players.push(player);
//     boards.push(board);
//     return board;
// }




// export function startGame(boardId) {
//     const board =  boards.find(board=>board.boardId === boardId);
//     if(board) {
//         board.gameState = "Started";
//         return board;
//     }
// }

// export function joinGame(playerId, boardId) {
//     const board = boards.find(board=>board.boardId === boardId);
//     if(board) {
//
//         const player = board.players.find(player=>player.playerId === playerId);
//         if(!player) {
//             const newPlayer = {
//                 playerId:"keerthi",
//                 playerName:"Defautl Name",
//                 playerColor:"yellow",
//             }
//             newPlayer.playerId = playerId;
//             board.players.push(newPlayer);
//         }
//         return board;
//     }
// }

export const createPlayer = async (playerName) => {
    return new Promise((resolve, error) => {
        BoardAPI.post("/players/" + playerName).then(
            (player)=>{
                if(player) {
                    resolve(player);
                } else {
                    error("null response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
    });
}


export const getPlayer = async (playerId) => {
    return new Promise((resolve, error) => {
        BoardAPI.get("/players/" + playerId).then(
            (player)=>{
                if(player) {
                    resolve(player);
                } else {
                    error("null response");
                }
            },
            (err) => {
                error(err);
            }
        ).catch(ex => {
            error(ex);
        });
    });
}
