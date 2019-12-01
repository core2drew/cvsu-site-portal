import React, { useReducer, useEffect } from "react";
import { get, post } from "Utils";
import Table from "Components/table";
import Preloader from "Components/preloader";
import Reducer, { initialState } from "Reducers/facilities";
import FacilitiesContext from "Context/facilities";
import FormModal from "./form-modal";
import ConfirmModal from "Components/confirm-modal";
import "./style.scss";

const Facilities = () => {
    const url = "/ajax/portal/facilities";
    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = ["Facility Name", "Images", "Actions"];

    const handleOpenModal = () => {
        dispatch({ type: "OPEN_MODAL" });
    };
    const handleUpdateModal = id => {
        dispatch({ type: "OPEN_UPDATE_MODAL", id });
    };
    const confirmDelete = id => {
        dispatch({ type: "SHOW_CONFIRM_DELETE", id });
    };

    const closeConfirmDelete = () => {
        dispatch({ type: "CLOSE_CONFIRM_DELETE" });
    };

    useEffect(() => {
        initTable();
    }, []);

    const initTable = () => {
        dispatch({ type: "FETCHING" });
        get(
            url,
            {},
            res => {
                dispatch({
                    type: "SUCCESS_FETCH",
                    data: res.data
                });
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    return (
        <FacilitiesContext.Provider
            value={{
                state,
                dispatch,
                handleOpenModal,
                handleUpdateModal,
                confirmDelete
            }}
        >
            <div id="Facilities">
                <Preloader variant={"fixed"} isActive={state.isLoading} />
                <Table
                    headers={tableHeaders}
                    hasAdd={true}
                    addText={"New Facility"}
                    handleAdd={handleOpenModal}
                />
                <FormModal />
                <ConfirmModal
                    title="Confirm Delete Facility"
                    close={closeConfirmDelete}
                    isActive={state.isConfirmDeleteActive}
                    confirm={() => {
                        handleDelete(state.selectedId);
                    }}
                >
                    <p>Are you sure you want to delete this facility?</p>
                </ConfirmModal>
            </div>
        </FacilitiesContext.Provider>
    );
};

export default Facilities;
