// React components for handling the game client and window

// A clickable div that may or may not contain treasure. Will later
// contain the player and can be navigated to/from using buttons
// Uses state to keep track of component state and change it dynamically
class GridTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasTreasure: props.treasure, // stores the NAME of the treasure on the tile. Empty == ""
            // hasPlayer: props.hasPlayer
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        if(this.state.hasTreasure == ''){
            alert("No treasure here!");
            return false;
        }

        // if there is treasure, tell server to create an instance of it for the player's inventory
        sendAjax(
            'POST',
            '/addNewTreasure',
            this.state.hasTreasure,
            alert(`${this.state.hasTreasure} found and added to inventory!`)
        );

        // remove treasure from the grid tile
        this.setState({hasTreasure: ''});
        return false;
    };

    render() {
        return (
            <div className="gridTile col-lg-4 col-md-4 col-sm-4 col-4" onClick={this.handleClick}>
                <p className="label">{this.state.hasTreasure}</p>
            </div>
        );
    }
};

// A traversable collection of grid tiles
// The chance of treasure is procedurally generated in an array with corresponding indicies
// for each tile on the grid. Default value is passed into the props of each tile
const Grid = (props) => {
    // Contains the names of treasure in a given grid tile
    const treasArray = [
        'Holy Grail', '', '',
        '', '', 'Gold Ore',
        '', 'Dagger of Time', '',
    ];

    return(
        <div className="gridContainer container">
            <div className="row content-justify-center">
                <GridTile treasure={treasArray[0]} csrf={props.csrf} />
                <GridTile treasure={treasArray[1]} csrf={props.csrf} />
                <GridTile treasure={treasArray[2]} csrf={props.csrf} />
            </div>

            <div className="row content-justify-center">
                <GridTile treasure={treasArray[3]} csrf={props.csrf} />
                <GridTile treasure={treasArray[4]} csrf={props.csrf} />
                <GridTile treasure={treasArray[5]} csrf={props.csrf} />
            </div>

            <div className="row content-justify-center">
                <GridTile treasure={treasArray[6]} csrf={props.csrf} />
                <GridTile treasure={treasArray[7]} csrf={props.csrf} />
                <GridTile treasure={treasArray[8]} csrf={props.csrf} />
            </div>
        </div>
    );
};

const Inventory = (props) => {
    if(props.items.length === 0) {
        return (
            <div className="itemList">
                <h3 className="emptyInventory">You have nothing in your inventory yet.</h3>
            </div>
        );
    }

    const itemTiles = props.items.map((item) => {
        return (
            <div key={item.id} className="inventoryItem">
                <h3 className="itemName">Name: {item.name}</h3>
                <h3 className="itemValue">Value: {item.value}</h3>            
            </div>
        );
    });

    return (
        <div className="itemList">
            {itemTiles}
        </div>
    );
};

const loadInventoryFromServer = () => {
    sendAjax('GET', '/getInventory', null, (data) => {
        ReactDOM.render(
            <Inventory items={data.treasure} />, document.querySelector("#inventory")
        );
    });
};

const setup = (csrfToken) => {
    ReactDOM.render(<Grid csrf={csrfToken} />, document.querySelector('#app'));
    ReactDOM.render(<Inventory items={[]} />, document.querySelector("#inventory"));
    
    loadInventoryFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});