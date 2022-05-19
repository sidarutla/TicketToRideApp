import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {getPlayer} from '../boardutil'

function PlayerTickets(props) {
    const {board, playerID, onFlipTicket, ticketsState} = props;
    const thePlayer = getPlayer(board, playerID);

    if(!thePlayer) {
        return null;
    }


    return (
        <Grid item container xs={12} direction="row" style={{paddingTop:"30px"}}>
            <Grid item xs={12}>
                Your Tickets:
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={2}>
            {
                thePlayer.tickets.map((ticket, index)=>{
                    if(ticketsState[ticket.ticketID]) {
                        return (
                            <Grid item key={index}
                            onClick={()=>handleFlipTicket(ticket)}>
                            <Paper style={{padding:"10px"}}>
                            {ticket.source}
                            <br/>
                            {ticket.destination}
                            <br/>
                            ({ticket.value})
                            </Paper>
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item key={index} onClick={()=>props.onFlipTicket(ticket.ticketID)}>
                                <img src={"ticket.jpg"} width="40"/>
                            </Grid>
                        )
                    }
                })
            }
            </Grid>
        </Grid>
    )
}

export default PlayerTickets;
