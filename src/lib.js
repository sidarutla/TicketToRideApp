
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

export const startPlay = async (playerId, boardId) => {
    return new Promise((resolve, error) => {
        BoardAPI.put("/boards/" + boardId + "/players/" + playerId + "/start").then(
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
