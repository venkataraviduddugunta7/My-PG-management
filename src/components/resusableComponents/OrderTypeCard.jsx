import { Card, Col, Row, Tooltip } from "antd";
import React from "react";
import { DrayageInfoIcon } from "../../stories/DrayageIcons";
import "../LoadTypeModal/LoadTypeModal.css";
const OrderTypeCard = ({ icon, label, info, description, onClick }) => {
    return (
        <Card hoverable bodyStyle={{ padding: "28px 16px" }} onClick={onClick}>
            <Row>
                <Col span={6} >
                    {icon}
                </Col>
                <Col span={18} className="loadTypeModalContent">
                    <Row className="load-type-label">{label} </Row>
                    <Row className="loadtypeDescription">{info}</Row>
                </Col>
            </Row>
            <Tooltip title={description}>
                <DrayageInfoIcon className="load-type-info-icon" />
            </Tooltip>
        </Card>
    );
};

export default OrderTypeCard;