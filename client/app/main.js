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
            _csrf: props.csrf,
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
            '/makeTreasure',
            {
                _csrf: this.state._csrf,
                name: this.state.hasTreasure.name,
                value: this.state.hasTreasure.value,
            },
            alert(`${this.state.hasTreasure.name} found and added to inventory!`)
        );

        // remove treasure from the grid tile
        this.setState({hasTreasure: ''});
        return false;
    };

    render() {
        return (
            <div className="gridTile col-lg-4 col-md-4 col-sm-4 col-4" onClick={this.handleClick}>
                <p className="label">{this.state.hasTreasure.name}</p>
            </div>
        );
    }
};

// A traversable collection of grid tiles
// The chance of treasure is procedurally generated in an array with corresponding indicies
// for each tile on the grid. Default value is passed into the props of each tile
const Grid = (props) => {
    // Contains the names of treasure in a given grid tile. Hardcoded for now
    // Issues - refreshing the page adds these back in. Need to pull in from server?
    const treasArray = [
        {name:'Holy Grail', value:1000}, '', '',
        '', '', {name:'Gold Ore', value:50},
        '', {name:'Dagger of Time', value:500}, '',
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
                <h4>You have nothing in your inventory yet.</h4>
            </div>
        );
    }

    const itemTiles = props.items.map((item) => {
        return (
            <div className="container itemList">
                <div key={item.name} className="inventoryItem row justify-content-center text-center">
                    <h4 className="itemName col-lg-4 col-md-5 col-sm-6 col-6">Name: {item.name}</h4>
                    <h4 className="itemValue col-lg-4 col-md-5 col-sm-6 col-6">Value: {item.value}</h4>            
                </div>
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
    sendAjax('GET', '/getTreasure', null, (data) => {
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