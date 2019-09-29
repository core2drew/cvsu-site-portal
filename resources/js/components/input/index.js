import React from "react";
import classname from "classnames";
import Icon from "Components/icon";
import "./style.scss";

const Input = props => (
    <div id={props.id} className={classname("input", props.variant)}>
        {props.label && <label className="label">{props.label}</label>}
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
        <span class="required-corner">
            <Icon icon="asterisk" />
        </span>
    </div>
);

Input.defaultProps = {
    id: null,
    variant: "",
    placeholder: "",
    value: "",
    type: "text",
    label: ""
};

export default Input;
