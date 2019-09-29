import React, { useContext } from "react";
import { post } from "../../utils";
import Modal from "Components/modal";
import Button from "Components/button";
import CKEditor from "Components/ckeditor";
import Input from "Components/input";
import AnnouncementsContext from "Context/announcements";

const FormModal = () => {
    const {
        title,
        content,
        state,
        setTitle,
        url,
        editorRef,
        announcementIdRef,
        setContent,
        dispatch,
        isUpdateModal
    } = useContext(AnnouncementsContext);

    const clearFields = () => {
        setTitle("");
        setContent("");
        editorRef.current.setData("");
        announcementIdRef.current = null;
    };

    const handleSave = () => {
        dispatch({ type: "SAVING" });
        post(
            url,
            { title, content },
            res => dispatch({ type: "SUCCESS_SAVE", data: res.data }),
            () => {
                dispatch({ type: "ERROR_SAVE" });
                alert("Something went wrong. Please try again");
            }
        );
        clearFields();
    };

    const handleUpdate = id => {
        dispatch({ type: "UPDATING" });
        post(
            url,
            { id, title, content },
            res => dispatch({ type: "SUCCESS_UPDATE", data: res.data }),
            () => {
                dispatch({ type: "ERROR_UPDATE" });
                alert("Something went wrong. Please try again");
            },
            "PATCH"
        );
    };

    return (
        <Modal
            isActive={state.isModalActive}
            handleClose={() => {
                dispatch({ type: "CLOSE_MODAL" });
                clearFields();
            }}
        >
            <h2 className="section header">
                {isUpdateModal ? "Edit Announcement" : "New Announcement"}
            </h2>
            <Input
                variant="title"
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <CKEditor
                id="Editor"
                getEditorRef={editor => (editorRef.current = editor)}
                onChange={data => setContent(data)}
            />
            {state.isUpdateModal ? (
                <Button
                    text="Update"
                    onClick={() => handleUpdate(announcementIdRef.current)}
                />
            ) : (
                <Button text="Create" onClick={handleSave} />
            )}
        </Modal>
    );
};

export default FormModal;
