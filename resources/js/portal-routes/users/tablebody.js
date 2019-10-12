import React, { useContext } from "react";
import moment from "moment";
import Button from "Components/button";
import Uuid from "uuid/v4";
import AcademicCalendarContext from "Context/users";
import Pill from "Components/pill";
const TableBody = ({ data }) => {
    const { handleDelete, handleOpenModal } = useContext(
        AcademicCalendarContext
    );

    return (
        <tbody>
            {data.map(d => {
                const isAwait = !!d.is_await;
                let created_at = moment
                    .utc(d.created_at)
                    .local()
                    .format("MMMM DD, YYYY");
                let updated_at = moment
                    .utc(d.updated_at)
                    .local()
                    .format("MMMM DD, YYYY");

                return (
                    <tr key={Uuid()}>
                        <td>
                            <p className="email">{d.email}</p>
                            {isAwait && <Pill>Awaiting invite response</Pill>}
                        </td>
                        <td>{d.first_name}</td>
                        <td>{d.last_name}</td>
                        <td className="actions">
                            <Button
                                variant={"update"}
                                text={"Edit"}
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
