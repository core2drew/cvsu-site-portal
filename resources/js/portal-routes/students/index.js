import React, { useReducer, useEffect } from "react";
import { get, post } from "Utils";
import Table from "Components/table";
import Preloader from "Components/preloader";
import Button from "Components/button";
import StudentContext from "Context/students";
import TableContext from "Context/table";
import Reducer, { initialState } from "Reducers/students";
import FormModal from "./form-modal";
import TableBody from "./tablebody";
import InviteStudent from "./invite-student-modal";
import "./style.scss";

const Students = props => {
    const url = "/ajax/portal/students";
    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = [
        "Student Number",
        "Email",
        "First Name",
        "Last Name",
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

    const handleAdd = (firstName, lastName, username, password) => {
        dispatch({ type: "SAVING" });
        post(
            url,
            {
                firstName,
                lastName,
                username,
                password
            },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({
                    type: "SUCCESS_SAVE",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                });
            },
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

    const handleUpdate = (id, firstName, lastName, username, password) => {
        dispatch({ type: "UPDATING" });
        post(
            url,
            { id, firstName, lastName, username, password },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({
                    type: "SUCCESS_UPDATE",
                    data: res.data,
                    currentPage: res.current_page,
                    nextPageUrl: res.next_page_url,
                    prevPageUrl: res.prev_page_url
                });
            },
            () => {
                dispatch({ type: "ERROR_UPDATE" });
                alert("Something went wrong. Please try again");
            },
            "PATCH"
        );
    };

    const handleSearch = (searchBy, search) => {
        dispatch({ type: "FETCHING" });
        get(
            url,
            { searchBy, search },
            res => {
                dispatch({
                    type: "SUCCESS_FETCH",
                    data: res.data,
                    searchBy,
                    search,
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

    const handleChangePage = (action, searchBy, search, currentPage) => {
        dispatch({ type: "FETCHING" });
        let page = action === "next" ? ++currentPage : --currentPage;
        console.log(page);
        get(
            url,
            { searchBy, search, page },
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

    const handleOpenAddNewModal = () => {
        dispatch({ type: "OPEN_ADD_NEW_STUDENT_MODAL" });
    };

    const handleAddNewStudent = ({ studentNo, email }) => {
        console.log(studentNo, email);
    };

    return (
        <StudentContext.Provider
            value={{
                state,
                dispatch,
                handleOpenModal,
                handleAdd,
                handleDelete,
                handleUpdate,
                handleOpenAddNewModal,
                handleAddNewStudent
            }}
        >
            <div id="Students">
                <Preloader variant={"fixed"} isActive={state.isLoading} />
                <TableContext.Provider value={{ handleChangePage, state }}>
                    <Table
                        headers={tableHeaders}
                        hasFilter={true}
                        hasAdd={true}
                        addText={"Invite Student"}
                        handleAdd={handleOpenAddNewModal}
                        filterSearchBy={[
                            {
                                label: "Student No.",
                                value: "student_no"
                            },
                            {
                                label: "First Name",
                                value: "first_name"
                            },
                            {
                                label: "Last Name",
                                value: "last_name"
                            }
                        ]}
                        hasData={!!state.data.length}
                        handleSearch={handleSearch}
                        hasPagination={true}
                        customTableBody={<TableBody data={state.data} />}
                    />
                </TableContext.Provider>
                <FormModal />
                <InviteStudent />
            </div>
        </StudentContext.Provider>
    );
};

export default Students;
