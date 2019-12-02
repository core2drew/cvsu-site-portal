import React, { useEffect, useReducer, useState } from "react";
import Reducer, { initialState } from "Reducers/student-info";
import Preloader from "Components/preloader";
import { get } from "Utils";
import ReportCards from "./report-card";
import Dropdown from "Components/dropdown";
import "./style.scss";
const Info = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [schoolYears, setSchoolYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    const prepareSchoolYears = years => {
        const schoolYears = years.map(d => {
            return {
                label: d,
                value: d
            };
        });
        setSchoolYears(schoolYears);
    };

    const prepareSemesters = sems => {
        const semesters = sems.map(d => {
            return {
                label: d,
                value: d
            };
        });
        setSemesters(semesters);
    };

    useEffect(() => {
        dispatch({ type: "FETCHING" });
        get(
            "/ajax/portal/student",
            {},
            res => {
                dispatch({
                    type: "SUCCESS_FETCH",
                    studentNo: res.studentNo,
                    name: `${res.lastName}, ${res.firstName}`,
                    schoolYears: res.schoolYears,
                    semesters: res.semesters,
                    grades: res.grades
                });
                prepareSchoolYears(res.schoolYears);
                prepareSemesters(res.semesters);
            },
            () => {
                dispatch({ type: "ERROR_FETCH" });
                alert("Something went wrong. Please try again.");
            }
        );
    }, []);

    const handleChangeSchoolYear = value => {
        setSelectedSchoolYear(value);
    };

    const handleChangeSemester = value => {
        setSelectedSemester(value);
    };

    return (
        <div id="StudentInfo">
            <Preloader variant={"fixed"} isActive={state.isLoading} />
            <h3>Student No.: {state.studentNo}</h3>
            <h3>Name: {state.name}</h3>
            <div className="action">
                <Dropdown
                    items={schoolYears}
                    placeHolder="School Years"
                    onChange={value => handleChangeSchoolYear(value)}
                />
                <Dropdown
                    items={semesters}
                    placeHolder="Semesters"
                    onChange={value => handleChangeSemester(value)}
                />
            </div>
            <ReportCards
                schoolYear={selectedSchoolYear}
                semester={selectedSemester}
                grades={state.grades}
            />
        </div>
    );
};

export default Info;
