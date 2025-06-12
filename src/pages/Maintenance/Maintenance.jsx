// Example: src/pages/Tenants/index.jsx

import "./Maintenance.scss";
import React, { useState } from 'react';
import { Card, Tabs, Table, Button, Input, Space, Modal, Form, Select, DatePicker, Tag, message } from 'antd';
import { PlusOutlined, SearchOutlined, ToolOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

const Maintenance = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [searchText, setSearchText] = useState('');

    const maintenanceTypes = [
        { value: 'electrical', label: 'Electrical' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'carpentry', label: 'Carpentry' },
        { value: 'painting', label: 'Painting' },
        { value: 'cleaning', label: 'Cleaning' },
        { value: 'other', label: 'Other' }
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={
                    type === 'electrical' ? 'blue' :
                    type === 'plumbing' ? 'cyan' :
                    type === 'carpentry' ? 'orange' :
                    type === 'painting' ? 'purple' :
                    type === 'cleaning' ? 'green' : 'default'
                }>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Reported Date',
            dataIndex: 'reportedDate',
            key: 'reportedDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'pending' ? 'orange' :
                    status === 'in_progress' ? 'blue' :
                    status === 'completed' ? 'green' : 'red'
                }>
                    {status.replace('_', ' ').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                    <Button type="link" onClick={() => handleStatusChange(record)}>
                        Change Status
                    </Button>
                </Space>
            ),
        },
    ];

    // Sample data - replace with actual data from Redux store
    const maintenanceData = [
        {
            id: 'M001',
            title: 'Fix Leaking Faucet',
            type: 'plumbing',
            location: 'Room 101',
            reportedDate: '2024-03-15',
            status: 'pending',
        },
        {
            id: 'M002',
            title: 'Replace Light Bulb',
            type: 'electrical',
            location: 'Room 102',
            reportedDate: '2024-03-14',
            status: 'completed',
        },
        // Add more sample data as needed
    ];

    const handleAdd = () => {
        setSelectedMaintenance(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (maintenance) => {
        setSelectedMaintenance(maintenance);
        form.setFieldsValue(maintenance);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this maintenance request?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // Add delete logic here
                message.success('Maintenance request deleted successfully');
            },
        });
    };

    const handleStatusChange = (maintenance) => {
        Modal.confirm({
            title: 'Change Maintenance Status',
            content: (
                <Select
                    defaultValue={maintenance.status}
                    style={{ width: '100%', marginTop: 16 }}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="in_progress">In Progress</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            ),
            onOk() {
                // Add status change logic here
                message.success('Maintenance status updated successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            // Add save logic here
            setIsModalVisible(false);
            message.success(
                selectedMaintenance
                    ? 'Maintenance request updated successfully'
                    : 'Maintenance request added successfully'
            );
        });
    };

    const filteredData = maintenanceData.filter((item) =>
        Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className="MaintenanceStyle">
            <div className="header-section">
                <ToolOutlined />
                Maintenance
            </div>
            <div className="tabheader">Maintenance Requests</div>
            <div className="tab-content">
                <div className="maintenance-header">
                    <Space>
                        <Input
                            placeholder="Search maintenance requests..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                            Add Request
                        </Button>
                    </Space>
                </div>

                <Tabs defaultActiveKey="all">
                    <TabPane
                        tab={
                            <span>
                                <ToolOutlined />
                                All Requests
                            </span>
                        }
                        key="all"
                    >
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <ClockCircleOutlined />
                                Pending
                            </span>
                        }
                        key="pending"
                    >
                        <Table
                            columns={columns}
                            dataSource={filteredData.filter((item) => item.status === 'pending')}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <CheckCircleOutlined />
                                Completed
                            </span>
                        }
                        key="completed"
                    >
                        <Table
                            columns={columns}
                            dataSource={filteredData.filter((item) => item.status === 'completed')}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <CloseCircleOutlined />
                                Cancelled
                            </span>
                        }
                        key="cancelled"
                    >
                        <Table
                            columns={columns}
                            dataSource={filteredData.filter((item) => item.status === 'cancelled')}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </TabPane>
                </Tabs>

                <Modal
                    title={selectedMaintenance ? 'Edit Maintenance Request' : 'Add Maintenance Request'}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={() => setIsModalVisible(false)}
                    okText={selectedMaintenance ? 'Update' : 'Add'}
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter the title' }]}
                        >
                            <Input placeholder="Enter maintenance request title" />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please select the type' }]}
                        >
                            <Select placeholder="Select maintenance type">
                                {maintenanceTypes.map((type) => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: 'Please enter the location' }]}
                        >
                            <Input placeholder="Enter location" />
                        </Form.Item>
                        <Form.Item
                            name="reportedDate"
                            label="Reported Date"
                            rules={[{ required: true, message: 'Please select the date' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select the status' }]}
                        >
                            <Select placeholder="Select status">
                                <Option value="pending">Pending</Option>
                                <Option value="in_progress">In Progress</Option>
                                <Option value="completed">Completed</Option>
                                <Option value="cancelled">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Maintenance;
