import React, {useEffect, useState} from 'react';

import Grid from '@mui/material/Grid';

import {startPlay} from './lib';

function ActionArea(props) {

    const {board, playerId} = props;

    return (
      <Grid container>

          {
              board.gameState === "initializing" && board.owningPlayerId === playerId && (
                  <button
                    type="submit"
                    disabled={board.players.length < 2 ? true : false}
                    onClick={()=>{
                      startPlay(playerId, board.boardId)
                    }}>Start</button>)
          }

          <button type="submit" onClick={()=>{props.onLeaveBoard()}}>Leave</button>

      </Grid>
    )

}

export default ActionArea;
