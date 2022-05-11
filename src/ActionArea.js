import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

import {startPlay, pickPlay, returnTickets} from './lib';
import {getPlayer} from './boardutil'


function PickPlayType(props) {
    const {board, playerID} = props;
    return (
        <div>
            What would you like to do?
            <button
              type="submit"
              onClick={()=>{pickPlay(playerID, board.boardID, "drawTickets")}}>
              Draw Tickets
            </button>
            <button
              type="submit"
              disabled={board.round === 1 ? true : false}
              onClick={()=>{pickPlay(playerID, board.boardID, "drawCards")}}>
              Draw Cards
            </button>
            <button
              type="submit"
              disabled={board.round === 1 ? true : false}
              onClick={()=>{pickPlay(playerID, board.boardID, "buildTracks")}}>
              Build Tracks
            </button>
        </div>
    )
}

function ReturnTickets(props) {
    const [errorMessage, setErrorMessage] = useState(null);
    const {board, playerID} = props;
    const currentPlayer = getPlayer(board);
    const [ticketList, setTicketList] = useState([])


    useEffect(()=>{
        const selectableTickets = currentPlayer.drawnTickets.map(ticket=>{
            return {...ticket, selected:false}
        })
        setTicketList(selectableTickets);
    },[currentPlayer])

    const handleTicketSelection = (i) => (event) => {
        const newTicketList = [...ticketList];
        newTicketList[i].selected = !newTicketList[i].selected;
        setTicketList(newTicketList);
    }


    const handleReturnTickets = () =>{
        const maxTickets = board.round === 1 ? 1 : 2;

        const returnTicketIds = ticketList.filter(ticket=>ticket.selected).map(ticket=>ticket.ticketID);
        console.log("...", returnTicketIds)

        if(returnTicketIds.length > maxTickets) {
            setErrorMessage("You can return only " + maxTickets + " ticket(s)...")
        } else {
            returnTickets(playerID, board.boardID, returnTicketIds)
        }
    }

    return (
        <div>

            <div style={{color:"red"}}>
                {errorMessage}
            </div>


            Select the tickets to return:
            {
                ticketList && ticketList.length > 0 && (
                    <div>
                        {ticketList.map((ticket, index)=>{
                        return (
                            <div key={index}>
                                Source: {ticket.source}
                                <br/>
                                Destination:{ticket.destination}
                                <br/>
                                Points: {ticket.value}

                                <div class="checkbox checkbox-circle checkbox-color-scheme">
                                    <label class="checkbox-checked">
                                        <input type="checkbox" value={ticket.ticketID} checked={ticket.selected} onChange={handleTicketSelection(index)}/> <span class="label-text"></span>
                                    </label>
                                </div>

                            </div>
                        )
                        })
                    }
                    </div>
                )
            }


            <button
              type="submit"
              onClick={()=>{handleReturnTickets()}}>
              Return Tickets
            </button>
        </div>
    )
}


function PlayActions(props) {
    const {board, playerID} = props;

    if(board.currentPlayType == null) {
        return (<PickPlayType board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "drawTickets") {
        //show drawn tickets and ask the user to return 1 or 2 ticktes.
        return (<ReturnTickets board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "drawCards") {
        //ask the user to pick one of the open five cards... and select.
    } else if(board.currentPlayType === "buildTracks") {
        //show a way to pick open track and select cards needed and submit.
    }
    return null;
}

function PlayStatus(props) {
    const {board} = props;
    const {currentPlayerID} = board;
    const currentPlayer = getPlayer(board);
    return (
        <div>
            <div>
                Current Palyer : {currentPlayer.playerName}
            </div>
            <div>
                Play Type : {board.currentPlayType != null ? board.currentPlayType : "Picking play type"}
            </div>


        </div>
    )
}

function Play(props) {
    const {board, playerID} = props;
    const {currentPlayerID} = board;

    if(board.currentPlayerID === playerID) {
        return (
            <div>
                It is your turn to play.
                <PlayActions board={board} playerID={playerID}/>
            </div>
        )
    } else{
        return (
            <PlayStatus board={board}/>
        )
    }
}


function Winner(props) {
    const {board, playerID} = props;
    return (
        <div>
            Dispaly rankings of players by points...
        </div>
    )


}


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
                      <Play board={board} playerID={playerID}/>
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
