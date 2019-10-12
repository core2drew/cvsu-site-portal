import React, { useContext } from "react";
import Button from "Components/button";
import Uuid from "uuid/v4";
import AcademicCalendarContext from "Context/users";
import Pill from "Components/pill";
const TableBody = ({ data }) => {
    const { handleDelete } = useContext(AcademicCalendarContext);
    return (
        <tbody>
            {data.map(d => {
                const isAwait = !!d.is_await;
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
                                variant={"delete -danger"}
                                text={isAwait ? "Revoke" : "Delete"}
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
