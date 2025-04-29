import React from "react";
import { Card, Col, Row, Tooltip } from "antd";
import "./LoadTypeModal.css";
import SectionCard from "../SectionCard";
import DrayageIcons, { DrayageInfoIcon } from "../../stories/DrayageIcons";
import OrderTypeCard from "../../components/OrderTypeCard/OrderTypeCard";

const LoadTypeModal = ({ title, description, loadTypes = [], onCancel, onSelect }) => {
    const handleLoadTypeSelect = (loadType) => {
        if (onSelect) {
            onSelect(loadType);
        }
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <SectionCard
            title={
                <div>
                    <Row className="load-type-modal-title">{title || "Select Move Type"}</Row>
                    {description && (
                        <Row className="load-type-modal-title-description">{description}</Row>
                    )}
                </div>
            }
            extra={
                <Tooltip title="Close">
                    <div onClick={onCancel} style={{ cursor: "pointer" }}>
                        <DrayageIcons.ModalClose />
                    </div>
                </Tooltip>
            }
            hoverable={false}
            style={{ width: "1024px" }}
        >
            <Row gutter={[16, 16]}>
                {loadTypes.map((load) => {
                    const iconKey = load.label.replace(/\s|&/g, '');
                    const IconComponent = DrayageIcons[iconKey] || DrayageInfoIcon; 

                    return (
                        <Col key={load.key} span={8}>
                            <div className="load-type-card-wrapper">
                                <OrderTypeCard
                                    icon={IconComponent && <IconComponent />}
                                    label={load.label}
                                    info={load.info}
                                    description={load.info}
                                    onClick={() => handleLoadTypeSelect(load)}
                                />
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </SectionCard>
    );
};

export default LoadTypeModal;
