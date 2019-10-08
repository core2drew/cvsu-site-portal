import React from "react";
import classnames from "classnames";
import "./style.scss";
const Toast = props => {
    return (
        <div
            id={props.id}
            className={classnames(`toast ${props.variant}`, {
                active: props.isActive
            })}
        >
            <div className="content">{props.children}</div>
        </div>
    );
};

export default Toast;
