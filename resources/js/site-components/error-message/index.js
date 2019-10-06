import React from "react";
import "./style.scss";

const ErrorMessage = props => {
    const title =
        props.title ||
        "Either you have poor network connectivity, your access has been denied or something went wrong on our side.";
    const message = props.message || "Try refreshing this page.";
    return (
        <div id="ErrorMessage">
            <div className="container grid">
                <div className="title-container">
                    <h1 className="title">{title}</h1>
                    <h3 className="message">{message}</h3>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
