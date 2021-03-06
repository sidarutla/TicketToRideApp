import React from 'react';

import Grid from '@mui/material/Grid';

function Cards(props) {
    const {board, playerID} = props;
    const {fiveOpenCards, currentPlayerID, currentPlayType} = board;

    if(playerID === currentPlayerID && currentPlayType == "drawCards") {
        return null;
    } else {
        return (
            <Grid item container xs={12} direction="row" style={{paddingTop:"30px"}}>
                <Grid item xs={12}>
                    Open cards:
                </Grid>
                <Grid item container xs={12} justifyContent="center" spacing={2}>
                {
                    fiveOpenCards.map((card, index)=>{
                        return (
                            <Grid item key={index}>
                                {
                                    card != null ? (<img src={card.gameColor + ".jpg"} width="40"/>) : null
                                }
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Grid>
        )
    }
}
export default Cards;
