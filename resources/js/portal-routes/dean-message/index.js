import React, { useEffect, useState } from "react";
import { get, post } from "Utils";
import CKEditor from "Components/ckeditor";
import Button from "Components/button";
import Preloader from "Components/preloader";
import "./style.scss";

const DeanMessage = () => {
    const url = "/ajax/portal/dean-message";
    const [isLoading, setIsLoading] = useState(true);
    const [initialMessage, setInitialMessage] = useState("");
    const [message, setMessage] = useState("");

    const handleEditor = data => {
        setMessage(data);
    };

    const handleSave = () => {
        post(
            url,
            { message },
            () => alert("Message Save"),
            () => alert("Something went wrong")
        );
    };

    useEffect(() => {
        get(
            url,
            {},
            res => {
                setMessage(res.message);
                setInitialMessage(res.message);
                setIsLoading(false);
            },
            () => {
                alert("Something went wrong. Please try again");
                setIsLoading(false);
            }
        );
    }, []);

    return (
        <div id="DeanMessage">
            <Preloader variant={"fixed"} isActive={isLoading} />
            <CKEditor
                id="Editor"
                onChange={handleEditor}
                value={message}
                initialValue={initialMessage}
                height={500}
            />
            <Button id="Save" text={"Save"} onClick={handleSave} />
        </div>
    );
};

export default DeanMessage;
