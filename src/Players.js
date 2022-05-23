import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Item from './Item';
import {getPlayer} from './boardutil'

function Player(props) {
    const {player, playerID, owningPlayerID, currentPlayerID} = props;

    const styles = {
        playerName:{
            color:"black",
            textDecoration: currentPlayerID === player.playerID ? "underline" : "",
            fontWeight: currentPlayerID === player.playerID ? "bold" : "",
        }
    };

    return(
        <Grid item container xs={4} sm={2} justifyContent="center">
            <Grid item xs={12} container style={{width:'100%', minHeight:"20px", backgroundColor:player.playerColor}}>
            </Grid>
            <Item style={{width:"100%"}}>
                <Grid container justifyContent="center">
                    <Grid container justifyContent="center">
                        <Grid>
                            <Typography variant="h5" style={styles.playerName}>
                                {player.playerName.toUpperCase()} {player.playerID === playerID && "*"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container justifyContent="flex-start">
                    <Grid container>
                    Tracks Left: {player.tracks}
                    </Grid>
                    <Grid container>
                    Points: {player.score}
                    </Grid>
                </Grid>

            </Item>
        </Grid>

    )
}


function Players(props) {
    const {board, playerID} = props;
    return (
        <Grid container item xs={12} justifyContent="center" spacing={2} style={{paddingTop:"10px", paddingBottom:"10px"}}>
        {
            board.players.map((player, index)=>{
                return (
                    <Player
                        owningPlayerID={board.owningPlayerID}
                        player={player}
                        playerID={playerID}
                        currentPlayerID={board.currentPlayerID}
                        key={index}/>
                )
            })
        }
        </Grid>
    )
}

export default Players;
