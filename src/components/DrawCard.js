
import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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
                            {
                                card != null ? (
                                    <div>
                                    <img src={card.gameColor + ".jpg"} width="40"/>
                                    <Grid>
                                    {card.gameColor === "any" ? "Loco" : card.gameColor.charAt(0).toUpperCase() + card.gameColor.slice(1) }
                                    </Grid>
                                    </div>
                                ) : null
                            }
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

            <Grid item xs={12} container justifyContent="center">
                <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="secondary"
                    onClick={()=>{handleResetPlayType()}}>
                    Change Play Type
                </Button>
                </Stack>
            </Grid>

        </Grid>
    )
}

export default DrawCard;
