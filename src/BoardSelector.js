import React, {useEffect, useState, useRef} from 'react';

import {getBoards, createBoard, joinBoard} from './lib';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


import BoardAPI from './boardapi';

const SOCKET_URL = 'http://localhost:8080/ttr-websocket';


function BoardSelector(props) {

    const [playerId, setPlayerId] = useState(null);
    // const [boardId, setBoardId] = useState(null);
    const [boardName, setBoardName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const [boards, setBoards] = useState([]);

    const boardsRef = useRef(boards);


    useEffect(() => { boardsRef.current = boards},[boards])


    const updateBoards = (newBoard) => {
        const newBoards = boardsRef.current.map(board=>{
            return board;
        })
        const boardIndex = newBoards.findIndex(board=>{
            return board.boardId === newBoard.boardId;
        })
        if(boardIndex > 0) {
            newBoards[boardIndex] = newBoard;
        } else {
            newBoards.push(newBoard);
        }
        setBoards(newBoards);
    }

    useEffect(() => {
        var sock = new SockJS(SOCKET_URL);
        let stompClient = Stomp.over(sock);

        sock.onopen = function() {
            // console.log('open');
        }
        stompClient.connect({}, function (frame) {
            // console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/boards', function (message) {
                console.log("Board changed: ", message);
                if (message.body) {
                   var newBoard = JSON.parse(message.body);
                   updateBoards(newBoard);
               }
           });
        });
    },[])


    useEffect(()=>{
        const localPlayerId = localStorage.getItem("playerId");
        if(localPlayerId) {
            setPlayerId(localPlayerId);
        }
    },[])


    useEffect(()=>{
        const fetchBoards = async () => {
            try {
                console.log("seq", 1);
                const boards = await getBoards();
                console.log("seq", 3);
                if(boards) {
                    setBoards(boards);
                }
            }catch(err){
                setErrorMessage("Error getting boards");
            }
        }
        fetchBoards();
    },[])


    const handleAction = async (action, boardId) => {
        //action can be view, -- boardId is needed
        //action can be created -- playerName is required.
        //action can be join  -- boardId and playerName required.
        //connect to server if join, or created...
        setErrorMessage(null);


        if(action === "create") {
            if(!playerId) {
                setErrorMessage("Player registration is mission. Click on change user and register as a new user.")
            } else if(!boardName || boardName.trim().length === 0) {
                    setErrorMessage("Enter a board name to crate a board.")
            } else {

                try {
                    const board = await createBoard(playerId, boardName);
                    if(board) {
                        localStorage.setItem("boardId", board.boardId);
                        props.onSelectBoard(board.boardId);
                    }
                }catch(err) {
                    setErrorMessage("error creating board " + err);
                }
            }
        } else if(action === "join") {
            if(!boardId) {
                setErrorMessage("Please select a valid board")
            } else {

                try {
                    const board = await joinBoard(playerId, boardId);
                    localStorage.setItem("boardId", board.boardId);
                    props.onSelectBoard(board.boardId);
                }catch(err) {
                    setErrorMessage("Error joining the board");
                }
            }
        } else if(action === "view") {
            if(boardId) {
                localStorage.setItem("boardId", boardId);
                props.onSelectBoard(boardId);
            } else {
                setErrorMessage("Board Id is required to view a game")
            }
        }
        //
        //
        //
        // if(action === "view") {
        //     if(boardId) {
        //         //TODO: check if this is a valid board.
        //         props.onSelectBoard(boardId);
        //     } else {
        //         setErrorMessage("Board Id is required to view a game")
        //     }
        // } else if(action === "join") {
        //     if(!playerName || !boardId) {
        //         setErrorMessage("Board Id and Player Name are required to join a game")
        //     } else {
        //         //TODO: join the boardd..
        //         //TODO: store the playerId in local storage
        //         //TODO: call onSelectBoard.
        //         props.onSelectBoard(boardId);
        //     }
        // } else if(action === "create") {
        //     if(!playerName) {
        //         setErrorMessage("Player name requierd to create a new board.")
        //     } else {
        //         const board = createGame("sid");
        //         setBoardId(board.boardId);
        //         props.onSelectBoard(board.boardId);
        //         //TODO: create the boared and get playerId and boardId.
        //         //TODO: store the playerId in local storage
        //         //TODO: call onSelectBoard with boardId
        //     }
        // }
    }

    return (
        <div>
            <div>
                {errorMessage && (<div style={{color:"red"}}>{errorMessage}</div>) }
            </div>

            <div>
                Board Name: <input type="text" value={boardName} onChange={e=>setBoardName(e.target.value)}/>
                <button type="submit" onClick={()=>{handleAction("create")}}>CREATE</button>
            </div>


            <div>
                <button type="submit" onClick={()=>{props.onChangePlayer()}}>Change Player...</button>
            </div>


            <div>
                <table>
                    <thead>

                    <tr>
                        <th span={4}>
                            View of Join an existing board.
                        </th>
                    </tr>
                    </thead>

                    <tbody>



                {
                    boards.sort((b1,b2)=>{return b1.boardName.toUpperCase().localeCompare(b2.boardName.toUpperCase())}).map((board, index)=>{
                        return (
                            <tr key={index}>
                                <td>{board.boardName}</td>
                                <td>{board.players.length}</td>
                                <td><button type="submit" onClick={()=>{handleAction("join", board.boardId)}}>JOIN</button></td>
                                <td><button type="submit" onClick={()=>{handleAction("view", board.boardId)}}>VIEW</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
        </div>
    )


}

export default BoardSelector;
