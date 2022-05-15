import React from 'react';

import Grid from '@mui/material/Grid';

import Item from './Item';
import {getPlayer} from './boardutil'

function Player(props) {
    const {player, playerID, owningPlayerID} = props;

    return(
        <Grid item container xs={3} lg={3} justifyContent="center">
            <Item style={{width:'100%', backgroundColor:player.playerColor}}>
                <Grid container justifyContent="center">
                    <Grid container justifyContent="center">
                    {player.playerName} {player.playerID === playerID && "(you)"} {player.playerID === owningPlayerID && " - Host"}
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
        <Grid container item xs={12}>
        {
            board.players.map((player, index)=>{
                return (
                    <Player
                        owningPlayerID={board.owningPlayerID}
                        player={player}
                        playerID={playerID}
                        key={index}/>
                )
            })
        }
        </Grid>
    )
}

export default Players;
