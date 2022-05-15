import React, {useState} from 'react';

import Grid from '@mui/material/Grid';

import {getCurrentPlayer, getCardsCountByColor} from '../boardutil'

import {buildTrack, resetPlayType} from '../lib';


function BuildTrack(props) {
    const {board, playerID} = props;

    const [errorMessage, setErrorMessage] = useState(null);
    const [connectionID, setConnectionID] = useState("");
    const [pathwayID, setPathwayID] = useState("");
    const [pathway, setPathway] = useState(null);
    const [useLocos, setUseLocos] = useState(false);
    const [colorToUse, setColorToUse] = useState("");
    const [showColorToUse, setShowColorToUse] = useState(false);

    const connectionOptions = board.connections.flatMap((connection)=>{
        const pathways = [];

        const label = connection.source + " - " + connection.destination;

        if(connection.pathway1 != null) {
            const colorLabel = " (Tracks: " + connection.pathway1.tracks  + "  Color: " + connection.pathway1.color + ")"
            pathways.push(
                {
                    label: label + colorLabel,
                    value: connection.pathway1.pathwayID,
                    isAvailable: connection.pathway1.gamePlayer == null
                }
            )
        }
        if(connection.pathway2 != null) {
            const colorLabel = " (Tracks: " + connection.pathway2.tracks  + "  Color: " + connection.pathway2.color + ")"
            pathways.push(
                {
                    label: label + colorLabel,
                    value: connection.pathway2.pathwayID,
                    isAvailable: connection.pathway2.gamePlayer == null
                }
            )
        }
        return pathways;

        //
        //
        // const value = connection.connectionID;
        // const isAvailable = (connection.pathway1 != null && connection.pathway1.open) ||  (connection.pathway2 != null && connection.pathway2.open)
        // return {
        //     label,
        //     value,
        //     isAvailable:true,
        // };
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

    const handleResetPlayType = () =>{
        resetPlayType(playerID, board.boardID);
    }

    const handleBuildTrack = () =>{
        if(!connectionID || connectionID.trim().lenght === 0 || !pathwayID || pathwayID.trim().length === 0) {
            setErrorMessage("select a connection");
            return;
        }

        if(pathway.color === "any" && (!colorToUse || colorToUse.trim().length === 0)) {
            setErrorMessage("select a color to use");
            return;
        }

        const colorNeeded = pathway.color === "any" ? colorToUse : pathway.color;
        const tracksNeeded = pathway.tracks;
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
        buildTrack(playerID, board.boardID, connectionID, pathwayID, colorToUse, useLocos);
    }

    const handleConnectionChange = (value) => {
        const theConnection = board.connections.find(c=>{
            if(c.pathway1 != null && c.pathway1.pathwayID === value) {
                return true;
            }
            if(c.pathway2 != null && c.pathway2.pathwayID === value) {
                return true;
            }
            return false;
        });
        let thePathway = null;
        if(theConnection && theConnection.pathway1 && theConnection.pathway1.pathwayID === value) {
            thePathway = theConnection.pathway1;
        }
        if(!thePathway && theConnection && theConnection.pathway2 && theConnection.pathway2.pathwayID === value) {
            thePathway = theConnection.pathway2;
        }

        setPathwayID(value);
        setConnectionID(theConnection.connectionID);
        setPathway(thePathway);

        if(thePathway && thePathway.color === "any") {
            setShowColorToUse(true);
            setColorToUse("");
        } else {
            setShowColorToUse(false);
            setColorToUse(thePathway.color);
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
                        <select name="connectionID" id="connectionID" value={pathwayID} onChange={(event)=>{handleConnectionChange(event.target.value)}}>
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
                  onClick={()=>{handleResetPlayType()}}>
                  Change Play Type
                </button>
            </Grid>
        </Grid>
    )
}


export default BuildTrack;
