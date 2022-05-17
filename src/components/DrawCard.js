
import React, {useState} from 'react';

import Grid from '@mui/material/Grid';

import {drawCard, resetPlayType} from '../lib';

function DrawCard(props) {
    const {board, playerID} = props;

    const handleDrawCard = (index) =>{
        if(index < 0) {
            return;
        }
        drawCard(playerID, board.boardID, index);
    }

    const handleResetPlayType = () =>{
        resetPlayType(playerID, board.boardID);
    }

    const {fiveOpenCards} = board;

    return (
        <Grid item container xs={12} direction="row">
            <Grid item xs={12}>
                Click on a card to draw:
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={2}>
            {
                fiveOpenCards.map((card, index)=>{
                    return (
                        <Grid item key={index} onClick={()=>handleDrawCard(index)}>
                            <img src={card.gameColor + ".jpg"} width="40"/>
                            <Grid>
                            {card.gameColor === "any" ? "Loco" : card.gameColor.charAt(0).toUpperCase() + card.gameColor.slice(1) }
                            </Grid>
                        </Grid>
                    )
                })
            }
            {
                <Grid item onClick={()=>handleDrawCard(5)}>
                    <img src={"card.jpg"} width="40"/>
                    <Grid>
                    {"Cards Pile"}
                    </Grid>
                </Grid>
            }
            </Grid>

            <Grid item xs={12}>
                <button
                  type="submit"
                  onClick={()=>{handleResetPlayType()}}>
                  Change Play Type
                </button>
            </Grid>

        </Grid>
    )
}

export default DrawCard;
