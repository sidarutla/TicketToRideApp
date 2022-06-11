import React from 'react';

import { Typography } from '@mui/material';

import PlayActions from './PlayActions';
import PlayStatus from './PlayStatus';

function Play(props) {
    const { board, playerID } = props;

    return (
        <div>
            <div>
                Round : {board.round} {board.finalPlayerID && (<Typography variant="h6" style={{ color: "red" }}>(FINAL ROUND)</Typography>)}
            </div>
            {
                (board.currentPlayerID === playerID) ? (
                    <div>
                        It is your turn to play.
                        <PlayActions board={board} playerID={playerID} />
                    </div>
                ) : (
                    <PlayStatus board={board} />
                )
            }
        </div>
    )
}

export default Play;
