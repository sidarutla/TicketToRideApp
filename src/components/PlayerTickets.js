
import Grid from '@mui/material/Grid';

import {getPlayer} from '../boardutil'

function PlayerTickets(props) {
    const {board, playerID} = props;
    const thePlayer = getPlayer(board, playerID);

    if(!thePlayer) {
        return null;
    }


    return (
        <Grid item container xs={12} direction="row" style={{paddingTop:"30px"}}>
            <Grid item xs={12}>
                Your Tickets:
            </Grid>
            <Grid item container xs={12} justifyContent="center">
            {
                thePlayer.tickets.map((ticket, index)=>{
                return (
                    <Grid item key={index} xs={12}>
                        {ticket.source} - {ticket.destination}: {ticket.value}
                    </Grid>
                )
                })
            }
            </Grid>
        </Grid>
    )
}

export default PlayerTickets;
