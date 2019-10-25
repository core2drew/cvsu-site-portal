import React, { useEffect } from "react";
import { post } from "Utils";

const Confirmation = ({ id }) => {
    const url = "/ajax/portal/confirm-account";
    useEffect(() => {
        console.log(id);
        post(url, {
            id
        });
    }, []);
    return (
        <div id="Confirmation">
            <div className="header">
                <h1 className="title">Your account has been activated.</h1>
                <a href="/auth/login">Click here to login</a>
                <p className="message">
                    If you have question please contact the administrator.
                </p>
            </div>
        </div>
    );
};

export default Confirmation;
