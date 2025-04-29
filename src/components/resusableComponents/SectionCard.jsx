import React from "react";
import { Card } from "antd";

const SectionCard = ({ title, extra, children, actions, style, ...props }) => {

    return (
        <Card
            title={title}
            style={{
                borderRadius: "24px",
                boxShadow: `
                0px 16px 24px 0px #0000001F, 
                0px 16px 24px 0px #00000029, 
                0px -4px 16px 0px #00000014
                `,
                ...style

            }}
            headStyle={{
                borderBottom: "none",
                padding: "24px"
            }}
            bodyStyle={{
                padding: "0px 24px 24px 24px"
            }}
            extra={extra}
            actions={actions}
            {...props}
        >
            {children}
        </Card>
    );
};

export default SectionCard;