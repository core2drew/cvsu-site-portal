import React, { useReducer, useEffect } from "react";
import { get, post } from "Utils";
import Table from "Components/table";
import Preloader from "Components/preloader";
import Button from "Components/button";
import Context from "Context/users";
import Reducer, { initialState } from "Reducers/users";
import FormModal from "./form-modal";
import TableBody from "./tablebody";
import "./style.scss";

const Users = () => {
    const url = "/ajax/portal/users";
    const inviteUrl = "/ajax/portal/invite/user";
    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = ["Email", "First Name", "Last Name", "Actions"];

    useEffect(() => {
        get(
            url,
            {},
            res => {
                dispatch({ type: "SUCCESS_FETCH", data: res.data });
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    }, []);

    const handleOpenModal = id => {
        if (id) {
            dispatch({ type: "OPEN_UPDATE_MODAL", id });
        } else {
            dispatch({ type: "OPEN_MODAL" });
        }
    };

    const handleInvite = values => {
        dispatch({ type: "SAVING" });
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
                dispatch({ type: "SUCCESS_SAVE", data: res.data });
            },
            () => {
                dispatch({ type: "ERROR_SAVE" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    return (
        <Context.Provider
            value={{
                state,
                dispatch,
                handleOpenModal,
                handleInvite
            }}
        >
            <div id="Users">
                <Preloader variant={"fixed"} isActive={state.isLoading} />
                <Button text="Invite User" onClick={() => handleOpenModal()} />
                <Table
                    headers={tableHeaders}
                    hasData={!!state.data.length}
                    customTableBody={<TableBody data={state.data} />}
                />
                <FormModal />
            </div>
        </Context.Provider>
    );
};

export default Users;
