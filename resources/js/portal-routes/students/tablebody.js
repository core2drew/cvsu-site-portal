import React, { useContext } from "react";
import moment from "moment";
import Button from "Components/button";
import Uuid from "uuid/v4";
import StudentContext from "Context/students";
import Pill from "Components/pill";
const TableBody = ({ data }) => {
    const {
        handleDelete,
        handleOpenModal,
        handleInvitation,
        confirmDelete
    } = useContext(StudentContext);

    return (
        <tbody>
            {data.map(d => {
                const studentNo = d.student_no;
                const email = d.email;
                const id = d.id;
                const isAwait = !!d.is_await;
                const isConfirm = !!d.is_confirm;
                // let created_at = moment
                //     .utc(d.created_at)
                //     .local()
                //     .format("MMMM DD, YYYY");
                // let updated_at = moment
                //     .utc(d.updated_at)
                //     .local()
                //     .format("MMMM DD, YYYY");

                return (
                    <tr key={Uuid()}>
                        <td>
                            <p className="student_no">{studentNo}</p>
                            {!isConfirm && <Pill>Awaiting confirmation</Pill>}
                            {isConfirm && isAwait && (
                                <Pill>Awaiting activition</Pill>
                            )}
                        </td>
                        <td>{email}</td>
                        <td>{d.first_name}</td>
                        <td>{d.last_name}</td>
                        <td className="actions">
                            <Button
                                isVisible={isAwait || !isConfirm}
                                variant={"update"}
                                text={!isConfirm ? "Confirm" : "Resend"}
                                onClick={() =>
                                    handleInvitation({
                                        studentNo,
                                        email,
                                        is_confirm: isConfirm,
                                        id
                                    })
                                }
                            />
                            <Button
                                variant={"delete -danger"}
                                text={"Delete"}
                                onClick={() => confirmDelete(id)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
