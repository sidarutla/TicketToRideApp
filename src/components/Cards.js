import React from 'react';

import Grid from '@mui/material/Grid';

function Cards(props) {
    const {board} = props;
    const {fiveOpenCards} = board;
    return (
        <div>
            Open cards:
            {
                fiveOpenCards.map((card, index)=>{
                    const cardColor = card.gameColor === "any" ? "white" : card.gameColor;
                    const cardLabel = card.gameColor === "any" ? "Locomotive" : card.gameColor;

                    return (
                        <Grid item container xs={12} key={index}>
                            <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:cardColor}}></div>
                            <div>{cardLabel}</div>
                        </Grid>
                    )
                })
            }
        </div>
    )
}


export default Cards;
