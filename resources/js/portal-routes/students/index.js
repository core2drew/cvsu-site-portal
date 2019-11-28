import React, { useReducer, useEffect } from "react";
import { get, post } from "Utils";
import Table from "Components/table";
import Preloader from "Components/preloader";
import StudentContext from "Context/students";
import TableContext from "Context/table";
import Reducer, { initialState } from "Reducers/students";
import FormModal from "./form-modal";
import TableBody from "./tablebody";
import InviteStudent from "./invite-student-modal";
import Toast from "Components/toast";
import ConfirmModal from "Components/confirm-modal";
import "./style.scss";

const Students = props => {
    const url = "/ajax/portal/students";
    const inviteUrl = "/ajax/portal/invite/student";
    const resendInviteUrl = "/ajax/portal/resend/invite/student";

    const [state, dispatch] = useReducer(Reducer, initialState);
    const tableHeaders = [
        "Student Number",
        "Email",
        "First Name",
        "Last Name",
        "Actions"
    ];

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

    const handleUpdate = (id, firstName, lastName) => {
        dispatch({ type: "UPDATING" });
        post(
            url,
            { id, firstName, lastName },
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

    const handleOpenInviteStudentModal = () => {
        dispatch({ type: "OPEN_INVITE_STUDENT_MODAL" });
    };

    const handleInvitation = ({ studentNo, email, is_confirm, id }) => {
        dispatch({ type: "INVITING" });
        post(
            inviteUrl,
            { studentNo, email, is_confirm, id },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({ type: "SUCCESS_INVITE" });
                alert("Invite has been sent");
                initTable();
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    const handleResendInvitation = (studentNo, email, id) => {
        dispatch({ type: "INVITING" });
        post(
            resendInviteUrl,
            { studentNo, email, id },
            res => {
                if (res.status > 200) {
                    dispatch({ type: "ERROR_SAVE" });
                    alert(res.message);
                    return;
                }
                dispatch({ type: "SUCCESS_INVITE" });
                alert("Invite has been resent.");
                initTable();
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again");
            }
        );
    };

    const confirmDelete = id => {
        dispatch({ type: "SHOW_CONFIRM_DELETE", id });
    };

    const closeConfirmDelete = () => {
        dispatch({ type: "CLOSE_CONFIRM_DELETE" });
    };

    return (
        <StudentContext.Provider
            value={{
                state,
                dispatch,
                handleOpenModal,
                handleUpdate,
                handleOpenInviteStudentModal,
                handleInvitation,
                handleResendInvitation,
                confirmDelete
            }}
        >
            <div id="Students">
                <Preloader variant={"fixed"} isActive={state.isLoading} />
                <Toast>Invite sent.</Toast>
                <TableContext.Provider value={{ handleChangePage, state }}>
                    <Table
                        headers={tableHeaders}
                        hasFilter={true}
                        hasAdd={false}
                        addText={"Invite Student"}
                        handleAdd={handleOpenInviteStudentModal}
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
                <ConfirmModal
                    title="Confirm Delete Student"
                    close={closeConfirmDelete}
                    isActive={state.isConfirmDeleteActive}
                    confirm={() => {
                        handleDelete(state.deleteStudentId);
                    }}
                >
                    <p>Are you sure you want to delete this student?</p>
                </ConfirmModal>
                <InviteStudent />
            </div>
        </StudentContext.Provider>
    );
};

export default Students;
