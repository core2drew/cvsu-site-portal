import React from "react";
import Uuid from "uuid/v4";
import classname from "classnames";
import Dropdown from "Components/dropdown";
import Actions from "./actions";
import "./style.scss";

const TableHeader = props => (
    <thead>
        <tr>
            {props.headers.map(header => (
                <th key={Uuid()}>{header}</th>
            ))}
        </tr>
    </thead>
);

const TableData = props =>
    props.items.map(item => <td key={Uuid()}>{item}</td>);

const TableBody = props => (
    <tbody>
        {props.items.map(item => (
            <tr key={Uuid()}>
                <TableData items={item} />
            </tr>
        ))}
    </tbody>
);

const Table = ({
    id,
    variant,
    headers,
    customTableBody,
    items,
    hasData,
    customFilterAction,
    hasFilter,
    handleSearch,
    filterSearchBy,
    hasAdd,
    addText,
    handleAdd,
    hasPagination,
    action
}) => (
    <div id={id} className={classname("table-container", variant)}>
        <Actions
            customFilterAction={customFilterAction}
            hasFilter={hasFilter}
            handleSearch={handleSearch}
            filterSearchBy={filterSearchBy}
            hasAdd={hasAdd}
            addText={addText}
            handleAdd={handleAdd}
            hasPagination={hasPagination}
        >
            {action}
        </Actions>
        <table>
            <TableHeader headers={headers} />
            {customTableBody || <TableBody items={items} />}
        </table>
        {hasData || <div className="no-data">No data available</div>}
    </div>
);

Table.defaultProps = {
    headers: [],
    items: [],
    customTableBody: null,
    hasData: false,
    customFilterAction: null,
    hasFilter: false,
    filterSearchBy: [],
    handleSearch: () => false,
    hasAdd: false,
    addText: "Add New Student",
    handleAdd: () => false,
    hasPagination: false
};

export default Table;
