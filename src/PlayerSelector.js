import React, {useEffect, useState} from 'react';

import {createPlayer, getPlayer} from './lib';

function PlayerSelector(props) {

    const [playerID, setPlayerID] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{
        const init = async () => {
            const localPlayerID = localStorage.getItem("playerID");
            const localPlayerName = localStorage.getItem("playerName");

            console.log("aaa", localPlayerID, localPlayerName)
            if(!localPlayerID || !localPlayerName || localPlayerName.trim().length === 0) {
                setPlayerID(null);
                setPlayerName("")
            } else {
                try {
                    const player = await getPlayer(localPlayerID);
                    console.log("...renote", player);
                    if(player) {
                        setPlayerID(player.playerID);
                        setPlayerName(player.playerName);
                    }
                }catch(err) {
                    //setErrorMessage("error getting player");
                }
            }
        }
        init();
    },[])

    const hasPlayerInfo = () => {
        console.log("hasplayerinf", playerID, playerName);
        if(!playerID || !playerName || playerName.trim().length === 0) {
            return false;
        }
        return true;
    }

    const handleClearPlayer = () => {
        localStorage.removeItem("playerID");
        localStorage.removeItem("playerName");
        setPlayerID(null);
        setPlayerName("");
        props.onClearPlayer();
    }

    const handleCreatePlayer = async () => {
        try {
            const player = await createPlayer(playerName);
            if(player) {
                localStorage.setItem("playerID", player.playerID);
                localStorage.setItem("playerName", player.playerName);
                props.onSelectPlayer();
            }else{
                setErrorMessage("Error creating player");
            }
        }catch(err) {
            setErrorMessage(err);
        }
    }

    if(hasPlayerInfo()) {
        return (
            <div>
                <div>
                    Welcome back, {playerName}!!!
                </div>
                <div>
                    Click continue to play TTR.
                </div>
                <div>
                <button type="submit" onClick={()=>{props.onSelectPlayer()}}>PLAY</button>
                </div>

                <div>
                <button type="submit" onClick={()=>{handleClearPlayer()}}>Join as a different player</button>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                <div>
                    {errorMessage && (<div style={{color:"red"}}>{errorMessage}</div>) }
                </div>

                Player Name: <input type="text" value={playerName} onChange={e=>setPlayerName(e.target.value)}/>
                <button type="submit" onClick={()=>{handleCreatePlayer()}}>PLAY</button>
            </div>
        )
    }
}

export default PlayerSelector;
