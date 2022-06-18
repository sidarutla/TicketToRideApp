import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { pickPlay } from '../lib';

const DrawTicketsConfirmDialog = (props) => {
    return (
        <Grid>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to draw tickets? You won't be able to change play type after your draw tickets.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={props.onClose} autoFocus color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={props.onConfirm} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

function PickPlayType(props) {

    const [confirmDrawTicketsOpen, setConfirmDrawTicketsOpen] = useState(false);

    const { board, playerID } = props;
    const { round } = board;

    const handlePickPlayType = (playerID, boardID, playType) => {
        if (playType === "drawTickets") {
            if (round !== 1) {
                setConfirmDrawTicketsOpen(true);
            } else {
                pickPlay(playerID, boardID, playType);
            }
        } else {
            pickPlay(playerID, boardID, playType);
        }
    }

    const handleConfirmDrawTicketsClose = () =>{
        setConfirmDrawTicketsOpen(false);
    }

    const handleConfirmDrawTickets = () => {
        setConfirmDrawTicketsOpen(false);
        pickPlay(playerID, board.boardID, "drawTickets");
    }

    return (
        <Grid item container xs={12} justifyContent="center" style={{ paddingTop: "10px" }}>
            <Grid item xs={12}>
                What would you like to do?
            </Grid>

            <Grid item xs={12} container justifyContent="center">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary"
                        onClick={() => { handlePickPlayType(playerID, board.boardID, "drawTickets") }}>
                        Draw Tickets
                    </Button>

                    <Button variant="contained" color="primary"
                        disabled={board.round === 1 ? true : false}
                        onClick={() => { handlePickPlayType(playerID, board.boardID, "drawCards") }}>
                        Draw Cards
                    </Button>

                    <Button variant="contained" color="primary"
                        disabled={board.round === 1 ? true : false}
                        onClick={() => { handlePickPlayType(playerID, board.boardID, "buildTracks") }}>
                        Build Track
                    </Button>
                </Stack>
            </Grid>

            <DrawTicketsConfirmDialog open={confirmDrawTicketsOpen} onClose={handleConfirmDrawTicketsClose} onConfirm={handleConfirmDrawTickets}/>
        </Grid>
    )
}

export default PickPlayType;
