import React, { useReducer, useEffect } from "react";
import moment from "moment";
import { get, post } from "Utils";
import Table from "Components/table";
import Button from "Components/button";
import Preloader from "Components/preloader";
import Context from "Context/academic-calendar";
import Reducer, { initialState } from "Reducers/academic-calendar";
import FormModal from "./form-modal";
import TableBody from "./tablebody";
import TableContext from "Context/table";
import "./style.scss";

const AcademicCalendar = () => {
    const url = "/ajax/portal/academic-calendar";
    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = [
        "Activity",
        "From / To",
        "Created At",
        "Updated At",
        "Actions"
    ];

    useEffect(() => {
        get(
            url,
            {},
            res => {
                dispatch({
                    type: "SUCCESS_FETCH",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                });
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

    const handleAdd = (activity, startDate, endDate) => {
        dispatch({ type: "SAVING" });
        post(
            url,
            {
                activity,
                from: moment(startDate).format("YYYY-MM-DD"),
                to: moment(endDate).format("YYYY-MM-DD")
            },
            res =>
                dispatch({
                    type: "SUCCESS_SAVE",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                }),
            () => {
                dispatch({ type: "ERROR_SAVE" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    const handleDelete = id => {
        dispatch({ type: "DELETING" });
        post(
            url,
            {
                id
            },

            res =>
                dispatch({
                    type: "SUCCESS_DELETE",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                }),
            () => {
                dispatch({ type: "ERROR_DELETE" });
                alert("Something went wrong. Please try again");
            },
            "DELETE"
        );
    };

    const handleUpdate = (id, activity, from, to) => {
        dispatch({ type: "UPDATING" });
        from = moment(from).format("YYYY-MM-DD");
        to = moment(to).format("YYYY-MM-DD");
        post(
            url,
            { id, activity, from, to },
            res =>
                dispatch({
                    type: "SUCCESS_UPDATE",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                }),
            () => {
                dispatch({ type: "ERROR_UPDATE" });
                alert("Something went wrong. Please try again");
            },
            "PATCH"
        );
    };

    const handleChangePage = (action, searchBy, search, currentPage) => {
        dispatch({ type: "FETCHING" });
        console.log(currentPage);
        let page = action === "next" ? ++currentPage : --currentPage;
        get(
            url,
            { page },
            res => {
                dispatch({
                    type: "SUCCESS_FETCH",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                });
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    return (
        <Context.Provider
            value={{
                state,
                dispatch,
                url,
                handleDelete,
                handleAdd,
                handleOpenModal,
                handleUpdate
            }}
        >
            <TableContext.Provider value={{ handleChangePage, state }}>
                <div id="AcademicCalendar">
                    <Preloader variant={"fixed"} isActive={state.isLoading} />
                    <Table
                        headers={tableHeaders}
                        hasData={!!state.data.length}
                        customTableBody={<TableBody data={state.data} />}
                        hasAdd={true}
                        addText={"Add New Activity"}
                        handleAdd={() => handleOpenModal()}
                        hasPagination={true}
                    />
                    <FormModal />
                </div>
            </TableContext.Provider>
        </Context.Provider>
    );
};

export default AcademicCalendar;
