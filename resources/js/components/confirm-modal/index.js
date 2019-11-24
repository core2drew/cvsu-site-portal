import React, { useContext } from "react";
import Modal from "../modal";
import Button from "Components/button";
import Context from "Context/users";
import "./style.scss";

const ConfirmModal = ({ title, confirm, children }) => {
    const { state, dispatch, handleDelete } = useContext(Context);

    const handleClose = () => {
        dispatch({ type: "CLOSE_CONFIRM_DELETE" });
    };

    return (
        <Modal
            variant="confirm-delete-modal"
            isActive={state.isConfirmDeleteActive}
            handleClose={handleClose}
        >
            <h2 className="section header">{title}</h2>
            <div className="modal-body">{children}</div>
            <div className="action">
                <Button
                    text="Yes"
                    onClick={() => {
                        handleDelete(state.deleteUserId);
                    }}
                />
                <Button text="No" variant="-danger" onClick={handleClose} />
            </div>
        </Modal>
    );
};

export default ConfirmModal;
