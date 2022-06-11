import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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

            <Grid item xs={12} container justifyContent="center">
                <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary"
                    onClick={()=>{handlePickPlayType(playerID, board.boardID, "drawTickets")}}>
                    Draw Tickets
                </Button>

                <Button variant="contained" color="primary"
                    disabled={board.round === 1 ? true : false}
                    onClick={()=>{handlePickPlayType(playerID, board.boardID, "drawCards")}}>
                    Draw Cards
                </Button>

                <Button variant="contained" color="primary"
                    disabled={board.round === 1 ? true : false}
                    onClick={()=>{handlePickPlayType(playerID, board.boardID, "buildTracks")}}>
                    Build Track
                </Button>

                </Stack>
            </Grid>
        </Grid>
    )
}

export default PickPlayType;
