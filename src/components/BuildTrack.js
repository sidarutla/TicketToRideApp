import React, {useState} from 'react';

import Grid from '@mui/material/Grid';

import {getCurrentPlayer, getCardsCountByColor} from '../boardutil'

import {buildTrack, changePlayType} from '../lib';


function BuildTrack(props) {
    const {board, playerID} = props;

    const [errorMessage, setErrorMessage] = useState(null);
    const [connectionID, setConnectionID] = useState("");
    const [connection, setConnection] = useState(null);
    const [useLocos, setUseLocos] = useState(false);
    const [colorToUse, setColorToUse] = useState("");
    const [showColorToUse, setShowColorToUse] = useState(false);

    const connectionOptions = board.connections.map((connection)=>{
        const label = connection.source + " - " + connection.destination + " (Tracks: " + connection.pathway1.tracks  + "  Color: " + connection.pathway1.color + ")"
        const value = connection.connectionID;
        const isAvailable = (connection.pathway1 != null && connection.pathway1.open) ||  (connection.pathway2 != null && connection.pathway2.open)
        return {
            label,
            value,
            isAvailable:true,
        };
    })
    connectionOptions.unshift({label:"Select a connection", value:"", isAvailable:true})

    const currentPlayer = getCurrentPlayer(board);
    const cardsByColor = getCardsCountByColor(currentPlayer.cards);


    const availableColors = Object.keys(cardsByColor).filter(color=>color!=="any").map((color)=>{
        return {
            value:color,
            label:color
        }
    });
    availableColors.unshift({label:"Select a color", value:""})

    const handleChangePlayType = () =>{
        changePlayType(playerID, board.boardID);
    }

    const handleBuildTrack = () =>{
        if(!connectionID || connectionID.trim().lenght === 0) {
            setErrorMessage("select a connection");
            return;
        }

        if(connection.pathway1.color === "any" && (!colorToUse || colorToUse.trim().length === 0)) {
            setErrorMessage("select a color to use");
            return;
        }

        const colorNeeded = connection.pathway1.color === "any" ? colorToUse : connection.pathway1.color;
        const tracksNeeded = connection.pathway1.tracks;
        let hasCards = cardsByColor[colorNeeded] ? cardsByColor[colorNeeded] : 0;

        if(useLocos) {
            const locoCards = cardsByColor["any"] ? cardsByColor["any"] : 0;
            hasCards = hasCards + locoCards;
        }

        if(hasCards < tracksNeeded) {
            setErrorMessage("You dont't have enough cards...");
            return;
        }

        setErrorMessage(null);
        console.log("Building track", connectionID, colorToUse, useLocos);
        buildTrack(playerID, board.boardID, connectionID, colorToUse, useLocos);
    }

    const handleConnectionChange = (value) => {
        setConnectionID(value);
        const theConnection = board.connections.find(connection=>connection.connectionID===value);
        setConnection(theConnection);
        if(theConnection && theConnection.pathway1.color === "any") {
            setShowColorToUse(true);
        } else {
            setShowColorToUse(false);
            setColorToUse("");
        }
    }

    return (
        <Grid item container xs={12} justifyContent="center">

            <Grid item xs={12}>
                Select the route to claim:
            </Grid>

            <Grid item xs={12}>
                {errorMessage && (<div style={{color:"red"}}>{errorMessage}</div>) }
            </Grid>

            <Grid item xs={12}>
                    <Grid item xs={12}>
                        <label htmlFor="connectionID">Select a route:</label>
                        <select name="connectionID" id="connectionID" value={connectionID} onChange={(event)=>{handleConnectionChange(event.target.value)}}>
                            {
                                connectionOptions.map((connection, index)=>{
                                    return (
                                        <option key={connection.value}  value={connection.value} disabled={!connection.isAvailable}>{connection.label}</option>
                                    )
                                })
                            }
                        </select>
                    </Grid>

                    {
                        showColorToUse && (
                            <Grid item xs={12}>
                                <label htmlFor={"colorToUse"}>{"Color To Use:"}</label>
                                <select name="colorToUse" id="colorToUse" value={colorToUse} onChange={(event)=>{setColorToUse(event.target.value)}}>
                                    {
                                        availableColors.map((color)=>{
                                            return (
                                                <option key={color.value} value={color.value}>{color.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Grid>
                        )
                    }

                    <Grid item xs={12}>
                        <label htmlFor={"locosToUse"}>{"Use Locos:"}</label>
                        <input type="checkbox" id={"useLocos"} name={"useLocos"} value={useLocos} onChange={(event)=>setUseLocos(!useLocos)}/>
                    </Grid>

            </Grid>

            <Grid item xs={12}>
                <button
                  type="submit"
                  onClick={()=>{handleBuildTrack()}}>
                  Claim Route
                </button>

                <button
                  type="submit"
                  onClick={()=>{handleChangePlayType()}}>
                  Change Play Type
                </button>
            </Grid>
        </Grid>
    )
}


export default BuildTrack;
