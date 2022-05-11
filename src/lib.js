
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


export const getBoard = async (boardID) => {
    return new Promise((resolve, error) => {
        BoardAPI.get("/boards/" + boardID).then(
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

export const createBoard = async (playerID, boardName) => {

    return new Promise((resolve, error) => {
        const values = {
            boardName,
            playerID
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

export const joinBoard = async (playerID, boardID) => {
    return new Promise((resolve, error) => {
        BoardAPI.post("/boards/" + boardID + "/players/" + playerID).then(
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

export const startPlay = async (playerID, boardID) => {
    return new Promise((resolve, error) => {
        BoardAPI.put("/boards/" + boardID + "/players/" + playerID + "/start").then(
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


export const pickPlay = async (playerID, boardID, playType) => {
    return new Promise((resolve, error) => {
        BoardAPI.put("/boards/" + boardID + "/players/" + playerID + "/play/" + playType).then(
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

export const returnTickets = async (playerID, boardID, ticketIDs) => {
    return new Promise((resolve, error) => {
        BoardAPI.put("/boards/" + boardID + "/players/" + playerID + "/play/return-tickets/" + ticketIDs.join()).then(
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


export const createPlayer = async (name) => {
    return new Promise((resolve, error) => {
        BoardAPI.post("/players/" + name).then(
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


export const getPlayer = async (playerID) => {
    return new Promise((resolve, error) => {
        BoardAPI.get("/players/" + playerID).then(
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
