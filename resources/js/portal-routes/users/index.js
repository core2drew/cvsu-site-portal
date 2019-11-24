import React, { useReducer, useEffect } from "react";
import { get, post } from "Utils";
import Table from "Components/table";
import Preloader from "Components/preloader";
import Button from "Components/button";
import Context from "Context/users";
import Reducer, { initialState } from "Reducers/users";
import FormModal from "./form-modal";
import TableBody from "./tablebody";
import ConfirmModal from "Components/confirm-modal";
import "./style.scss";

const Users = () => {
    const url = "/ajax/portal/users";
    const inviteUrl = "/ajax/portal/invite/user";
    const resendInviteUrl = "/ajax/portal/resend/invite/user";
    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = ["Email", "First Name", "Last Name", "Actions"];

    const initUser = () => {
        get(
            url,
            {},
            res => {
                console.log(res.data);
                dispatch({ type: "SUCCESS_FETCH", data: res.data });
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    useEffect(() => {
        initUser();
    }, []);

    const handleOpenModal = id => {
        if (id) {
            dispatch({ type: "OPEN_UPDATE_MODAL", id });
        } else {
            dispatch({ type: "OPEN_MODAL" });
        }
    };

    const handleInvite = values => {
        dispatch({ type: "INVITING" });
        const { firstName, lastName, email } = values;
        post(
            inviteUrl,
            {
                email: email.value,
                firstName: firstName.value,
                lastName: lastName.value
            },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({ type: "SUCCESS_INVITE" });
                alert("Invite has been resent.");
                initUser();
            },
            () => {
                dispatch({ type: "ERROR_SAVE" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    const handleResendInvitation = ({ firstName, lastName, email }) => {
        dispatch({ type: "INVITING" });
        post(
            resendInviteUrl,
            {
                email,
                firstName,
                lastName
            },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({ type: "SUCCESS_INVITE" });
                alert("Invite has been sent.");
                initUser();
            },
            () => {
                dispatch({ type: "ERROR_SAVE" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    const confirmDelete = id => {
        dispatch({ type: "SHOW_CONFIRM_DELETE", id });
    };

    const handleDelete = id => {
        dispatch({ type: "DELETING" });
        post(
            url,
            {
                id
            },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_DELETE" });
                    alert(res.message);
                    return;
                }
                dispatch({ type: "SUCCESS_DELETE", data: res.data });
            },
            () => {
                dispatch({ type: "ERROR_DELETE" });
                alert("Something went wrong. Please try again");
            },
            "DELETE"
        );
    };

    return (
        <Context.Provider
            value={{
                state,
                dispatch,
                handleOpenModal,
                handleInvite,
                handleResendInvitation,
                handleDelete,
                confirmDelete
            }}
        >
            <div id="Users">
                <Preloader variant={"fixed"} isActive={state.isLoading} />
                <Button text="Invite User" onClick={() => handleOpenModal()} />
                <Table
                    headers={tableHeaders}
                    hasData={state.data && !!state.data.length}
                    customTableBody={<TableBody data={state.data} />}
                />
                <FormModal />
                <ConfirmModal title="Confirm Delete User">
                    <p>Are you sure you want to delete this users?</p>
                </ConfirmModal>
            </div>
        </Context.Provider>
    );
};

export default Users;
