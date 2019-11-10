const handleLogin = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val == '') {
        alert("Username or password is empty.");
        return false;
    }

    console.log($("input[name=_csrf]").val());
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val == '' || $("#pass2").val() == '') {
        alert("All fields are required.");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};

const LoginWindow = (props) => {
    return(
        <form id = "loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <div className="form-group container">
                <label htmlFor="username">Username: </label>
                <input id="user" className="form-control" type="text" name="username" placeholder="username"/>
            </div>

            <div className="form-group container">
                <label htmlFor="pass">Password: </label>
                <input id="pass" className="form-control" type="password" name="pass" placeholder="password"/>
            </div>

            <div className="form-group container">
                <input type="hidden" name="_csrf" value={props.csrf}/>
                <input className="formSubmit btn btn-primary" type="submit" value="Sign in"/>
            </div>
        </form>
    );
};

const SignupWindow = (props) => {
    return(
        <form id = "signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <div className="form-group container">
                <label htmlFor="username">Username: </label>
                <input id="user" className="form-control" type="text" name="username" placeholder="username"/>
            </div>

            <div className="form-group container">
                <label htmlFor="pass">Password: </label>
                <input id="pass" className="form-control" type="password" name="pass" placeholder="password"/>
            </div>

            <div className="form-group container">
                <label htmlFor="pass2">Password: </label>
                <input id="pass2" className="form-control" type="password" name="pass2" placeholder="retype password"/>
            </div>

            <div className="form-group container">
                <input type="hidden" name="_csrf" value={props.csrf}/>
                <input className="formSubmit btn btn-primary" type="submit" value="Sign up"/>
            </div>
        </form>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});