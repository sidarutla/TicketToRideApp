import React, {useState} from 'react';

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import './App.css';

import Board from './Board';
import BoardSelector from './BoardSelector';
import PlayerSelector from './PlayerSelector';

const theme = createTheme();

function App() {
    const [playerSelected, setPlayerSelected] = useState(false);
    const [boardSelected, setBoardSelected] = useState(false);

    const renderHeader = () => {
        return (
            <header className="App-header">
              Ticket To Ride!!!
            </header>
        )
    }

    const handleSelectPlayer = () => {
        setPlayerSelected(true);
    }

    const handleChangePlayer = () => {
        setPlayerSelected(false);
    }

    const handleSelectBoard = () => {
        setBoardSelected(true);
    }

    const handleLeaveBoard = () => {
        setBoardSelected(false);
    }

    if(!playerSelected) {
        return (
            <div className="App">
                {renderHeader()}
                <PlayerSelector
                    onSelectPlayer={handleSelectPlayer}
                    onClearPlayer={handleChangePlayer}
                />
            </div>
        )
    } else if(!boardSelected) {
        return (
            <div className="App">
                {renderHeader()}
                <BoardSelector
                    onSelectBoard={handleSelectBoard}
                    onChangePlayer={handleChangePlayer}
                />
            </div>
        )
    } else {
        return (
            <div className="App">
                {renderHeader()}
                <Board
                    onLeaveBoard={handleLeaveBoard}
                />
            </div>
        )
    }


}

export default function ThemedApp() {
    return (
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    );
}
