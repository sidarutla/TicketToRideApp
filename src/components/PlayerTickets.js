
import Grid from '@mui/material/Grid';

import {getPlayer} from '../boardutil'

function PlayerTickets(props) {
    const {board, playerID} = props;
    const thePlayer = getPlayer(board, playerID);

    if(!thePlayer) {
        return null;
    }


    return (
        <Grid item container xs={12} justifyContent="flex-start" style={{paddingTop:"30px"}}>
            Your Tickets:
            {
                thePlayer.tickets.map((ticket, index)=>{
                return (
                    <Grid item container key={index} xs={12}>
                        {ticket.source} - {ticket.destination}: {ticket.value}
                    </Grid>
                )
                })
            }
        </Grid>
    )
}

export default PlayerTickets;
