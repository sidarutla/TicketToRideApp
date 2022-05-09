import React, {useEffect, useState} from 'react';


import Grid from '@mui/material/Grid';

import Item from './Item';

function Player(props) {
    const {player, owningPlayerId, playerId} = props;

    return(

        <Grid item container xs={3} lg={3} justifyContent="center">
            <Item style={{width:'100%', backgroundColor:player.playerColor}}>

                <Grid container justifyContent="center">
                    <Grid container justifyContent="center">
                    {player.playerName} {player.playerId === playerId && "(you)"} {player.playerId === owningPlayerId && " - Host"}
                    </Grid>
                </Grid>

                <Grid item container justifyContent="flex-start">

                    <Grid container>
                    Tracks Left: 45
                    </Grid>
                    <Grid container>
                    Points: 0
                    </Grid>
                    <Grid container justifyContent="flex-start">
                    Tracks Built : Calgery-Houston
                    </Grid>

                </Grid>

            </Item>
        </Grid>

    )
}


function Players(props) {
    const {players, owningPlayerId, playerId} = props;
    return (
        <Grid container xs={12}>
        {
            players.map((player, index)=>{
                return (
                    <Player player={player} owningPlayerId={owningPlayerId} playerId={playerId} key={index}/>
                )
            })
        }
        </Grid>
    )
}

export default Players;
