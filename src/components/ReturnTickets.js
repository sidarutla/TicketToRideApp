import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import {getCurrentPlayer} from '../boardutil'

import {returnTickets} from '../lib';

function ReturnTickets(props) {
    const [errorMessage, setErrorMessage] = useState(null);
    const {board, playerID} = props;
    const currentPlayer = getCurrentPlayer(board);
    const [ticketList, setTicketList] = useState([])

    useEffect(()=>{
        const selectableTickets = currentPlayer.drawnTickets.map(ticket=>{
            return {...ticket, selected:false}
        })
        setTicketList(selectableTickets);
    },[currentPlayer])

    const handleTicketSelection = (i) => (event) => {
        const newTicketList = [...ticketList];
        newTicketList[i].selected = event.target.checked
        setTicketList(newTicketList);
    }


    const handleReturnTickets = () =>{
        const maxTickets = board.round === 1 ? 1 : 2;
        const returnTicketIds = ticketList.filter(ticket=>ticket.selected).map(ticket=>ticket.ticketID);

        if(returnTicketIds.length > maxTickets) {
            setErrorMessage("You can return only " + maxTickets + " ticket(s)...")
        } else {
            let message = "";
            if(returnTicketIds.length === 0) {
                message = "Are you sure you don't want to return any tickets?"
            } else {
                message = "Are you sure you  want to return " + returnTicketIds.length + " ticket(s)?"
            }
            let result = confirm(message);
            if(result) {
                returnTickets(playerID, board.boardID, returnTicketIds)
            }
        }
    }

    return (
        <Grid container justifyContent={"center"}>

            <Grid style={{color:"red"}}>
                {errorMessage}
            </Grid>

            <Grid item container justifyContent={"center"}>
                Select the tickets to return:
            </Grid>



            {
                ticketList && ticketList.length > 0 && (
                    <Grid item container xs={12} justifyContent="center" style={{paddingTop:"20px", paddingBottom:"20px"}}>
                        {
                            ticketList.map((ticket, index)=>{
                                const ticketLabel = ticket.source + " - " + ticket.destination + " (" + ticket.value + ")"
                            return (
                                <Grid item container key={index} justifyContent={"center"}>
                                    <Grid item>                                 
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    name={"selectedTickets"}
                                                    value={ticket.ticketID}
                                                    onChange={ handleTicketSelection(index)}
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
                    onClick={()=>{handleReturnTickets()}}>
                    Return Tickets
                </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}


export default ReturnTickets;
