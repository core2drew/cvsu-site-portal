import React from "react";
import Modal from "../modal";
import Button from "Components/button";
import "./style.scss";

const ConfirmModal = ({ title, confirm, close, children, isActive }) => {
    return (
        <Modal
            variant="confirm-delete-modal"
            isActive={isActive}
            handleClose={close}
        >
            <h2 className="section header">{title}</h2>
            <div className="modal-body">{children}</div>
            <div className="action">
                <Button text="Yes" onClick={confirm} />
                <Button text="No" variant="-danger" onClick={close} />
            </div>
        </Modal>
    );
};

export default ConfirmModal;
