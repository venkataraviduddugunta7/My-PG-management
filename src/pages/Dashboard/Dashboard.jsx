import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  AlertOutlined,
  ToolOutlined,
  BankOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  FilterOutlined,
  ExportOutlined,
  PlusOutlined,
  EyeOutlined,
  WarningOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { 
  Col, 
  Row, 
  Table, 
  Card, 
  Button, 
  Tag, 
  Progress, 
  Statistic, 
  Select, 
  DatePicker,
  Input,
  Badge,
  Divider,
  Tabs,
  List,
  Avatar,
  Typography,
  Space,
  Tooltip,
  notification
} from "antd";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Dashboard.scss";
import { useState, useEffect } from "react";

const { Search } = Input;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced Stats data with trends
  const stats = [
    { 
      name: "Total Beds", 
      value: 50, 
      icon: <HomeOutlined />, 
      trend: "+2.5%",
      trendType: "up",
      subtitle: "vs last month"
    },
    { 
      name: "Occupied", 
      value: 42, 
      icon: <UserOutlined />, 
      trend: "+8.3%",
      trendType: "up",
      subtitle: "84% occupancy"
    },
    { 
      name: "Vacant", 
      value: 8, 
      icon: <HomeOutlined />, 
      trend: "-8.3%",
      trendType: "down",
      subtitle: "Ready to rent"
    },
    { 
      name: "Monthly Revenue", 
      value: "₹2,10,000", 
      icon: <DollarOutlined />,
      trend: "+12.5%",
      trendType: "up",
      subtitle: "vs last month"
    },
    { 
      name: "Pending Payments", 
      value: "₹32,500", 
      icon: <AlertOutlined />,
      trend: "-15.2%",
      trendType: "down",
      subtitle: "Overdue amount"
    },
    { 
      name: "Active Complaints", 
      value: 3, 
      icon: <ToolOutlined />,
      trend: "-50%",
      trendType: "down",
      subtitle: "Resolved 6 this week"
    },
    { 
      name: "Collection Rate", 
      value: "94.8%", 
      icon: <MoneyCollectOutlined />,
      trend: "+2.1%",
      trendType: "up",
      subtitle: "This month"
    },
    { 
      name: "Satisfaction Score", 
      value: "4.2/5", 
      icon: <TrophyOutlined />,
      trend: "+0.3",
      trendType: "up",
      subtitle: "Based on reviews"
    },
  ];

  // Payment tracking data
  const paymentData = [
    {
      key: 1,
      tenant: "Akash Kumar",
      room: "101A",
      amount: "₹7,000",
      dueDate: "2024-01-05",
      status: "overdue",
      daysOverdue: 15,
      phone: "+91 98765 43210",
      lastPayment: "2023-12-01"
    },
    {
      key: 2,
      tenant: "Priya Reddy",
      room: "102B",
      amount: "₹7,500",
      dueDate: "2024-01-10",
      status: "paid",
      paidDate: "2024-01-08",
      phone: "+91 98765 43211",
      lastPayment: "2024-01-08"
    },
    {
      key: 3,
      tenant: "Rajesh Patel",
      room: "201A",
      amount: "₹8,000",
      dueDate: "2024-01-12",
      status: "due_soon",
      daysLeft: 2,
      phone: "+91 98765 43212",
      lastPayment: "2023-12-12"
    },
    {
      key: 4,
      tenant: "Sushmita Das",
      room: "204B",
      amount: "₹7,200",
      dueDate: "2024-01-15",
      status: "partial",
      paidAmount: "₹3,600",
      phone: "+91 98765 43213",
      lastPayment: "2024-01-10"
    },
    {
      key: 5,
      tenant: "Aditya Verma",
      room: "103A",
      amount: "₹7,800",
      dueDate: "2024-01-18",
      status: "upcoming",
      daysLeft: 8,
      phone: "+91 98765 43214",
      lastPayment: "2023-12-18"
    },
  ];

  // Complaint tracking data  
  const complaintData = [
    {
      id: "CMP001",
      tenant: "Rajesh Patel",
      room: "201A",
      issue: "AC not working",
      category: "electrical",
      priority: "high",
      status: "in_progress",
      reportedDate: "2024-01-10",
      assignedTo: "Maintenance Team A",
      estimatedResolution: "2024-01-12"
    },
    {
      id: "CMP002",
      tenant: "Akash Kumar",
      room: "101A",
      issue: "WiFi connectivity issues",
      category: "network",
      priority: "medium",
      status: "pending",
      reportedDate: "2024-01-11",
      assignedTo: "IT Support",
      estimatedResolution: "2024-01-13"
    },
    {
      id: "CMP003",
      tenant: "Priya Reddy",
      room: "102B",
      issue: "Water pressure low",
      category: "plumbing",
      priority: "medium",
      status: "resolved",
      reportedDate: "2024-01-08",
      resolvedDate: "2024-01-09",
      assignedTo: "Plumber"
    }
  ];

  // Enhanced notifications with categories
  const notifications = [
    {
      id: 1,
      type: "Payment Alert",
      message: "Akash Kumar's rent is 15 days overdue - ₹7,000",
      priority: "high",
      category: "payment",
      time: "2 hours ago",
      actionRequired: true
    },
    {
      id: 2,
      type: "Maintenance Request",
      message: "Room 201A AC repair - High Priority",
      priority: "high",
      category: "maintenance",
      time: "4 hours ago",
      actionRequired: true
    },
    {
      id: 3,
      type: "Payment Received",
      message: "₹7,500 from Priya Reddy (January)",
      priority: "low",
      category: "payment",
      time: "1 day ago",
      actionRequired: false
    },
    {
      id: 4,
      type: "New Tenant Inquiry",
      message: "Inquiry for 2-bed sharing - Contact: +91 99999 88888",
      priority: "medium",
      category: "inquiry",
      time: "1 day ago",
      actionRequired: true
    },
    {
      id: 5,
      type: "Exit Notice",
      message: "Aditya Verma vacating on 31st January",
      priority: "medium",
      category: "tenant",
      time: "2 days ago",
      actionRequired: true
    },
    {
      id: 6,
      type: "Maintenance Complete",
      message: "Room 102B water pressure issue resolved",
      priority: "low",
      category: "maintenance",
      time: "2 days ago",
      actionRequired: false
    },
    {
      id: 7,
      type: "Compliance Alert",
      message: "Fire safety inspection due next week",
      priority: "high",
      category: "compliance",
      time: "3 days ago",
      actionRequired: true
    }
  ];

  // Revenue analytics data
  const revenueAnalytics = {
    currentMonth: 210000,
    lastMonth: 187500,
    growth: 12.0,
    collectionRate: 94.8,
    avgRentPerBed: 4200,
    occupancyRevenue: 176400,
    securityDeposits: 84000,
    maintenanceCharges: 12600
  };

  // Occupancy analytics
  const occupancyAnalytics = {
    totalBeds: 50,
    occupied: 42,
    vacant: 8,
    occupancyRate: 84,
    avgStayDuration: 8.5, // months
    turnoverRate: 15, // percentage
    newTenantsThisMonth: 3,
    exitingTenants: 2
  };

  const getStatusColor = (status) => {
    const statusColors = {
      paid: 'success',
      pending: 'warning',
      overdue: 'error',
      due_soon: 'warning',
      partial: 'processing',
      upcoming: 'default'
    };
    return statusColors[status] || 'default';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      paid: 'Paid',
      pending: 'Pending',
      overdue: 'Overdue',
      due_soon: 'Due Soon',
      partial: 'Partial',
      upcoming: 'Upcoming'
    };
    return statusTexts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green'
    };
    return colors[priority] || 'default';
  };

  const getComplaintStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      in_progress: 'blue',
      resolved: 'green',
      cancelled: 'red'
    };
    return colors[status] || 'default';
  };

  // Payment table columns
  const paymentColumns = [
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Room {record.room}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (amount, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{amount}</div>
          {record.paidAmount && (
            <div style={{ fontSize: '12px', color: '#52c41a' }}>
              Paid: {record.paidAmount}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: true,
      render: (date, record) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          {record.daysOverdue && (
            <div style={{ fontSize: '12px', color: '#ff4d4f' }}>
              {record.daysOverdue} days overdue
            </div>
          )}
          {record.daysLeft && (
            <div style={{ fontSize: '12px', color: '#faad14' }}>
              {record.daysLeft} days left
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<PhoneOutlined />}
            onClick={() => notification.info({ message: `Calling ${record.phone}` })}
          />
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => notification.info({ message: 'Opening payment details' })}
          />
          {record.status === 'overdue' && (
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<WarningOutlined />}
              onClick={() => notification.warning({ message: 'Sending payment reminder' })}
            />
          )}
        </Space>
      ),
    },
  ];

  // Complaint table columns
  const complaintColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tenant & Room',
      key: 'tenantRoom',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.tenant}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Room {record.room}</div>
        </div>
      ),
    },
    {
      title: 'Issue',
      dataIndex: 'issue',
      key: 'issue',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Tag size="small" color="blue">{record.category}</Tag>
        </div>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getComplaintStatusColor(status)}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} />
          {record.status !== 'resolved' && (
            <Button type="link" size="small">Update</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header-section tabheader">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>PG Management Dashboard</span>
          <Space>
            <Button type="primary" icon={<ExportOutlined />}>
              Export Report
            </Button>
            <Button icon={<PlusOutlined />}>
              Quick Add
            </Button>
          </Space>
        </div>
      </div>

      {/* Filters Section */}
      <div style={{ padding: '16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
        <Row gutter={16} align="middle">
          <Col>
            <Text strong>Filters:</Text>
          </Col>
          <Col>
            <Select
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              style={{ width: 120 }}
            >
              <Select.Option value="today">Today</Select.Option>
              <Select.Option value="thisWeek">This Week</Select.Option>
              <Select.Option value="thisMonth">This Month</Select.Option>
              <Select.Option value="lastMonth">Last Month</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
          </Col>
          <Col>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 120 }}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="urgent">Urgent</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="resolved">Resolved</Select.Option>
            </Select>
          </Col>
          <Col flex="auto">
            <Search
              placeholder="Search tenants, rooms, payments..."
              style={{ maxWidth: 300, float: 'right' }}
              enterButton
            />
          </Col>
        </Row>
      </div>

      {/* Main Content Section */}
      <div className="stats-section">
        <Row gutter={[16, 16]}>
          {/* Stats Cards */}
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Card className="enhanced-stat-card" hoverable>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="stat-icon" style={{ marginBottom: 8 }}>
                          {stat.icon}
                        </div>
                        <div className="stat-name" style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
                          {stat.name}
                        </div>
                        <div className="stat-count" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4 }}>
                          {stat.value}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                          <span style={{ 
                            color: stat.trendType === 'up' ? '#52c41a' : '#ff4d4f',
                            marginRight: 4
                          }}>
                            {stat.trend}
                          </span>
                          <span style={{ color: '#999' }}>{stat.subtitle}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Analytics Section */}
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {/* Revenue Analytics */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <span>
                      <LineChartOutlined style={{ marginRight: 8 }} />
                      Revenue Analytics
                    </span>
                  }
                  extra={<Button size="small">View Details</Button>}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Current Month"
                        value={revenueAnalytics.currentMonth}
                        prefix="₹"
                        precision={0}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Growth"
                        value={revenueAnalytics.growth}
                        precision={1}
                        suffix="%"
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <div style={{ marginBottom: 8 }}>
                    <Text>Collection Rate</Text>
                    <Progress 
                      percent={revenueAnalytics.collectionRate} 
                      strokeColor="#52c41a"
                      style={{ marginTop: 4 }}
                    />
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text type="secondary">Avg Rent/Bed</Text>
                      <div>₹{revenueAnalytics.avgRentPerBed.toLocaleString()}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Security Deposits</Text>
                      <div>₹{revenueAnalytics.securityDeposits.toLocaleString()}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Occupancy Analytics */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <span>
                      <PieChartOutlined style={{ marginRight: 8 }} />
                      Occupancy Analytics
                    </span>
                  }
                  extra={<Button size="small">View Details</Button>}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Occupancy Rate"
                        value={occupancyAnalytics.occupancyRate}
                        suffix="%"
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Avg Stay Duration"
                        value={occupancyAnalytics.avgStayDuration}
                        suffix=" months"
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text>Occupied</Text>
                      <Text strong>{occupancyAnalytics.occupied} beds</Text>
                    </div>
                    <Progress 
                      percent={(occupancyAnalytics.occupied / occupancyAnalytics.totalBeds) * 100} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text type="secondary">New Tenants</Text>
                      <div style={{ color: '#52c41a' }}>+{occupancyAnalytics.newTenantsThisMonth}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Turnover Rate</Text>
                      <div>{occupancyAnalytics.turnoverRate}%</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Detailed Tables and Notifications */}
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {/* Main Content Area */}
              <Col xs={24} lg={16}>
                <Card>
                  <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab={<span><DollarOutlined />Payment Tracking</span>} key="payments">
                      <div style={{ marginBottom: 16 }}>
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Title level={5}>Payment Status Overview</Title>
                          </Col>
                          <Col>
                            <Space>
                              <Badge count={5} color="red">
                                <Button>Overdue</Button>
                              </Badge>
                              <Badge count={8} color="orange">
                                <Button>Due Soon</Button>
                              </Badge>
                              <Button type="primary">Send Reminders</Button>
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <Table
                        columns={paymentColumns}
                        dataSource={paymentData}
                        pagination={{ pageSize: 5 }}
                        size="small"
                        scroll={{ x: 800 }}
                      />
                    </TabPane>
                    
                    <TabPane tab={<span><ToolOutlined />Complaint Management</span>} key="complaints">
                      <div style={{ marginBottom: 16 }}>
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Title level={5}>Active Complaints</Title>
                          </Col>
                          <Col>
                            <Space>
                              <Badge count={2} color="red">
                                <Button>High Priority</Button>
                              </Badge>
                              <Badge count={3} color="blue">
                                <Button>In Progress</Button>
                              </Badge>
                              <Button type="primary">Add Complaint</Button>
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <Table
                        columns={complaintColumns}
                        dataSource={complaintData}
                        pagination={{ pageSize: 5 }}
                        size="small"
                        scroll={{ x: 800 }}
                      />
                    </TabPane>

                    <TabPane tab={<span><BarChartOutlined />Analytics</span>} key="analytics">
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Title level={5}>Key Performance Indicators</Title>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Card size="small">
                            <Statistic
                              title="Monthly Collection"
                              value={94.8}
                              precision={1}
                              suffix="%"
                              valueStyle={{ color: '#52c41a' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Card size="small">
                            <Statistic
                              title="Complaint Resolution"
                              value={87.5}
                              precision={1}
                              suffix="%"
                              valueStyle={{ color: '#1890ff' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Card size="small">
                            <Statistic
                              title="Tenant Satisfaction"
                              value={4.2}
                              precision={1}
                              suffix="/5"
                              valueStyle={{ color: '#faad14' }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Card size="small">
                            <Statistic
                              title="Avg Response Time"
                              value={2.4}
                              precision={1}
                              suffix=" hrs"
                              valueStyle={{ color: '#722ed1' }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>

              {/* Notifications and Quick Actions */}
              <Col xs={24} lg={8}>
                <Card 
                  title="Notifications & Alerts" 
                  extra={<Badge count={7} />}
                  style={{ height: '100%' }}
                >
                  <List
                    size="small"
                    dataSource={notifications}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          item.actionRequired && (
                            <Button type="link" size="small">
                              Action
                            </Button>
                          )
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Badge 
                              dot 
                              color={
                                item.priority === 'high' ? 'red' : 
                                item.priority === 'medium' ? 'orange' : 'green'
                              }
                            >
                              <Avatar size="small" style={{ 
                                backgroundColor: item.category === 'payment' ? '#52c41a' :
                                item.category === 'maintenance' ? '#faad14' :
                                item.category === 'tenant' ? '#1890ff' : '#722ed1'
                              }}>
                                {item.category.charAt(0).toUpperCase()}
                              </Avatar>
                            </Badge>
                          }
                          title={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text strong style={{ fontSize: '12px' }}>
                                {item.type}
                              </Text>
                              <Text type="secondary" style={{ fontSize: '11px' }}>
                                {item.time}
                              </Text>
                            </div>
                          }
                          description={
                            <Text style={{ fontSize: '12px' }}>
                              {item.message}
                            </Text>
                          }
                        />
                      </List.Item>
                    )}
                    style={{ maxHeight: '600px', overflow: 'auto' }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Quick Actions Section */}
          <Col span={24}>
            <Card title="Quick Actions" size="small">
              <Row gutter={[16, 16]}>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add New Tenant
                  </Button>
                </Col>
                <Col>
                  <Button icon={<MoneyCollectOutlined />}>
                    Record Payment
                  </Button>
                </Col>
                <Col>
                  <Button icon={<ToolOutlined />}>
                    Log Complaint
                  </Button>
                </Col>
                <Col>
                  <Button icon={<CalendarOutlined />}>
                    Schedule Maintenance
                  </Button>
                </Col>
                <Col>
                  <Button icon={<FileTextOutlined />}>
                    Generate Report
                  </Button>
                </Col>
                <Col>
                  <Button icon={<PhoneOutlined />}>
                    Send Reminders
                  </Button>
                </Col>
                <Col>
                  <Button icon={<SafetyCertificateOutlined />}>
                    Compliance Check
                  </Button>
                </Col>
                <Col>
                  <Button icon={<TeamOutlined />}>
                    Staff Management
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
