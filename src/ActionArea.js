import React from 'react';

import Grid from '@mui/material/Grid';

import {startPlay} from './lib';

import PlayerTickets from './components/PlayerTickets';
import PlayerCards from './components/PlayerCards';
import Cards from './components/Cards';
import Play from './components/Play';
import Winner from './components/Winner';

function ActionArea(props) {

    const {board, playerID} = props;

    return (
      <Grid container justifyContent="flex-start" spacing={2} direction="column">

          <Grid item>
          {
              board.gameState === "initializing" &&
              (
                  <div>Waiting for players to join</div>
              )
          }
          {
              board.gameState === "initializing" && board.owningPlayerID === playerID &&
              (
                  <button
                    type="submit"
                    disabled={board.players.length < 2 ? true : false}
                    onClick={()=>{
                    startPlay(playerID, board.boardID)
                    }}>Start</button>
                )
          }

          {
              board.gameState === "started" && (
                  <div>
                      <Cards board={board} playerID={playerID}/>
                  </div>
              )
          }


          {
              board.gameState === "started" && (
                  <div>
                      <Play board={board} playerID={playerID}/>
                  </div>
              )
          }
          {
              board.gameState === "started" && (
                  <div>
                      <PlayerTickets
                          board={board}
                          onFlipTicket={props.onFlipTicket}
                          ticketsState={props.ticketsState}
                          playerID={playerID}/>
                  </div>
              )
          }
          {
              board.gameState === "started" && (
                  <div>
                      <PlayerCards board={board} playerID={playerID}/>
                  </div>
              )
          }

          {
              board.gameState === "finished" && (
                  <Winner board={board} playerID={playerID}/>
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
