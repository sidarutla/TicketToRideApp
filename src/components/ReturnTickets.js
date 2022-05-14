import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

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
        newTicketList[i].selected = !newTicketList[i].selected;
        setTicketList(newTicketList);
    }


    const handleReturnTickets = () =>{
        const maxTickets = board.round === 1 ? 1 : 2;

        const returnTicketIds = ticketList.filter(ticket=>ticket.selected).map(ticket=>ticket.ticketID);

        if(returnTicketIds.length > maxTickets) {
            setErrorMessage("You can return only " + maxTickets + " ticket(s)...")
        } else {
            returnTickets(playerID, board.boardID, returnTicketIds)
        }
    }

    return (
        <Grid>

            <Grid style={{color:"red"}}>
                {errorMessage}
            </Grid>

            <Grid>
                Select the tickets to return:
            </Grid>



            {
                ticketList && ticketList.length > 0 && (
                    <Grid item container xs={12} justifyContent="center" style={{paddingTop:"20px", paddingBottom:"20px"}}>
                        {
                            ticketList.map((ticket, index)=>{
                            return (
                                <Grid item container key={index}>
                                    <Grid item>
                                        <div class="checkbox checkbox-circle checkbox-color-scheme">
                                            <label class="checkbox-checked">
                                                <input type="checkbox" value={ticket.ticketID} checked={ticket.selected} onChange={handleTicketSelection(index)}/> <span class="label-text"></span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        {ticket.source} - {ticket.destination} : {ticket.value}
                                    </Grid>


                                </Grid>
                            )
                        })
                    }
                    </Grid>
                )
            }


            <button
              type="submit"
              onClick={()=>{handleReturnTickets()}}>
              Return Tickets
            </button>
        </Grid>
    )
}


export default ReturnTickets;
