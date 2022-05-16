import React, {useState} from 'react';


import { Stage, Layer, Rect, Circle} from 'react-konva';

import Grid from '@mui/material/Grid';

import {getConnection} from "./MapData";


function Track(props) {
    const {track, color} = props;
    const x1 = track[0];
    const y1 = track[1];
    const x2 = track[2];
    const y2 = track[3];
    var angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const x = x1;
    const y = y1;
    return (
         <Rect y={y} x={x} width={30} height={10} rotation={angleDeg} fill={color} />
    )
}

function Tracks(props) {
    const {tracks, color} = props;
    return (
        <>
            {
                tracks.map((track, index)=>{
                    return (
                        <Track key={index} track={track} color={color}/>
                    )
                })
            }
        </>
    )
}

function Pathway(props) {
    const {pathway, color} = props;
    if(pathway) {
        return <Tracks tracks={pathway} color={color}/>
    } else {
        return null;
    }
}



function MapArea(props) {

    const drawingMode = false;
    const [points, setPoints] = useState([]);
    const [tracks, setTracks] = useState([]);

    const width = 900;
    const height = 600
    const {board} = props;

    let occupiedPaths = board.connections.flatMap(connection=>{
        const occupiedPaths = [];
        if(connection.pathway1 && (connection.pathway1.gamePlayer != null || drawingMode)) {
            const con = getConnection(connection.source, connection.destination);
            if(con) {
                occupiedPaths.push({
                    tracks:con.pathway1,
                    color:drawingMode ? "red" : connection.pathway1.gamePlayer.playerColor

                })
            }
        }
        if(connection.pathway2 && (connection.pathway2.gamePlayer != null || drawingMode)) {
            const con = getConnection(connection.source, connection.destination);
            if(con) {
                occupiedPaths.push({
                    tracks:con.pathway2,
                    color: drawingMode ? "blue" : connection.pathway2.gamePlayer.playerColor
                })
            }
        }
        return occupiedPaths;
    })
    occupiedPaths = occupiedPaths.filter(p=>p!=null)
    if(!occupiedPaths) {
        occupiedPaths = [];
    }

    return (
      <Grid container justifyContent="center" spacing={2} onClick={(event)=>{
              if(!drawingMode){
                  return;
              }
              if(event.detail === 2) {
                  setTimeout(()=>{
                      setPoints([]);
                      setTracks([]);
                  }, 300);
                  return;
              } else {
                  let newPoints = [...points]
                  newPoints.push(event.nativeEvent.layerX)
                  newPoints.push(event.nativeEvent.layerY)
                  if(newPoints.length >= 4) {
                      const str = "[" + newPoints.join() +"]"

                      let newTracks = [...tracks];
                      newTracks.push(str);
                      setTracks(newTracks);

                      newPoints = [];
                      console.log(newTracks.join());
                  }
                  setPoints(newPoints);
              }
          }}>
      <Stage width={width} height={height} style={{backgroundImage:"url(board.png)", backgroundSize:"contain"}}>
      <Layer>
      {
          <>
          {
              occupiedPaths.map((occupiedPath, index)=>{
                  return (
                        <Pathway key={index} pathway={occupiedPath.tracks} color={occupiedPath.color}/>
                  )
              })
          }
          </>
      }
      </Layer>
    </Stage>
      </Grid>
    )
}

export default MapArea;
