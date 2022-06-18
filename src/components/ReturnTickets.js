import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import { getCurrentPlayer } from '../boardutil'
import { returnTickets } from '../lib';


const ReturnTicketsDialog = (props) => {
    const { tickets } = props;


    const returnTickets = tickets.filter(ticket => ticket.selected);

    const renderReturnTickets = () => {
        if (returnTickets.length === 0) {
            return (
                <DialogContentText id="alert-dialog-description">
                    You are not returning any tickets. Are you sure you want to continue?
                </DialogContentText>
            )
        } else {
            return (
                <div>
                    <DialogContentText id="alert-dialog-description">
                        You are returning the following tickets. Are you sure you want to continue?
                    </DialogContentText>
                    <ul>
                        {
                            returnTickets.map((ticket, index) => {
                                return (
                                    <li key={index}>{ticket.source + " - " + ticket.destination + " (" + ticket.value + ")"}</li>
                                )
                            })
                        }
                    </ul>

                </div>
            )
        }
    }

    return (
        <Grid>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>

                <DialogContent>
                    {renderReturnTickets()}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={props.onClose} autoFocus color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={props.onConfirm} color="primary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}



function ReturnTickets(props) {

    const [confirmReturnTicketsOpen, setConfirmReturnTicketsOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    const { board, playerID } = props;
    const currentPlayer = getCurrentPlayer(board);
    const [ticketList, setTicketList] = useState([])

    useEffect(() => {
        const selectableTickets = currentPlayer.drawnTickets.map(ticket => {
            return { ...ticket, selected: false }
        })
        setTicketList(selectableTickets);
    }, [currentPlayer])

    const handleTicketSelection = (i) => (event) => {
        const newTicketList = [...ticketList];
        newTicketList[i].selected = event.target.checked
        setTicketList(newTicketList);
    }


    const handleReturnTickets = () => {
        setErrorMessage(null);
        const maxTickets = board.round === 1 ? 1 : 2;
        const returnTickets = ticketList.filter(ticket => ticket.selected);

        if (returnTickets.length > maxTickets) {
            setErrorMessage("You can return only " + maxTickets + " ticket(s)...")
        } else {
            setConfirmReturnTicketsOpen(true);
        }
    }

    const handleReturnTicketsClose = () => {
        setConfirmReturnTicketsOpen(false);
    }

    const handleReturnTicketsConfirm = () => {
        setConfirmReturnTicketsOpen(false);
        const returnTicketIds = ticketList.filter(ticket => ticket.selected).map(ticket => ticket.ticketID);
        returnTickets(playerID, board.boardID, returnTicketIds)
    }


    return (
        <Grid container justifyContent={"center"}>

            <Grid style={{ color: "red" }}>
                {errorMessage}
            </Grid>

            <Grid item container justifyContent={"center"}>
                Select the tickets to return:
            </Grid>



            {
                ticketList && ticketList.length > 0 && (
                    <Grid item container xs={12} justifyContent="center" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                        {
                            ticketList.map((ticket, index) => {
                                const ticketLabel = ticket.source + " - " + ticket.destination + " (" + ticket.value + ")"
                                return (
                                    <Grid item container key={index} justifyContent={"center"}>
                                        <Grid item>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name={"selectedTickets"}
                                                        value={ticket.ticketID}
                                                        onChange={handleTicketSelection(index)}
                                                    />}
                                                label={ticketLabel} labelPlacement="end" />
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )
            }


            <Grid item xs={12} container justifyContent="center">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary"
                        onClick={() => { handleReturnTickets() }}>
                        Return Tickets
                    </Button>
                </Stack>
            </Grid>


            <ReturnTicketsDialog
                tickets={ticketList}
                open={confirmReturnTicketsOpen}
                onClose={handleReturnTicketsClose}
                onConfirm={handleReturnTicketsConfirm} />
        </Grid>
    )
}


export default ReturnTickets;
