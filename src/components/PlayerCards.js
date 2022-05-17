
import Grid from '@mui/material/Grid';

import {getPlayer, getCardsCountByColor} from '../boardutil'

function PlayerCards(props) {
    const {board, playerID} = props;
    const thePlayer = getPlayer(board, playerID);
    if(!thePlayer) {
        return null;
    }
    const cardsCountByColor = getCardsCountByColor(thePlayer.cards);
    return (
        <Grid item container xs={12} direction="row" style={{paddingTop:"30px"}}>
            <Grid item xs={12}>
                Your cards:
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={2}>
                {
                    Object.keys(cardsCountByColor).map((key, index)=>{
                        return (
                            <Grid item key={index}>
                                <img src={key + ".jpg"} width="40"/>
                                <Grid>
                                {cardsCountByColor[key]}
                                </Grid>
                            </Grid>

                        )
                    })
                }
            </Grid>
        </Grid>
    )
}

export default PlayerCards;
