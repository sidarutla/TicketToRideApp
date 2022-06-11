import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
    const [showUseLocos, setShowUseLocos] = useState(true);

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
    }).sort((c1, c2)=>{
        if (c1.label < c2.label) {
            return -1;
        }
        if (c1.label > c2.label) {
            return 1;
        }
        return 0;
    })

    // connectionOptions.unshift({label:"Select a connection", value:"", isAvailable:true})

    const currentPlayer = getCurrentPlayer(board);
    const cardsByColor = getCardsCountByColor(currentPlayer.cards);

    const availableColors = Object.keys(cardsByColor).map((color)=>{
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
            setErrorMessage("You don't have enough cards");
            return;
        }

        setErrorMessage(null);
        buildTrack(playerID, board.boardID, connectionID, pathwayID, colorToUse, useLocos);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColorToUse(value);
        if(value === "any") {
            setUseLocos(false);
            setShowUseLocos(false);
        }
      };
    

    const handleConnectionChange = (selectedOption) => {
        const value = selectedOption.value;
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
        setShowUseLocos(true);

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

            <Grid item xs={12} container justifyContent="center">
                    <Grid item container xs={12} justifyContent="center" alignItems={"center"}>
                        
                        <Autocomplete
                            name="connectionID"
                            autoHighlight
                            id="connectionID"
                            sx={{width:500}}
                            options={connectionOptions}
                            renderOption={(props, option) => <li {...props} key={option.value}>{option.label}</li>}
                            getOptionDisabled={option => !option.isAvailable}
                            onChange={(event, newValue) => {
                              handleConnectionChange(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} label="Track" />}
                        />
                    </Grid>

                    {
                        showColorToUse && (
                            <Grid item container xs={3} justifyContent="center" alignItems={"center"}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Color To Use:</InputLabel>
                                <Select
                                    labelId="colorToUse"
                                    id="demo-simple-select"
                                    value={colorToUse}
                                    label="Color To Use:"
                                    onChange={handleColorChange}
                                >
                                    {
                                        availableColors.map((color) => {
                                            return (
                                                <MenuItem key={color.value} value={color.value}>{color.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                </FormControl>
                            </Grid>
                        )
                    }

                    {
                        colorToUse !== "any" && (
                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox checked={useLocos} onChange={(event)=>setUseLocos(event.target.checked)}/>} label="Use Locos:" labelPlacement="start" />
                            </Grid>
                        )
                    }

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
