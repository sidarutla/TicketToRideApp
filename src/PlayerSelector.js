import React, {useEffect, useState} from 'react';

import {createPlayer, getPlayer} from './lib';

function PlayerSelector(props) {

    const [playerId, setPlayerId] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{
        const init = async () => {
            const localPlayerId = localStorage.getItem("playerId");
            const localPlayerName = localStorage.getItem("playerName");
            if(!localPlayerId || !localPlayerName || localPlayerName.trim().length === 0) {
                setPlayerId(null);
                setPlayerName("")
            } else {
                try {
                    const player = await getPlayer(localPlayerId);
                    if(player) {
                        setPlayerId(player.playerId);
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
        if(!playerId || !playerName || playerName.trim().length === 0) {
            return false;
        }
        return true;
    }

    const handleClearPlayer = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("playerName");
        setPlayerId(null);
        setPlayerName("");
        props.onClearPlayer();
    }

    const handleCreatePlayer = async () => {
        try {
            const player = await createPlayer(playerName);
            if(player) {
                localStorage.setItem("playerId", player.playerId);
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
