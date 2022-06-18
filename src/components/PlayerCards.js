
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';

import { getPlayer, getGroupedAndSortedCardArray, getCardsCountByColor } from '../boardutil'

function PlayerCards(props) {

    const [currentCards, setCurrentCards] = useState({});
    const [redraw, setRedraw] = useState(false);

    const { board, playerID } = props;
    const thePlayer = getPlayer(board, playerID);
    const { cards = [] } = thePlayer ? thePlayer : {};

    useEffect(() => {
        const newCards = getCardsCountByColor(cards);
        const oldColors = Object.keys(currentCards);
        const colorsToBeRemoved = [];
        for (var i = 0; i < oldColors.length; i++) {
            const oldColor = oldColors[i];
            const oldCount = currentCards[oldColor];
            const newCount = newCards[oldColor];
            if (oldCount && newCount && oldCount !== newCount) {
                colorsToBeRemoved.push(oldColor);
            }
        }

        if (colorsToBeRemoved.length > 0) {
            const tempCards = { ...currentCards }
            colorsToBeRemoved.forEach((color) => {
                delete tempCards[color];
            })
            setCurrentCards(tempCards);
            setRedraw(true);
        } else {
            setCurrentCards(newCards);
        }
    }, [cards])


    useEffect(() => {
        if (redraw === true) {
            setRedraw(false);
            const newCards = getCardsCountByColor(cards);
            setCurrentCards(newCards);
        }
    }, [redraw])


    if (!thePlayer) {
        return null;
    }

    return (
        <Grid item container xs={12} direction="row" style={{ paddingTop: "30px" }}>
            <Grid item xs={12}>
                Your cards:
            </Grid>

            <Grid item container xs={12} justifyContent="center" spacing={2}>
                {
                    getGroupedAndSortedCardArray(currentCards).map((cardGroup) => {
                        return (
                            <Grow in={true} timeout={1000} key={cardGroup.color}>
                                <Grid item>
                                    <img src={cardGroup.color + ".jpg"} width="40" />
                                    <Grid>
                                        {cardGroup.count}
                                    </Grid>
                                </Grid>
                            </Grow>
                        )
                    })
                }
            </Grid>


        </Grid>
    )
}

export default PlayerCards;
