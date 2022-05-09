import React, {useEffect, useState} from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import {getBoard} from './lib';

const SOCKET_URL = 'http://localhost:8080/ttr-websocket';
// const SOCKET_URL = 'ws://localhost:8080/ttr-websocket';

function Board(props) {

    let boardId = null;
    const [board, setBoard] = useState(null);
    const [refresh, setRefresh]= useState(false);

    if(board) {
        boardId = board.boardId;
    }

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
        console.log("baord to sid", board);
        return (
            <div>
                <div>Board : {board.boardName}</div>

                <div>Players : {board.players.length < 2 ? "can't start" : "can start"}</div>
                <div>
                    PLAYERS:
                    {
                        board.players.map((player, index)=>{
                            return (
                            <div key={index}>
                                {player.playerName}
                                {player.playerId === board.owningPlayerId ? " (Host)" : ""}
                            </div>
                            )
                        })
                    }
                </div>

                {
                    board.gameState === "Initializing" && (<button
                        type="submit"
                        disabled={board.players.length < 2 ? true : false}
                        onClick={()=>{
                            // startGame(board.boardId)
                            // setRefresh(true);
                        }}>Start</button>)
                }

                <button type="submit" onClick={()=>{props.onLeaveBoard()}}>Leave</button>
            </div>

        )
    } else {
        return "Please pass a  board id"
    }

}

export default Board;
