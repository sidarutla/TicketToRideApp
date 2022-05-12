import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

import {startPlay, pickPlay, returnTickets, drawCard} from './lib';
import {getCurrentPlayer, getPlayer} from './boardutil'


function PickPlayType(props) {
    const {board, playerID} = props;
    return (
        <Grid item container xs={12} justifyContent="center" style={{paddingTop:"10px"}}>
            <Grid item xs={12}>
                What would you like to do?
            </Grid>

            <Grid item xs={12} spacing={4}>
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
            </Grid>
        </Grid>
    )
}

function ReturnTickets(props) {
    const [errorMessage, setErrorMessage] = useState(null);
    const {board, playerID} = props;
    const currentPlayer = getCurrentPlayer(board);
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
        <Grid>

            <Grid style={{color:"red"}}>
                {errorMessage}
            </Grid>

            <Grid>
                Select the tickets to return:
            </Grid>



            {
                ticketList && ticketList.length > 0 && (
                    <Grid item container xs={12} justifyContent="center" style={{paddingTop:"20px", paddingBottom:"20px"}}>
                        {
                            ticketList.map((ticket, index)=>{
                            return (
                                <Grid item container key={index}>
                                    <Grid item>
                                        <div class="checkbox checkbox-circle checkbox-color-scheme">
                                            <label class="checkbox-checked">
                                                <input type="checkbox" value={ticket.ticketID} checked={ticket.selected} onChange={handleTicketSelection(index)}/> <span class="label-text"></span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        {ticket.source} - {ticket.destination} : {ticket.value}
                                    </Grid>


                                </Grid>
                            )
                        })
                    }
                    </Grid>
                )
            }


            <button
              type="submit"
              onClick={()=>{handleReturnTickets()}}>
              Return Tickets
            </button>
        </Grid>
    )
}


function DrawCard(props) {
    const {board, playerID} = props;
    const [cardIndex, setCardIndex] = useState(-1);

    const handleDrawCard = () =>{
        if(cardIndex < 0) {
            return;
        }
        drawCard(playerID, board.boardID, cardIndex);
        setCardIndex(-1);
    }

    const {fiveOpenCards} = board;

    return (
        <Grid item container xs={12} justifyContent="center">

            <Grid item contianer xs={12}>
                Select a card to draw:
            </Grid>

            <Grid item contianer xs={12} justifyContent="center">
            {
                fiveOpenCards.map((card, index)=>{
                    const cardColor = card.gameColor === "any" ? "white" : card.gameColor;
                    const cardLabel = card.gameColor === "any" ? "Locomotive" : card.gameColor;

                    return (
                        <Grid item container xs={12} key={index} justifyContent="flex-start">
                            <input type="radio" id={index} name={cardLabel} value={index} checked={index==cardIndex} onChange={()=>setCardIndex(index)}/>
                            <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:cardColor}}></div>
                            <label htmlFor={index}>{cardLabel}</label>

                        </Grid>
                    )
                })
            }
                <Grid item container xs={12} key={5} justifyContent="flex-start">
                    <input type="radio" id={"Pack"} name={"Pack"} value={5} checked={5==cardIndex} onChange={()=>setCardIndex(5)}/>
                    <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:"white"}}></div>
                    <label htmlFor={"Pack"}>{"Draw from pile"}</label>
                </Grid>

            </Grid>


            <Grid item contianer xs={12}>
                <button
                  type="submit"
                  disabled = {cardIndex < 0}
                  onClick={()=>{handleDrawCard()}}>
                  Draw the seleted card
                </button>
            </Grid>
        </Grid>
    )
}


function Cards(props) {
    const {board, playerID} = props;
    const {fiveOpenCards} = board;
    return (
        <div>
            Open cards:
            {
                fiveOpenCards.map((card, index)=>{
                    const cardColor = card.gameColor === "any" ? "white" : card.gameColor;
                    const cardLabel = card.gameColor === "any" ? "Locomotive" : card.gameColor;

                    return (
                        <Grid item container xs={12} key={index}>
                            <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:cardColor}}></div>
                            <div>{cardLabel}</div>
                        </Grid>
                    )
                })
            }
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
        return (<DrawCard board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "buildTracks") {
        //show a way to pick open track and select cards needed and submit.
    }
    return null;
}

function PlayStatus(props) {
    const {board} = props;
    const currentPlayer = getCurrentPlayer(board);
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


function PlayerCards(props) {
    const {board, playerID} = props;
    const thePlayer = getPlayer(board, playerID);

    const cardsByColor = thePlayer.cards.reduce((map, card)=>{
        if(map[card.gameColor] != null) {
            map[card.gameColor] = map[card.gameColor] + 1;
        } else {
            map[card.gameColor] = 1;
        }
        return map;
    },{})

    return (
        <Grid item container xs={12} justifyContent="flex-start" style={{paddingTop:"30px"}}>
            Your Cards:
            <Grid item container xs={12} justifyContent="flex-start">
                {
                    Object.keys(cardsByColor).map((key, index)=>{
                        const color = key === "any" ? "white" : key;
                        return (
                            <Grid item key={index} xs={12} container>
                                <div style={{minWidth:"30px", minHeight:"10px", backgroundColor:color}}></div>
                                <div>{key != "any" ? key : "Locomotive"} {cardsByColor[key]}</div>
                            </Grid>

                        )
                    })
                }
            </Grid>

        </Grid>
    )
}

function PlayerTickets(props) {
    const {board, playerID} = props;
    const thePlayer = getPlayer(board, playerID);

    return (
        <Grid item container xs={12} justifyContent="flex-start" style={{paddingTop:"30px"}}>
            Your Tickets:
            {
                thePlayer.tickets.map((ticket, index)=>{
                return (
                    <Grid item container key={index} xs={12}>
                        {ticket.source} - {ticket.destination}: {ticket.value}
                    </Grid>
                )
                })
            }
        </Grid>
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
                      <PlayerCards board={board} playerID={playerID}/>
                  </div>
              )
          }
          {
              board.gameState === "started" && (
                  <div>
                      <PlayerTickets board={board} playerID={playerID}/>
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
