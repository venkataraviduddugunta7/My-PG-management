import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import "./PgButton.scss";

const PgButton = ({
    size = "medium",
    type = "primary",
    icon,
    iconRight,
    children,
    onClick,
    disabled,
    loading,
    htmlType,
    style
}) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            htmlType={htmlType}
            className={`custom-button ${size} ${type}`}
            style={style}
        >
            {icon && <span className="button-icon">{icon}</span>}
            {children}
            {iconRight && <span className="button-icon">{iconRight}</span>}
        </Button>
    );
};

PgButton.propTypes = {
    size: PropTypes.oneOf(["medium", "large"]),
    type: PropTypes.oneOf(["primary", "secondary"]),
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    htmlType: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default PgButton;
