import React, { useEffect } from "react";
import ActivateForm from "SiteComponents/activate-form";
import { get } from "Utils";
const Activate = ({ location }) => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const url = "/ajax/portal/verify/token";

    const verifyToken = () => {
        if (!token) {
            return window.location.replace("/");
        }
        get(
            url,
            {
                token
            },
            res => {
                if (res.status > 200) {
                    alert(res.message);
                    window.location.replace("/");
                    return;
                }
            },
            () => {
                alert("Something went wrong. Please try again");
            }
        );
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div id="Activate">
            <div className="container grid">
                <ActivateForm token={token} />
            </div>
        </div>
    );
};

export default Activate;
