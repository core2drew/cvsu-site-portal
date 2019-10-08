import React from "react";
import classnames from "classnames";
import "./style.scss";

const Pill = props => {
    return (
        <span className={classnames("pill", props.class)}>
            {props.children}
        </span>
    );
};

export default Pill;
