import React, { useState } from "react";
import ReactDOM from "react-dom";
import { post } from "Utils";
import Button from "Components/button";
import Input from "Components/input";
import Preloader from "Components/preloader";
import SignUpModal from "LoginComponents/signup-modal";

const App = () => {
    // const [isSignUpModalActive, setSignUpModalActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            alert("Required Email and Password");
            return;
        }

        setIsLoading(true);
        post(
            "/ajax/login",
            { email, password },
            function(res) {
                if (res.id) {
                    window.location.replace("/portal");
                    return;
                }
                setIsLoading(false);
                alert("Something went wrong. Please try again.");
            },
            function() {
                setIsLoading(false);
                alert("Incorrect Email or Password");
            }
        );
    };

    const handleOnKeyPress = e => {
        if (e.charCode === 13) {
            handleLogin();
        }
    };

    return (
        <React.Fragment>
            <div className="login-container">
                <h1 id="Greet">Welcome to CvSU Portal</h1>
                <div id="Login">
                    <Preloader isActive={isLoading} variant={"fixed"} />
                    <h3 className="title">Log In</h3>
                    <Input
                        value={email}
                        onChange={value => setEmail(value)}
                        onKeyPress={handleOnKeyPress}
                        label="Email"
                    />
                    <Input
                        value={password}
                        onChange={value => setPassword(value)}
                        onKeyPress={handleOnKeyPress}
                        label="Password"
                        type={"password"}
                    />

                    <Button text={"Log In"} onClick={handleLogin} />
                    <div className="footer">
                        {/* <Button
                        text={"Sign up"}
                        variant={"-tertiary"}
                        onClick={() => setSignUpModalActive(true)}
                    /> */}
                        {/* <Button text={'Forget Password'} variant={'tertiary'} />  */}
                    </div>
                </div>
            </div>
            {/* <SignUpModal isActive={isSignUpModalActive} handleClose={() => setSignUpModalActive(false)}/> */}
        </React.Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById("App"));
