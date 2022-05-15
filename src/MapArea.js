import React from 'react';


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
    // console.log("....", occupiedPaths);
    // const {cities} = board;

    // const cities = [{
    //         name:"a",
    //         x:71,
    //         y:63,
    //     },
    //     {
    //         name:"b",
    //         x:193,
    //         y:46,
    //     }
    // ]
    //
    // const tracks = [
    //     {
    //         x1:84,
    //         y1:60,
    //         x2:114,
    //         y2:58,
    //     },
    //     {
    //         x1:119,
    //         y1:57,
    //         x2:148,
    //         y2:53,
    //     },
    //     {
    //         x1:154,
    //         y1:53,
    //         x2:184,
    //         y2:50,
    //     }
    // ]

    return (
      <Grid container justifyContent="center" spacing={2} onClick={(event)=>{console.log("...", event.nativeEvent.layerX, event.nativeEvent.layerY)}}>
      <Stage width={width} height={height} style={{backgroundImage:"url(board.png)", backgroundSize:"contain"}}>
      <Layer>
      {
          <>
          {
              // <Rect y={10} x={0} width={35} height={10} rotation={10} fill="red" />
              // <Rect y={16} x={38} width={35} height={10} rotation={30} fill="red" />
              // <Rect y={35} x={72} width={35} height={10} rotation={45} fill="red" />

          }

          {
              // cities.map((city, index)=>{
              //     const x = city.point[0];
              //     const y = city.point[1];
              //     return (
              //         <Circle key={index} x={x} y={y} stroke="black" radius={5} />
              //     )
              // })
          }

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
