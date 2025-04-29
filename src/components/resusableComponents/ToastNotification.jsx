import React from "react";
import { notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./ToastNotification.scss";

const ToastNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description, duration = 4.5) => {
    let icon;
    let className;

    switch (type) {
      case "success":
        icon = <CheckCircleOutlined className="toast-icon-success" />;
        className = "toast-notification-success";
        break;
      case "error":
        icon = <CloseCircleOutlined className="toast-icon-error" />;
        className = "toast-notification-error";
        break;
      case "warning":
        icon = <ExclamationCircleOutlined className="toast-icon-warning" />;
        className = "toast-notification-warning";
        break;
      case "info":
        icon = <InfoCircleOutlined className="toast-icon-info" />;
        className = "toast-notification-info";
        break;
      default:
        icon = <InfoCircleOutlined className="toast-icon-info" />;
        className = "toast-notification-info";
    }

    api[type]({
      message,
      description,
      icon,
      className,
      placement: "topRight",
      duration,
    });
  };

  return {
    contextHolder,
    showSuccess: (message, description, duration) =>
      openNotification("success", message, description, duration),
    showError: (message, description, duration) =>
      openNotification("error", message, description, duration),
    showWarning: (message, description, duration) =>
      openNotification("warning", message, description, duration),
    showInfo: (message, description, duration) =>
      openNotification("info", message, description, duration),
  };
};

export default ToastNotification;
