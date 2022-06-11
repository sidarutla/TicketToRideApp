import Grid from '@mui/material/Grid';

import {pickPlay} from '../lib';

function PickPlayType(props) {
    const {board, playerID} = props;
    const {round} = board;

    const handlePickPlayType = (playerID, boardID, playType) => {
        if(playType === "drawTickets") {
            if(round !== 1) {
                let result = confirm('Are you sure you want to draw additional tickets?');
                if(result) {
                    pickPlay(playerID, boardID, playType);
                }
            } else {
                pickPlay(playerID, boardID, playType);
            }
        } else {
            pickPlay(playerID, boardID, playType);
        }
    }

    return (
        <Grid item container xs={12} justifyContent="center" style={{paddingTop:"10px"}}>
            <Grid item xs={12}>
                What would you like to do?
            </Grid>

            <Grid item container xs={12} spacing={1} justifyContent="center">
                <Grid item>
                <button
                  type="submit"
                  onClick={()=>{handlePickPlayType(playerID, board.boardID, "drawTickets")}}>
                  Draw Tickets
                </button>
                </Grid>
                <Grid item>
                <button
                  type="submit"
                  disabled={board.round === 1 ? true : false}
                  onClick={()=>{handlePickPlayType(playerID, board.boardID, "drawCards")}}>
                  Draw Cards
                </button>
                </Grid>
                <Grid item>
                <button
                  type="submit"
                  disabled={board.round === 1 ? true : false}
                  onClick={()=>{handlePickPlayType(playerID, board.boardID, "buildTracks")}}>
                  Build Tracks
                </button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PickPlayType;
