import React, {useState} from 'react';


import { Stage, Layer, Rect, Circle} from 'react-konva';

import Grid from '@mui/material/Grid';

import {getConnection, getCity} from "./MapData";
import {getPlayer} from './boardutil'


function City(props) {
    const {city, color} = props;
    const x1 = city.point[0];
    const y1 = city.point[1];
    return (
        <Circle x={x1} y={y1} stroke={color} fill={color} radius={8} />
    )
}


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
         <Rect y={y} x={x} width={40} height={8} rotation={angleDeg} fill={color} />
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

    const trackMode = false;
    const cityMode = false;

    const [points, setPoints] = useState([]);
    const [tracks, setTracks] = useState([]);

    const width = 900;
    const height = 600
    const {board, playerID, ticketsState} = props;

    const thePlayer = getPlayer(board, playerID);


    //Group have tickets by pairs.. and give a number to the route...
    //Group the tickets drawan same.. but give striped...or glowing background these pairs..
    //Both of them should be shown only when showTickets is on...
    //Combie with the show tickets option...
    const citiesToShow = thePlayer.tickets.filter((ticket)=>ticketsState[ticket.ticketID] === true).flatMap((ticket)=>{
        return [ticket.source, ticket.destination];
    })

    const citiesDrawn = thePlayer.drawnTickets.flatMap((ticket)=>{
        return [ticket.source, ticket.destination];
    })

    let occupiedPaths = board.connections.flatMap(connection=>{
        const occupiedPaths = [];
        if(connection.pathway1 && (connection.pathway1.gamePlayer != null || trackMode)) {
            const con = getConnection(connection.source, connection.destination);
            if(con) {
                occupiedPaths.push({
                    tracks:con.pathway1,
                    color:trackMode ? "red" : connection.pathway1.gamePlayer.playerColor

                })
            }
        }
        if(connection.pathway2 && (connection.pathway2.gamePlayer != null || trackMode)) {
            const con = getConnection(connection.source, connection.destination);
            if(con) {
                occupiedPaths.push({
                    tracks:con.pathway2,
                    color: trackMode ? "blue" : connection.pathway2.gamePlayer.playerColor
                })
            }
        }
        return occupiedPaths;
    })
    occupiedPaths = occupiedPaths.filter(p=>p!=null)
    if(!occupiedPaths) {
        occupiedPaths = [];
    }

    // let allCities = board.connections.reduce((uniqueList, connection)=>{
    //     if(!uniqueList.includes(connection.source)){
    //         uniqueList.push(connection.source);
    //     }
    //     if(!uniqueList.includes(connection.destination)){
    //         uniqueList.push(connection.destination);
    //     }
    //     return uniqueList;
    // },[]);
    //
    // const allCityJson = allCities.sort((c1, c2)=> c1.localeCompare(c2)).map((cityName)=>{
    //     return {
    //         name: cityName,
    //         points:[]
    //     }
    // })
    // console.log("city json", JSON.stringify(allCityJson));

    return (
      <Grid container justifyContent="center" spacing={2} onClick={(event)=>{
              if(!trackMode && !cityMode){
                  return;
              }

              if(trackMode) {
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
              } else if(cityMode){
                  let newPoints = []
                  newPoints.push(event.nativeEvent.layerX)
                  newPoints.push(event.nativeEvent.layerY)
                  console.log(newPoints.join());

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
          {
              cityMode && allCities.map((city, index)=>{
                  const theCity = getCity(city);
                  if(theCity && theCity.point.length == 2) {
                      return (
                            <City key={index} city={theCity} color={thePlayer.playerColor}/>
                      )
                  } else {
                      return null;
                  }
              })
          }
          {
              citiesToShow.map((city, index)=>{
                  const theCity = getCity(city);
                  if(theCity && theCity.point.length == 2) {
                      return (
                            <City key={index} city={theCity} color={thePlayer.playerColor}/>
                      )
                  } else {
                      return null;
                  }
              })
          }

          {
              citiesDrawn.map((city, index)=>{
                  const theCity = getCity(city);
                  if(theCity && theCity.point.length == 2) {
                      return (
                            <City key={index} city={theCity} color={"white"}/>
                      )
                  } else {
                      return null;
                  }
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
