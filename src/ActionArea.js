import React, {useEffect, useState} from 'react';

import Grid from '@mui/material/Grid';

import {startPlay} from './lib';

function ActionArea(props) {

    const {board, playerId} = props;

    return (
      <Grid container justifyContent="center" spacing={2}>
          <Grid item>

          {
              board.gameState === "initializing" && board.owningPlayerId === playerId &&
              (
                  <button
                    type="submit"
                    disabled={board.players.length < 2 ? true : false}
                    onClick={()=>{
                    startPlay(playerId, board.boardId)
                    }}>Start</button>
                )
          }
        </Grid>
          <Grid item>
          <button type="submit" onClick={()=>{props.onLeaveBoard()}}>Leave</button>
          </Grid>

      </Grid>
    )

}

export default ActionArea;
