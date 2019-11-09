"use strict";

// the upper navigation menu present throughout the entire application
var Navbar = function Navbar() {
    return React.createElement(
        "nav",
        null,
        React.createElement("a", { href: "/login" }),
        React.createElement(
            "div",
            { "class": "navlink" },
            React.createElement(
                "a",
                { id: "loginButton", href: "/login" },
                "Login"
            )
        ),
        React.createElement(
            "div",
            { "class": "navlink" },
            React.createElement(
                "a",
                { id: "signupButton", href: "/signup" },
                "Sign up"
            )
        )
    );
};

var setup = function setup() {
    ReactDOM.render(React.createElement(Navbar, null), document.querySelector("#navroot"));
};

window.onload = setup();
