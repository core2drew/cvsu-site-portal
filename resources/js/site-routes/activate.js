import React from "react";
import ActivateForm from "SiteComponents/activate-form";
const Activate = ({ location }) => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
        return (
            <div id="Activate">
                <div className="container grid">
                    <ActivateForm token="token" />
                </div>
            </div>
        );
    }
    return (window.location.href = "/");
};

export default Activate;
