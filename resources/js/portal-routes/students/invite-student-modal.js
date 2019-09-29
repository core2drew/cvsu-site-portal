import React, { useState, useEffect, useContext } from "react";
import Button from "Components/button";
import Input from "Components/input";
import Modal from "Components/modal";
import Context from "Context/students";

const InviteStudent = () => {
    const [studentNo, setStudentNo] = useState("");
    const [email, setEmail] = useState("");
    const { state, dispatch, handleAddNewStudent } = useContext(Context);
    return (
        <Modal
            isActive={state.isInviteStudentModalActive}
            handleClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
            <h2 className="section header">{state.inviteStudentHeader}</h2>
            <Input
                label={"Student Number"}
                onChange={e => setStudentNo(e.target.value)}
                value={studentNo}
            />
            <Input
                label={"Email"}
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <Button
                text="Invite"
                onClick={() =>
                    handleUpdate(
                        state.selectedId,
                        first_name,
                        last_name,
                        username
                    )
                }
            />
        </Modal>
    );
};

export default InviteStudent;
