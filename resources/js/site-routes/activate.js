import React, { useEffect, useState } from "react";
import ActivateForm from "SiteComponents/activate-form";
import ErrorMessage from "SiteComponents/error-message";
import Preloader from "Components/preloader";
import { get } from "Utils";
const Activate = ({ location }) => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const url = "/ajax/portal/verify/token";
    const [isValid, setIsValid] = useState();
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsValid(true);
                setIsLoading(false);
                setUserInfo(res);
            },
            () => {
                setIsLoading(false);
            }
        );
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const render = () => {
        if (isLoading) {
            return <Preloader isActive={isLoading} variant={"fixed"} />;
        }

        if (!isLoading && !isValid) {
            return (
                <ErrorMessage title={"Oops, Your access has been denied."} />
            );
        }

        return <ActivateForm {...userInfo} />;
    };

    return (
        <div id="Activate">
            <div className="container grid">{render()}</div>
        </div>
    );
};

export default Activate;
