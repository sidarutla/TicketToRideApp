import React from 'react';

import PlayActions from './PlayActions';
import PlayStatus from './PlayStatus';

function Play(props) {
    const {board, playerID} = props;
    if(board.currentPlayerID === playerID) {
        return (
            <div>
                It is your turn to play.
                <PlayActions board={board} playerID={playerID}/>
            </div>
        )
    } else{
        return (
            <PlayStatus board={board}/>
        )
    }
}

export default Play;
