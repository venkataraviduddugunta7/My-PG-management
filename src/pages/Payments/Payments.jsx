import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Tabs, Table, Button, Space, Tag, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { addPayment, updatePayment, deletePayment, updatePaymentStatus } from '../../store/slices/paymentsSlice';
import './Payments.scss';

const { TabPane } = Tabs;
const { Option } = Select;

const Payments = () => {
  const dispatch = useDispatch();
  const { payments, paymentStats, loading } = useSelector((state) => state.payments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Here you would typically fetch payments data
    // dispatch(fetchPayments());
  }, [dispatch]);

  const handleAddPayment = () => {
    setSelectedPayment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    form.setFieldsValue({
      ...payment,
      dueDate: payment.dueDate ? moment(payment.dueDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (selectedPayment) {
        dispatch(updatePayment({ id: selectedPayment.id, ...values }));
        message.success('Payment updated successfully');
      } else {
        dispatch(addPayment(values));
        message.success('Payment added successfully');
      }
      setIsModalVisible(false);
    });
  };

  const handleDeletePayment = (paymentId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this payment?',
      content: 'This action cannot be undone.',
      onOk: () => {
        dispatch(deletePayment(paymentId));
        message.success('Payment deleted successfully');
      },
    });
  };

  const handleStatusChange = (paymentId, status) => {
    dispatch(updatePaymentStatus({ paymentId, status }));
    message.success('Payment status updated successfully');
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tenant',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: 'warning',
          completed: 'success',
          overdue: 'error',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEditPayment(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeletePayment(record.id)}>
            Delete
          </Button>
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="overdue">Overdue</Option>
          </Select>
        </Space>
      ),
    },
  ];

  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="payments-container">
      <Card className="payments-card">
        <div className="payments-header">
          <h2>Payments Management</h2>
          <Space>
            <Input
              placeholder="Search payments..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddPayment}
            >
              Add Payment
            </Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>

        <div className="payment-stats">
          <Card className="stat-card">
            <h3>Total Collected</h3>
            <p>${paymentStats.totalCollected.toFixed(2)}</p>
          </Card>
          <Card className="stat-card">
            <h3>Pending Amount</h3>
            <p>${paymentStats.pendingAmount.toFixed(2)}</p>
          </Card>
          <Card className="stat-card">
            <h3>Overdue Amount</h3>
            <p>${paymentStats.overdueAmount.toFixed(2)}</p>
          </Card>
          <Card className="stat-card">
            <h3>Monthly Collection</h3>
            <p>${paymentStats.monthlyCollection.toFixed(2)}</p>
          </Card>
        </div>

        <Tabs defaultActiveKey="all">
          <TabPane tab="All Payments" key="all">
            <Table
              columns={columns}
              dataSource={filteredPayments}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Pending" key="pending">
            <Table
              columns={columns}
              dataSource={filteredPayments.filter((p) => p.status === 'pending')}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Completed" key="completed">
            <Table
              columns={columns}
              dataSource={filteredPayments.filter((p) => p.status === 'completed')}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Overdue" key="overdue">
            <Table
              columns={columns}
              dataSource={filteredPayments.filter((p) => p.status === 'overdue')}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={selectedPayment ? 'Edit Payment' : 'Add New Payment'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'pending' }}
        >
          <Form.Item
            name="tenantName"
            label="Tenant Name"
            rules={[{ required: true, message: 'Please enter tenant name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select due date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
