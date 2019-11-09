'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // React components for handling the game client and window


var _react = require('react');

// A clickable div that may or may not contain treasure. Will later
// contain the player and can be navigated to/from using buttons
// Uses state hook to keep track of component state and change it dynamically
var GridTile = function GridTile(props) {
    // stores the NAME of the treasure on the tile. Empty == ""
    var _useState$props$treas = _slicedToArray(_react.useState[props.treasure], 2),
        hasTreasure = _useState$props$treas[0],
        setHasTreasure = _useState$props$treas[1];
    // const [hasPlayer, setHasPlayer] = useState[props.hasPlayer];

    var handleClick = function handleClick(e) {
        e.preventDefault();

        if (hasTreasure == '') {
            alert("No treasure here!");
            return false;
        }

        // if there is treasure, tell server to create an instance of it for the player's inventory
        sendAjax('POST', '/addNewTreasure', hasTreasure, function () {
            alert(hasTreasure + ' found and added to inventory!');
        });

        // remove treasure from the grid tile
        setHasTreasure('');
        return false;
    };
    return React.createElement(
        'div',
        { className: 'gridTile', onClick: handleClick },
        React.createElement(
            'p',
            { className: 'label' },
            hasTreasure
        )
    );
};

// A traversable collection of grid tiles
// The chance of treasure is procedurally generated in an array with corresponding indicies
// for each tile on the grid. Default value is passed into the props of each tile
var Grid = function Grid() {
    // Contains the names of treasure in a given grid tile
    var treasArray = ['Holy Grail', '', '', '', '', 'Gold Ore', '', 'Sands of Time Dagger', ''];

    return React.createElement(
        'div',
        { className: 'gridContainer' },
        React.createElement(GridTile, { treasure: treasArray[0] }),
        React.createElement(GridTile, { treasure: treasArray[1] }),
        React.createElement(GridTile, { treasure: treasArray[2] }),
        React.createElement(GridTile, { treasure: treasArray[3] }),
        React.createElement(GridTile, { treasure: treasArray[4] }),
        React.createElement(GridTile, { treasure: treasArray[5] }),
        React.createElement(GridTile, { treasure: treasArray[6] }),
        React.createElement(GridTile, { treasure: treasArray[7] }),
        React.createElement(GridTile, { treasure: treasArray[8] })
    );
};

var setup = function setup() {
    ReactDOM.render(React.createElement(Grid, null), document.querySelector('#app'));
};

$(document).ready(function () {
    setup();
});
"use strict";

var redirect = function redirect(response) {
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr) {
            var messageObj = JSON.parse(xhr.responseText);
            alert(messageObj.error);
        }
    });
};
