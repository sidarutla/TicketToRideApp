import React, {useEffect, useState} from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import {getBoard} from './lib';
import Players from './Players';
import ActionArea from './ActionArea';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SOCKET_URL = 'http://localhost:8080/ttr-websocket';
// const SOCKET_URL = 'ws://localhost:8080/ttr-websocket';


function Board(props) {

    let boardId = null;
    const [playerId, setPlayerId] = useState(null);
    const [board, setBoard] = useState(null);
    const [refresh, setRefresh]= useState(false);

    if(board) {
        boardId = board.boardId;
    }


    useEffect(()=>{
        const localPlayerId = localStorage.getItem("playerId");
        setPlayerId(localPlayerId);
    },[])



    useEffect(()=> {
        const fetchBoard = async () => {
            const localBoardId = localStorage.getItem("boardId");
            try {
                const board = await getBoard(localBoardId);
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
                const localBoardId = localStorage.getItem("boardId");
                try {
                    setRefresh(false);
                    const board = await getBoard(localBoardId);
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
        if(boardId) {
            var sock = new SockJS(SOCKET_URL);
            let stompClient = Stomp.over(sock);
            sock.onopen = function() {
                // console.log('open');
            }
            stompClient.connect({}, function (frame) {
                // console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/' + boardId, function (message) {
                    console.log("Message: ", message);
                    if (message.body) {
                       var jsonBody = JSON.parse(message.body);
                       setBoard(jsonBody)
                   }
               });
            });
        }
    },[boardId])

    if(board) {

        return (
            <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>Board Name : {board.boardName}</Grid>

                      <Grid item xs={12}>
                          <Grid item xs={12}>
                              <Grid item xs={12}>Players</Grid>
                              <Players players={board.players}/>
                          </Grid>
                      </Grid>

                      <Grid container item xs={12}>
                          <Grid container item lg={2}>
                          <ActionArea
                              playerId={playerId}
                              board={board}
                              onLeaveBoard={props.onLeaveBoard}
                          />
                          </Grid>
                          <Grid item lg={10}>
                              Map Area
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
