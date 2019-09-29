import React from "react";

const Icon = props => (
    <i
        onClick={props.onClick}
        className={`icon icon-${props.icon} ${props.variant}`}
    ></i>
);

Icon.defaultProps = {
    icon: "",
    variant: "",
    onClick: () => false
};

export default Icon;
