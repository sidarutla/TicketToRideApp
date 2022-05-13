
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
        <Grid item container xs={12} justifyContent="flex-start" style={{paddingTop:"30px"}}>
            Your Cards:
            <Grid item container xs={12} justifyContent="flex-start">
                {
                    Object.keys(cardsCountByColor).map((key, index)=>{
                        const color = key === "any" ? "white" : key;
                        return (
                            <Grid item key={index} xs={12} container>
                                <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:color}}></div>
                                <div>{key !== "any" ? key : "Locomotive"} {cardsCountByColor[key]}</div>
                            </Grid>

                        )
                    })
                }
            </Grid>

        </Grid>
    )
}

export default PlayerCards;
