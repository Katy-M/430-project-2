// React components for handling the game client and window
import { useState } from 'react';

// A clickable div that may or may not contain treasure. Will later
// contain the player and can be navigated to/from using buttons
// Uses state hook to keep track of component state and change it dynamically
const GridTile = (props) => {
    // stores the NAME of the treasure on the tile. Empty == ""
    const [hasTreasure, setHasTreasure] = useState[props.treasure];
    // const [hasPlayer, setHasPlayer] = useState[props.hasPlayer];
    
    // Search the schema for the treasure of a name.
    // Tell server to create an instance of that treasure and add it to
    // The player's inventory. Alert the player when done.
    const handleClick = (e) => {
        e.preventDefault();

    }
    return(
        <div className="gridTile" onClick={handleClick}>
            <p className="label">{hasTreasure}</p>
        </div>
    );
};

// a traversable collection of grid tiles
// The chance of treasure is procedurally generated
const Grid = (props) => {
    return(

    );
};