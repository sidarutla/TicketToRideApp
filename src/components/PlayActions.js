import React from 'react';

import PickPlayType from './PickPlayType';
import ReturnTickets from './ReturnTickets';
import DrawCard from './DrawCard';
import BuildTrack from './BuildTrack';


function PlayActions(props) {
    const {board, playerID} = props;

    if(board.currentPlayType == null) {
        return (<PickPlayType board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "drawTickets") {
        //show drawn tickets and ask the user to return 1 or 2 tickets.
        return (<ReturnTickets board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "drawCards") {
        //ask the user to pick one of the open five cards... and select.
        return (<DrawCard board={board} playerID={playerID}/>)
    } else if(board.currentPlayType === "buildTracks") {
        //show a way to pick open track and select cards needed and submit.
        return (<BuildTrack board={board} playerID={playerID}/>)
    }
    return null;
}



export default PlayActions;
