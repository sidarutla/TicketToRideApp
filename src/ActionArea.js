import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import {startPlay} from './lib';

import PlayerTickets from './components/PlayerTickets';
import PlayerCards from './components/PlayerCards';
import Cards from './components/Cards';
import Play from './components/Play';
import LeaderBoard from './components/LeaderBoard';

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

                <Grid item xs={12} container justifyContent="center">
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" color="primary"
                            disabled={board.players.length < 2 ? true : false}
                            onClick={() => { startPlay(playerID, board.boardID) }}
                        >
                            Start
                        </Button>
                    </Stack>
                </Grid>

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
                      <Cards board={board} playerID={playerID}/>
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
                  <LeaderBoard board={board} playerID={playerID}/>
              )
          }
        </Grid>

        <Grid item container justifyContent={"center"}>
            <Stack direction="row" spacing={2}>

                <Button variant="outlined" color="secondary"
                    disabled={board.players.length < 2 ? true : false}
                    onClick={()=>{props.onLeaveBoard()}}
                >
                    Leave
                </Button>
            </Stack>            
            
        </Grid>

      </Grid>
    )

}

export default ActionArea;
