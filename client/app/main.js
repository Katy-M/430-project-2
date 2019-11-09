// React components for handling the game client and window
import { useState} from 'react';

// A clickable div that may or may not contain treasure. Will later
// contain the player and can be navigated to/from using buttons
// Uses state hook to keep track of component state and change it dynamically
const GridTile = (props) => {
    // stores the NAME of the treasure on the tile. Empty == ""
    const [hasTreasure, setHasTreasure] = useState[props.treasure];
    // const [hasPlayer, setHasPlayer] = useState[props.hasPlayer];
    
    const handleClick = (e) => {
        e.preventDefault();

        if(hasTreasure == ''){
            alert("No treasure here!");
            return false;
        }

        // if there is treasure, tell server to create an instance of it for the player's inventory
        sendAjax(
            'POST',
            '/addNewTreasure',
            hasTreasure,
            function(){ alert(`${hasTreasure} found and added to inventory!`) }
        );

        // remove treasure from the grid tile
        setHasTreasure('');
        return false;
    }
    return(
        <div className="gridTile" onClick={handleClick}>
            <p className="label">{hasTreasure}</p>
        </div>
    );
};

// A traversable collection of grid tiles
// The chance of treasure is procedurally generated in an array with corresponding indicies
// for each tile on the grid. Default value is passed into the props of each tile
const Grid = () => {
    // Contains the names of treasure in a given grid tile
    const treasArray = [
        'Holy Grail', '', '',
        '', '', 'Gold Ore',
        '', 'Sands of Time Dagger', '',
    ];

    return(
        <div className="gridContainer">
            <GridTile treasure={treasArray[0]} />
            <GridTile treasure={treasArray[1]} />
            <GridTile treasure={treasArray[2]} />

            <GridTile treasure={treasArray[3]} />
            <GridTile treasure={treasArray[4]} />
            <GridTile treasure={treasArray[5]} />

            <GridTile treasure={treasArray[6]} />
            <GridTile treasure={treasArray[7]} />
            <GridTile treasure={treasArray[8]} />
        </div>
    );
};

const setup = () => {
    ReactDOM.render(<Grid />, document.querySelector('#app'));
};

$(document).ready(function() {
    setup();
});