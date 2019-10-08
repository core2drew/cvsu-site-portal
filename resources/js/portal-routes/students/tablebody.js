import React, { useContext } from "react";
import moment from "moment";
import Button from "Components/button";
import Uuid from "uuid/v4";
import StudentContext from "Context/students";
import Pill from "Components/pill";
const TableBody = ({ data }) => {
    const { handleDelete, handleOpenModal } = useContext(StudentContext);

    return (
        <tbody>
            {data.map(d => {
                const isAwait = !!d.is_await;
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
                            <p className="student_no">{d.student_no}</p>
                            {isAwait && <Pill>Awaiting invite response</Pill>}
                        </td>
                        <td>{d.email}</td>
                        <td>{d.first_name}</td>
                        <td>{d.last_name}</td>
                        <td className="actions">
                            <Button
                                variant={"update"}
                                text={"Update"}
                                onClick={() => handleOpenModal(d.id)}
                            />
                            <Button
                                variant={"delete -danger"}
                                text={"Delete"}
                                onClick={() => handleDelete(d.id)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
