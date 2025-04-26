import { Card, Avatar, Row, Col, Typography, Tag, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./TenantCard.scss";

const { Text } = Typography;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
};

const TenantCard = ({ tenant }) => {
  return (
    <div className="TenantCardStyles">
      <Card
        title={
          <div className="card-header">
            <div className="avatar-container">
              <Image
                width={40}
                height={40}
                src={tenant.image}
                className="tenant-avatar"
                fallback={<Avatar size={40} icon={<UserOutlined />} />}
              />
            </div>
            <div className="tenant-info">
              <div className="titleStyle">{tenant.name}</div>
              <div className="mobileNumberStyle">{tenant.profession}</div>
            </div>
          </div>
        }
        extra={
          <div
            className={`statusTag ${tenant.isActive ? "active" : "inactive"}`}
          >
            {tenant.isActive ? "Active" : "Inactive"}
          </div>
        }
        // hoverable
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <div className="detail-row">
              <div className="detailLabel">ID:</div>
              <div className="detailValue">{tenant.id}</div>
            </div>
          </Col>
          <Col span={12}>
            <div className="detail-row">
              <div className="detailLabel">DOJ:</div>
              <div className="detailValue">{formatDate(tenant.doj)}</div>
            </div>
          </Col>
          <Col span={12}>
            <div className="detail-row">
              <div className="detailLabel">Mobile:</div>
              <div className="detailValue">{tenant.mobile}</div>
            </div>
          </Col>
          <Col span={12}>
            <div className="detail-row">
              <div className="detailLabel">DOB:</div>
              <div className="detailValue">{formatDate(tenant.dob)}</div>
            </div>
          </Col>
          <Col span={24}>
            <div className="detail-row">
              <div className="detailLabel">Address:</div>
              <div className="detailValue">
                {tenant.address} - {tenant.pincode}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TenantCard;
