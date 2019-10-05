import React from "react";

const Toast = props => (
    <div
        id={props.id}
        className={classnames(`toast ${props.variant}`, {
            active: props.isActive
        })}
    >
        <div className="content">{props.children}</div>
    </div>
);

export default Toast;
