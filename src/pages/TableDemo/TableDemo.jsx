import React, { useState } from 'react';
import { Card, Typography, Divider, Button, Space, Tag, Badge } from 'antd';
import { PlusOutlined, DownloadOutlined, FilterOutlined, TableOutlined } from '@ant-design/icons';
import AdvancedTable from '../../components/AdvancedTable/AdvancedTable';
import PGTable from '../../components/PGTable/PGTable';
import './TableDemo.scss';

const { Title, Paragraph } = Typography;

// Sample data for different table types
const generateTenantData = () => {
  const names = ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy', 'Anita Gupta', 'Rohit Mehta', 'Kavya Nair', 'Arjun Yadav', 'Pooja Joshi'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const paymentStatuses = ['Paid', 'Pending', 'Overdue'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${names[i % names.length]}`,
    room: `A${Math.floor(Math.random() * 20) + 101}`,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    rent: Math.floor(Math.random() * 5000) + 8000,
    joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@email.com`,
    deposit: Math.floor(Math.random() * 10000) + 15000,
    emergencyContact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  }));
};

const generatePaymentData = () => {
  const tenantNames = ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy'];
  const paymentMethods = ['Cash', 'UPI', 'Bank Transfer', 'Card'];
  const statuses = ['Completed', 'Pending', 'Failed', 'Refunded'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: `PAY${String(i + 1).padStart(4, '0')}`,
    tenant: tenantNames[i % tenantNames.length],
    room: `A${Math.floor(Math.random() * 20) + 101}`,
    amount: Math.floor(Math.random() * 5000) + 8000,
    dueDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    paidDate: Math.random() > 0.3 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1) : null,
    method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    late_fee: Math.random() > 0.7 ? Math.floor(Math.random() * 500) + 100 : 0,
  }));
};

const generateRoomData = () => {
  const roomTypes = ['Single', 'Double', 'Triple', 'Quad'];
  const facilities = [
    ['WiFi', 'AC', 'Attached Bathroom'],
    ['WiFi', 'Fan', 'Common Bathroom'],
    ['WiFi', 'AC', 'Balcony', 'Attached Bathroom'],
    ['WiFi', 'Fan'],
  ];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    number: `A${i + 101}`,
    type: roomTypes[Math.floor(Math.random() * roomTypes.length)],
    capacity: Math.floor(Math.random() * 4) + 1,
    occupied: Math.floor(Math.random() * 4),
    rent_per_bed: Math.floor(Math.random() * 3000) + 7000,
    facilities: facilities[Math.floor(Math.random() * facilities.length)],
    floor: Math.floor(i / 10) + 1,
    availability: Math.random() > 0.3 ? 'Available' : 'Full',
  }));
};

const generateComplaintData = () => {
  const categories = ['Maintenance', 'Cleaning', 'Noise', 'Facilities', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
  const complaints = [
    'AC not working in room',
    'Water leakage in bathroom',
    'WiFi connectivity issues',
    'Elevator not functioning',
    'Noise from neighboring room',
    'Cleaning not done properly',
    'Power outage frequent',
    'Hot water not available',
  ];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `CMP${String(i + 1).padStart(4, '0')}`,
    tenant: `Tenant ${i + 1}`,
    room: `A${Math.floor(Math.random() * 20) + 101}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: complaints[Math.floor(Math.random() * complaints.length)],
    created_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    resolved_date: Math.random() > 0.5 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1) : null,
  }));
};

