import React, {useEffect, useState, useRef} from 'react';

import {getBoards, createBoard, joinBoard} from './lib';

import AppConfig from './config'

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const SOCKET_URL = AppConfig.SOCKET_URL;


function BoardSelector(props) {

    const [playerID, setPlayerID] = useState(null);
    // const [boardID, setBoardID] = useState(null);
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
            return board.boardID === newBoard.boardID;
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
        const localplayerID = localStorage.getItem("playerID");
        if(localplayerID) {
            setPlayerID(localplayerID);
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


    const handleAction = async (action, boardID) => {
        //action can be view, -- boardID is needed
        //action can be created -- name is required.
        //action can be join  -- boardID and name required.
        //connect to server if join, or created...
        setErrorMessage(null);


        if(action === "create") {
            if(!playerID) {
                setErrorMessage("Player registration is mission. Click on change user and register as a new user.")
            } else if(!boardName || boardName.trim().length === 0) {
                    setErrorMessage("Enter a board name to crate a board.")
            } else {

                try {
                    const board = await createBoard(playerID, boardName);
                    if(board) {
                        localStorage.setItem("boardID", board.boardID);
                        props.onSelectBoard(board.boardID);
                    }
                }catch(err) {
                    setErrorMessage("error creating board " + err);
                }
            }
        } else if(action === "join") {
            if(!boardID) {
                setErrorMessage("Please select a valid board")
            } else {

                try {
                    const board = await joinBoard(playerID, boardID);
                    localStorage.setItem("boardID", board.boardID);
                    props.onSelectBoard(board.boardID);
                }catch(err) {
                    setErrorMessage("Error joining the board");
                }
            }
        } else if(action === "view") {
            if(boardID) {
                localStorage.setItem("boardID", boardID);
                props.onSelectBoard(boardID);
            } else {
                setErrorMessage("Board Id is required to view a game")
            }
        }
        //
        //
        //
        // if(action === "view") {
        //     if(boardID) {
        //         //TODO: check if this is a valid board.
        //         props.onSelectBoard(boardID);
        //     } else {
        //         setErrorMessage("Board Id is required to view a game")
        //     }
        // } else if(action === "join") {
        //     if(!name || !boardID) {
        //         setErrorMessage("Board Id and Player Name are required to join a game")
        //     } else {
        //         //TODO: join the boardd..
        //         //TODO: store the playerID in local storage
        //         //TODO: call onSelectBoard.
        //         props.onSelectBoard(boardID);
        //     }
        // } else if(action === "create") {
        //     if(!name) {
        //         setErrorMessage("Player name requierd to create a new board.")
        //     } else {
        //         const board = createGame("sid");
        //         setBoardID(board.boardID);
        //         props.onSelectBoard(board.boardID);
        //         //TODO: create the boared and get playerID and boardID.
        //         //TODO: store the playerID in local storage
        //         //TODO: call onSelectBoard with boardID
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
                                <td>{board.gameState}</td>
                                <td><button type="submit" onClick={()=>{handleAction("join", board.boardID)}}>JOIN</button></td>
                                <td><button type="submit" onClick={()=>{handleAction("view", board.boardID)}}>VIEW</button></td>
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
