import React, {useEffect, useState} from 'react';


import Grid from '@mui/material/Grid';

import Item from './Item';

function Player(props) {
    const {player} = props;
    return(

        <Grid item container xs={12} lg={3}>
            <Item style={{width:'100%'}}>
            <Grid container>
            {player.playerName}
            <br/>
            Points {0}
            <br/>
            Tracks Built : Calgery-Houston
            </Grid>
            </Item>
        </Grid>

    )
}


function Players(props) {
    const {players} = props;
    return (
        <Grid container xs={12}>
        {
            players.map((player, index)=>{
                return (
                    <Player player={player} key={index}/>
                )
            })
        }
        </Grid>
    )
}

export default Players;
