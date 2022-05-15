import React from 'react';


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Winner(props) {
    const {board, playerID} = props;
    const {players} = board;

    const leaderBoard = players.sort((gp1, gp2)=>{
        return (gp1 - gp2);
    })

    const maxFontSize = 50;

    return (
        <Grid item container xs={12} justifyContent="center">

            <Grid item xs={12}>
                Game is Finished.
            </Grid>

            <Grid item container xs={12} justifyContent="center">
            {
                leaderBoard.map((gamePlayer, index)=>{
                    const rank = index+1;
                    const fontSize = maxFontSize/rank;
                    return (
                        <Grid item container xs={12} key={index} justifyContent="center" alignItems={"center"}>
                            <Typography variant={"h1"} style={{fontSize:fontSize}}>
                                {gamePlayer.playerName}
                            </Typography>
                            <Typography variant={"p"}>
                                (Points: {gamePlayer.score})
                            </Typography>
                        </Grid>
                    )
                })
            }
        </Grid>
        </Grid>
    )
}

export default Winner;