const TableDemo = () => {
  const [activeTab, setActiveTab] = useState('tenants');
  const [tenantData] = useState(() => generateTenantData());
  const [paymentData] = useState(() => generatePaymentData());
  const [roomData] = useState(() => generateRoomData());
  const [complaintData] = useState(() => generateComplaintData());

  const tabOptions = [
    { key: 'tenants', label: 'Tenants', icon: <TableOutlined />, count: tenantData.length },
    { key: 'payments', label: 'Payments', icon: <TableOutlined />, count: paymentData.length },
    { key: 'rooms', label: 'Rooms', icon: <TableOutlined />, count: roomData.length },
    { key: 'complaints', label: 'Complaints', icon: <TableOutlined />, count: complaintData.length },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'tenants': return tenantData;
      case 'payments': return paymentData;
      case 'rooms': return roomData;
      case 'complaints': return complaintData;
      default: return [];
    }
  };

  return (
    <div className="table-demo">
      <div className="table-demo__header">
        <div className="table-demo__title-section">
          <Title level={2}>Advanced Table Components Demo</Title>
          <Paragraph>
            Showcase of advanced table features including drag & drop column reordering, 
            resizing, filtering, sorting, and column visibility controls.
          </Paragraph>
        </div>
        
        <div className="table-demo__actions">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Add New
            </Button>
            <Button icon={<DownloadOutlined />}>
              Export
            </Button>
            <Button icon={<FilterOutlined />}>
              Filters
            </Button>
          </Space>
        </div>
      </div>

      <Card className="table-demo__card">
        <div className="table-demo__tabs">
          {tabOptions.map(tab => (
            <div
              key={tab.key}
              className={`table-demo__tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <Badge count={tab.count} style={{ backgroundColor: '#586FCC' }} />
            </div>
          ))}
        </div>

        <Divider />

        <div className="table-demo__content">
          <div className="table-demo__features">
            <Title level={4}>Features Available:</Title>
            <div className="table-demo__feature-tags">
              <Tag color="blue">Drag & Drop Columns</Tag>
              <Tag color="green">Column Resizing</Tag>
              <Tag color="purple">Column Toggle</Tag>
              <Tag color="orange">Global Search</Tag>
              <Tag color="red">Column Filtering</Tag>
              <Tag color="cyan">Sorting</Tag>
              <Tag color="magenta">Row Selection</Tag>
              <Tag color="lime">Pagination</Tag>
              <Tag color="gold">Export to CSV</Tag>
              <Tag color="volcano">Custom Cell Types</Tag>
            </div>
          </div>

          <div className="table-demo__table-container">
            <PGTable
              data={getCurrentData()}
              type={activeTab}
              showSearch={true}
              showColumnToggle={true}
              showExport={true}
              enableRowSelection={true}
              enableSorting={true}
              enableFiltering={true}
              enableResizing={true}
              enableColumnOrdering={true}
              pageSize={10}
            />
          </div>
        </div>
      </Card>

      <Card className="table-demo__instructions" title="How to Use">
        <div className="table-demo__instruction-grid">
          <div className="table-demo__instruction-item">
            <Title level={5}>🔄 Column Reordering</Title>
            <Paragraph>
              Click and drag the column headers to reorder columns. 
              The drag handle appears on hover.
            </Paragraph>
          </div>
          
          <div className="table-demo__instruction-item">
            <Title level={5}>📏 Column Resizing</Title>
            <Paragraph>
              Hover over column borders and drag to resize. 
              Double-click to auto-fit content.
            </Paragraph>
          </div>
          
          <div className="table-demo__instruction-item">
            <Title level={5}>👁️ Column Visibility</Title>
            <Paragraph>
              Use the column toggle button (top-right) to show/hide columns. 
              Customize your view.
            </Paragraph>
          </div>
          
          <div className="table-demo__instruction-item">
            <Title level={5}>🔍 Search & Filter</Title>
            <Paragraph>
              Use global search or individual column filters. 
              Supports multiple filter types.
            </Paragraph>
          </div>
          
          <div className="table-demo__instruction-item">
            <Title level={5}>📊 Sorting</Title>
            <Paragraph>
              Click column headers to sort. 
              Supports multi-column sorting with Shift+Click.
            </Paragraph>
          </div>
          
          <div className="table-demo__instruction-item">
            <Title level={5}>✅ Row Selection</Title>
            <Paragraph>
              Select individual rows or use the header checkbox 
              for bulk selection.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TableDemo; 