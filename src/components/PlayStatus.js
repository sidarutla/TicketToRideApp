import React from 'react';

import {getCurrentPlayer} from '../boardutil'

function PlayStatus(props) {
    const {board} = props;
    const currentPlayer = getCurrentPlayer(board);
    return (
        <div>
            <div>
                Current Palyer : {currentPlayer.playerName}
            </div>
            <div>
                Play Type : {board.currentPlayType != null ? board.currentPlayType : "Picking play type"}
            </div>
        </div>
    )
}

export default PlayStatus;
