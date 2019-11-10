"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React components for handling the game client and window

// A clickable div that may or may not contain treasure. Will later
// contain the player and can be navigated to/from using buttons
// Uses state to keep track of component state and change it dynamically
var GridTile = function (_React$Component) {
    _inherits(GridTile, _React$Component);

    function GridTile(props) {
        _classCallCheck(this, GridTile);

        var _this = _possibleConstructorReturn(this, (GridTile.__proto__ || Object.getPrototypeOf(GridTile)).call(this, props));

        _this.state = {
            hasTreasure: props.treasure // stores the NAME of the treasure on the tile. Empty == ""
            // hasPlayer: props.hasPlayer
        };

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(GridTile, [{
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();

            if (this.state.hasTreasure == '') {
                alert("No treasure here!");
                return false;
            }

            // if there is treasure, tell server to create an instance of it for the player's inventory
            sendAjax('POST', '/makeTreasure', this.state.hasTreasure, alert(this.state.hasTreasure + ' found and added to inventory!'));

            // remove treasure from the grid tile
            this.setState({ hasTreasure: '' });
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'gridTile col-lg-4 col-md-4 col-sm-4 col-4', onClick: this.handleClick },
                React.createElement(
                    'p',
                    { className: 'label' },
                    this.state.hasTreasure
                )
            );
        }
    }]);

    return GridTile;
}(React.Component);

;

// A traversable collection of grid tiles
// The chance of treasure is procedurally generated in an array with corresponding indicies
// for each tile on the grid. Default value is passed into the props of each tile
var Grid = function Grid(props) {
    // Contains the names of treasure in a given grid tile. Hardcoded for now
    // Issues - refreshing the page adds these back in. Need to pull in from server?
    var treasArray = ['Holy Grail', '', '', '', '', 'Gold Ore', '', 'Dagger of Time', ''];

    return React.createElement(
        'div',
        { className: 'gridContainer container' },
        React.createElement(
            'div',
            { className: 'row content-justify-center' },
            React.createElement(GridTile, { treasure: treasArray[0], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[1], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[2], csrf: props.csrf })
        ),
        React.createElement(
            'div',
            { className: 'row content-justify-center' },
            React.createElement(GridTile, { treasure: treasArray[3], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[4], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[5], csrf: props.csrf })
        ),
        React.createElement(
            'div',
            { className: 'row content-justify-center' },
            React.createElement(GridTile, { treasure: treasArray[6], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[7], csrf: props.csrf }),
            React.createElement(GridTile, { treasure: treasArray[8], csrf: props.csrf })
        )
    );
};

var Inventory = function Inventory(props) {
    if (props.items.length === 0) {
        return React.createElement(
            'div',
            { className: 'itemList' },
            React.createElement(
                'h3',
                null,
                'You have nothing in your inventory yet.'
            )
        );
    }

    var itemTiles = props.items.map(function (item) {
        return React.createElement(
            'div',
            { key: item.name, className: 'inventoryItem' },
            React.createElement(
                'h3',
                { className: 'itemName' },
                'Name: ',
                item.name
            ),
            React.createElement(
                'h3',
                { className: 'itemValue' },
                'Value: ',
                item.value
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'itemList' },
        itemTiles
    );
};

var loadInventoryFromServer = function loadInventoryFromServer() {
    sendAjax('GET', '/getTreasure', null, function (data) {
        ReactDOM.render(React.createElement(Inventory, { items: data.treasure }), document.querySelector("#inventory"));
    });
};

var setup = function setup(csrfToken) {
    ReactDOM.render(React.createElement(Grid, { csrf: csrfToken }), document.querySelector('#app'));
    ReactDOM.render(React.createElement(Inventory, { items: [] }), document.querySelector("#inventory"));

    loadInventoryFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
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
