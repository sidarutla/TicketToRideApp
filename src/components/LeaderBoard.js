import React from 'react';


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';


function LeaderBoard(props) {
    const {board, playerID} = props;
    const {players} = board;

    const leaderBoard = players.sort((gp1, gp2)=>{
        return (gp2.score - gp1.score);
    })

    const maxFontSize = 50;

    var i = 0;
    const rows = leaderBoard.map((gp)=>{
        i++;
        return {
            ranking:i,
            name:gp.playerName,
            score:gp.score,
            scoresBreakDown:[
                {label:"Tracks", points:gp.scoreFromTracks},
                {label:"Ticket Finished", points:gp.scoreFromFinishedTickets},
                {label:"Tickets Unfinished", points:gp.scoreFromUnfinishedTickets},
                {label:"Longest Route", points:0},
            ]
        }
    })



    return (
        <Grid item container xs={12} justifyContent="center">

            <Grid item xs={12}>
                Game is Finished.
            </Grid>

            <Grid item container xs={12} justifyContent="center">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.ranking}
                          </TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.score}</TableCell>
                          <TableCell align="right">{
                                  (<Table>
                                      {
                                          row.scoresBreakDown.map((scoresBreakDown, index)=>{
                                              return (
                                                  <TableRow key={index}>
                                                      <TableCell>{scoresBreakDown.label}</TableCell>
                                                      <TableCell>{scoresBreakDown.points}</TableCell>
                                                  </TableRow>
                                              )
                                          })
                                      }
                                  </Table>)
                              }</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>



            <Grid item container xs={12} justifyContent="center">
            {
                // leaderBoard.map((gamePlayer, index)=>{
                //     const rank = index+1;
                //     const fontSize = maxFontSize/rank;
                //     return (
                //         <Grid item container xs={12} key={index} justifyContent="center" alignItems={"center"}>
                //             <Typography variant={"h1"} style={{fontSize:fontSize}}>
                //                 {gamePlayer.playerName}
                //             </Typography>
                //             <Typography variant={"p"}>
                //                 (Points: {gamePlayer.score})
                //             </Typography>
                //         </Grid>
                //     )
                // })

                // <Table>
                //     <TableRow>
                //         <TableCell align="left">{"Tracks"}</TableCell>
                //         <TableCell align="right">{row.scoresBreakDown['Tracks']}</TableCell>
                //     </TableRow>
                //     <TableRow>
                //         <TableCell align="left">{"Finished Tickets"}</TableCell>
                //         <TableCell align="right">{row.scoresBreakDown['Finished Tickets']}</TableCell>
                //     </TableRow>
                //     <TableRow>
                //         <TableCell align="left">{"Unfinished Tickets"}</TableCell>
                //         <TableCell align="right">{row.scoresBreakDown['Unfinished Tickets']}</TableCell>
                //     </TableRow>
                //     <TableRow>
                //         <TableCell align="left">{"Longest Route"}</TableCell>
                //         <TableCell align="right">{row.scoresBreakDown['Longest Route']}</TableCell>
                //     </TableRow>
                // </Table>
            }
        </Grid>
        </Grid>
    )
}

export default LeaderBoard;
