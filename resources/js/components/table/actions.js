import React from "react";
import FilterAction from "./filter-action";
import Pagination from "./pagination";
import Button from "Components/button";

const Actions = ({
    customFilterAction,
    hasFilter,
    handleSearch,
    filterSearchBy,
    hasPagination,
    hasAdd,
    addText,
    handleAdd,
    children
}) => (
    <div className="actions">
        <Button
            variant="add-button"
            isVisible={hasAdd}
            text={addText}
            onClick={handleAdd}
        />
        {customFilterAction || (
            <FilterAction
                isVisible={hasFilter}
                handleSearch={handleSearch}
                filterSearchBy={filterSearchBy}
            />
        )}
        <Pagination isVisible={hasPagination} />
    </div>
);

export default Actions;
