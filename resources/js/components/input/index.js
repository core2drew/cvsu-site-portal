import React from "react";
import classname from "classnames";
import Icon from "Components/icon";
import "./style.scss";

const Input = props => (
    <div
        id={props.id}
        className={classname(
            "input",
            {
                error: props.error
            },
            props.variant
        )}
    >
        {props.label && <label className="label">{props.label}</label>}
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={e => {
                props.onChange(e.target.value, props.name);
            }}
            onKeyPress={props.onKeyPress}
            value={props.value}
        />
        {props.footNote && (
            <small className="foot-note">{props.footNote}</small>
        )}
        {props.errorMessage && (
            <small className="foot-note error-message">
                {props.errorMessage}
            </small>
        )}
        {props.hasOwnProperty("required") ? (
            <span className="required-corner">
                <Icon icon="asterisk" />
            </span>
        ) : null}
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
