import React, {useEffect, useState} from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import AppConfig from './config'

import {getBoard} from './lib';
import Players from './Players';
import ActionArea from './ActionArea';
import MapArea from './MapArea';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SOCKET_URL = AppConfig.SOCKET_URL;

function Board(props) {

    let boardID = null;
    const [playerID, setPlayerID] = useState(null);
    const [board, setBoard] = useState(null);
    const [refresh, setRefresh]= useState(false);

    if(board) {
        boardID = board.boardID;
    }


    useEffect(()=>{
        const localplayerID = localStorage.getItem("playerID");
        setPlayerID(localplayerID);
    },[])



    useEffect(()=> {
        const fetchBoard = async () => {
            const localBoardID = localStorage.getItem("boardID");
            try {
                const board = await getBoard(localBoardID);
                if(board) {
                    setBoard(board);
                }
            }catch(err) {
            }
        }
        fetchBoard();
    },[])

    useEffect(()=>{
        if(refresh === true) {
            const fetchBoard = async () => {
                const localBoardID = localStorage.getItem("boardID");
                try {
                    setRefresh(false);
                    const board = await getBoard(localBoardID);
                    if(board) {
                        setBoard(board);
                    }
                }catch(err) {
                }
            }
            fetchBoard();
        }
    },[refresh, setRefresh])

    useEffect(() => {
        if(boardID) {
            var sock = new SockJS(SOCKET_URL);
            let stompClient = Stomp.over(sock);
            sock.onopen = function() {
            }
            stompClient.connect({}, function (frame) {
                stompClient.subscribe('/topic/' + boardID, function (message) {
                    if (message.body) {
                       var jsonBody = JSON.parse(message.body);
                       setBoard(jsonBody)
                   }
               });
            });
        }
    },[boardID])

    if(board) {

        return (
            <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                      {
                          //<Grid item xs={12}>Board Name : {board.boardName}</Grid>
                      }

                      <Grid item xs={12}>
                          <Grid item xs={12}>
                              {
                                  //<Grid item xs={12}>Players</Grid>
                              }

                              <Players
                                  board={board}
                                  playerID={playerID}
                              />
                          </Grid>
                      </Grid>

                      <Grid container item xs={12}>
                          <Grid container item lg={2}>
                          <ActionArea
                              playerID={playerID}
                              board={board}
                              onLeaveBoard={props.onLeaveBoard}
                          />
                          </Grid>
                          <Grid item lg={10} style={{padding:"30px"}} >
                              <MapArea
                                  playerID={playerID}
                                  board={board}
                              />
                          </Grid>
                      </Grid>

                  </Grid>
            </Box>
        )
    } else {
        return "Please pass a  board id"
    }

}

export default Board;
