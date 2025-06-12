import React, { useState } from 'react';
import { Card, Tabs, Table, Button, Space, Input, Modal, Form, DatePicker, Select, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, BellOutlined, MailOutlined, NotificationOutlined } from '@ant-design/icons';
import './Notices.scss';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const Notices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const noticeTypes = [
    { key: 'all', label: 'All Notices' },
    { key: 'general', label: 'General Notices' },
    { key: 'maintenance', label: 'Maintenance Notices' },
    { key: 'payment', label: 'Payment Notices' },
  ];

  const columns = [
    {
      title: 'Notice ID',
      dataIndex: 'id',
      key: 'id',
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
      render: (type) => {
        const colors = {
          general: 'blue',
          maintenance: 'orange',
          payment: 'green',
        };
        return <Tag color={colors[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Posted Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          active: 'success',
          expired: 'default',
          draft: 'warning',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEditNotice(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteNotice(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 'NOT-001',
      title: 'Monthly Maintenance Schedule',
      type: 'maintenance',
      date: '2024-03-15',
      status: 'active',
    },
    {
      id: 'NOT-002',
      title: 'Rent Payment Reminder',
      type: 'payment',
      date: '2024-03-14',
      status: 'active',
    },
    {
      id: 'NOT-003',
      title: 'Holiday Schedule',
      type: 'general',
      date: '2024-03-13',
      status: 'expired',
    },
  ];

  const handleAddNotice = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditNotice = (notice) => {
    form.setFieldsValue({
      ...notice,
      date: notice.date ? moment(notice.date) : null,
    });
    setIsModalVisible(true);
  };

  const handleDeleteNotice = (noticeId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this notice?',
      content: 'This action cannot be undone.',
      onOk: () => {
        // Handle delete
        console.log('Delete notice:', noticeId);
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      setIsModalVisible(false);
    });
  };

  const filteredNotices = data.filter((notice) =>
    Object.values(notice).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="NoticesStyle">
      <div className="header-section tabheader">Notices</div>
      <div className="tab-content">
        <div className="notices-header">
          <Space>
            <Input
              placeholder="Search notices..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNotice}
            >
              Add Notice
            </Button>
          </Space>
        </div>

        <Tabs defaultActiveKey="all">
          <TabPane
            tab={
              <span>
                <BellOutlined />
                All Notices
              </span>
            }
            key="all"
          >
            <Table columns={columns} dataSource={filteredNotices} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <NotificationOutlined />
                General Notices
              </span>
            }
            key="general"
          >
            <Table
              columns={columns}
              dataSource={filteredNotices.filter((n) => n.type === 'general')}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BellOutlined />
                Maintenance Notices
              </span>
            }
            key="maintenance"
          >
            <Table
              columns={columns}
              dataSource={filteredNotices.filter((n) => n.type === 'maintenance')}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <MailOutlined />
                Payment Notices
              </span>
            }
            key="payment"
          >
            <Table
              columns={columns}
              dataSource={filteredNotices.filter((n) => n.type === 'payment')}
            />
          </TabPane>
        </Tabs>

        <Modal
          title="Add New Notice"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Notice Title"
              rules={[{ required: true, message: 'Please enter notice title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Notice Type"
              rules={[{ required: true, message: 'Please select notice type' }]}
            >
              <Select>
                <Option value="general">General</Option>
                <Option value="maintenance">Maintenance</Option>
                <Option value="payment">Payment</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              label="Posted Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="expired">Expired</Option>
                <Option value="draft">Draft</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="content"
              label="Notice Content"
              rules={[{ required: true, message: 'Please enter notice content' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Notices;