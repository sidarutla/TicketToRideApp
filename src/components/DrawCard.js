
import React, {useState} from 'react';

import Grid from '@mui/material/Grid';

import {drawCard} from '../lib';

function DrawCard(props) {
    const {board, playerID} = props;
    const [cardIndex, setCardIndex] = useState(-1);

    const handleDrawCard = () =>{
        if(cardIndex < 0) {
            return;
        }
        drawCard(playerID, board.boardID, cardIndex);
        setCardIndex(-1);
    }

    const {fiveOpenCards} = board;

    return (
        <Grid item container xs={12} justifyContent="center">

            <Grid item container xs={12}>
                Select a card to draw:
            </Grid>

            <Grid item container xs={12} justifyContent="center">
            {
                fiveOpenCards.map((card, index)=>{
                    const cardColor = card.gameColor === "any" ? "white" : card.gameColor;
                    const cardLabel = card.gameColor === "any" ? "Locomotive" : card.gameColor;

                    return (
                        <Grid item container xs={12} key={index} justifyContent="flex-start">
                            <input type="radio" id={index} name={cardLabel} value={index} checked={index===cardIndex} onChange={()=>setCardIndex(index)}/>
                            <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:cardColor}}></div>
                            <label htmlFor={index}>{cardLabel}</label>

                        </Grid>
                    )
                })
            }
                <Grid item container xs={12} key={5} justifyContent="flex-start">
                    <input type="radio" id={"Pack"} name={"Pack"} value={5} checked={5===cardIndex} onChange={()=>setCardIndex(5)}/>
                    <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:"white"}}></div>
                    <label htmlFor={"Pack"}>{"Draw from pile"}</label>
                </Grid>

            </Grid>


            <Grid item container xs={12}>
                <button
                  type="submit"
                  disabled = {cardIndex < 0}
                  onClick={()=>{handleDrawCard()}}>
                  Draw the seleted card
                </button>
            </Grid>
        </Grid>
    )
}

export default DrawCard;
