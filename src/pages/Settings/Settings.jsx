import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Switch,
  InputNumber,
  Select,
  message,
  Space,
  Divider,
  ColorPicker,
  Card,
  Tooltip,
  Row,
  Col,
  Tag,
  Table,
  Button,
  Modal,
} from "antd";
import {
  SaveOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Settings.scss";
import { 
  updateSettings, 
  updateNotificationPreferences, 
  resetSettings,
  updateAddress,
  updateRoomTypes,
  updateBedTypes,
} from "../../store/slices/settingsSlice";
import PgButton from "../../components/resusableComponents/PgButton";

const Settings = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("general");
  const [roomTypes, setRoomTypes] = useState(settings.roomTypes || []);
  const [bedTypes, setBedTypes] = useState(settings.bedTypes || []);
  const [isRoomTypeModalVisible, setIsRoomTypeModalVisible] = useState(false);
  const [isBedTypeModalVisible, setIsBedTypeModalVisible] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);
  const [editingBedType, setEditingBedType] = useState(null);

  // Tab configuration
  const tabs = useMemo(() => [
    { id: "general", label: "General" },
    { id: "rooms", label: "Rooms" },
    { id: "beds", label: "Beds" },
    { id: "payments", label: "Payments" },
    { id: "notifications", label: "Notifications" },
    { id: "system", label: "System" },
  ], []);

  const handleSave = useCallback(async (values) => {
    try {
      dispatch(updateSettings({ ...values, roomTypes, bedTypes }));
      message.success("Settings saved successfully");
    } catch (error) {
      message.error("Failed to save settings");
    }
  }, [dispatch, roomTypes, bedTypes]);

  const handleReset = useCallback(() => {
    dispatch(resetSettings());
    form.resetFields();
    setRoomTypes([]);
    setBedTypes([]);
    message.success("Settings reset to default values");
  }, [dispatch, form]);

  const handleNotificationPreferenceChange = useCallback((key, value) => {
    dispatch(updateNotificationPreferences({ [key]: value }));
  }, [dispatch]);

  const renderTooltip = useCallback((text) => (
    <Tooltip title={text}>
      <InfoCircleOutlined style={{ marginLeft: 8, color: "#586FCC" }} />
    </Tooltip>
  ), []);

  // Room Type Management
  const handleAddRoomType = useCallback(() => {
    setEditingRoomType(null);
    setIsRoomTypeModalVisible(true);
  }, []);

  const handleEditRoomType = useCallback((record) => {
    setEditingRoomType(record);
    setIsRoomTypeModalVisible(true);
  }, []);

  const handleDeleteRoomType = useCallback((id) => {
    setRoomTypes(roomTypes.filter(type => type.id !== id));
  }, [roomTypes]);

  const handleRoomTypeModalOk = useCallback((values) => {
    if (editingRoomType) {
      setRoomTypes(roomTypes.map(type => 
        type.id === editingRoomType.id ? { ...type, ...values } : type
      ));
    } else {
      setRoomTypes([...roomTypes, { ...values, id: `type-${Date.now()}` }]);
    }
    setIsRoomTypeModalVisible(false);
  }, [roomTypes, editingRoomType]);

  // Bed Type Management
  const handleAddBedType = useCallback(() => {
    setEditingBedType(null);
    setIsBedTypeModalVisible(true);
  }, []);

  const handleEditBedType = useCallback((record) => {
    setEditingBedType(record);
    setIsBedTypeModalVisible(true);
  }, []);

  const handleDeleteBedType = useCallback((id) => {
    setBedTypes(bedTypes.filter(type => type.id !== id));
  }, [bedTypes]);

  const handleBedTypeModalOk = useCallback((values) => {
    if (editingBedType) {
      setBedTypes(bedTypes.map(type => 
        type.id === editingBedType.id ? { ...type, ...values } : type
      ));
    } else {
      setBedTypes([...bedTypes, { ...values, id: `bed-type-${Date.now()}` }]);
    }
    setIsBedTypeModalVisible(false);
  }, [bedTypes, editingBedType]);

  // Table Columns
  const roomTypeColumns = [
    {
      title: 'Type Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Amenities',
      dataIndex: 'amenities',
      key: 'amenities',
      render: (amenities) => (
        <Space>
          {amenities.map(amenity => (
            <Tag key={amenity}>{amenity}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditRoomType(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteRoomType(record.id)}
          />
        </Space>
      ),
    },
  ];

  const bedTypeColumns = [
    {
      title: 'Type Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features) => (
        <Space>
          {features.map(feature => (
            <Tag key={feature}>{feature}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditBedType(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteBedType(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="SettingsStyle">
      <div className="tabheader">Settings</div>

      {/* Custom Tab Navigation */}
      <div className="custom-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`custom-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
          onFinish={handleSave}
        >
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="settings-section">
              <Card title="General Settings" className="settings-card">
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name={["pgName"]}
                      label={
                        <span>
                          PG Name{" "}
                          {renderTooltip("The name of your PG establishment")}
                        </span>
                      }
                      rules={[
                        { required: true, message: "Please enter PG name" },
                      ]}
                    >
                      <Input placeholder="Enter PG name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["contactNumber"]}
                      label={
                        <span>
                          Contact Number{" "}
                          {renderTooltip("Primary contact number for PG")}
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact number",
                        },
                      ]}
                    >
                      <Input placeholder="Enter contact number" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name={["address", "addressLine1"]}
                      label={
                        <span>
                          Address Line 1{" "}
                          {renderTooltip("Primary address line")}
                        </span>
                      }
                      rules={[{ required: true, message: "Please enter address line 1" }]}
                    >
                      <Input placeholder="Enter address line 1" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["address", "addressLine2"]}
                      label={
                        <span>
                          Address Line 2{" "}
                          {renderTooltip("Secondary address line")}
                        </span>
                      }
                    >
                      <Input placeholder="Enter address line 2" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={8}>
                    <Form.Item
                      name={["address", "city"]}
                      label={
                        <span>
                          City{" "}
                          {renderTooltip("City name")}
                        </span>
                      }
                      rules={[{ required: true, message: "Please enter city" }]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["address", "state"]}
                      label={
                        <span>
                          State{" "}
                          {renderTooltip("State name")}
                        </span>
                      }
                      rules={[{ required: true, message: "Please enter state" }]}
                    >
                      <Input placeholder="Enter state" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["address", "pincode"]}
                      label={
                        <span>
                          Pincode{" "}
                          {renderTooltip("Postal code")}
                        </span>
                      }
                      rules={[{ required: true, message: "Please enter pincode" }]}
                    >
                      <Input placeholder="Enter pincode" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name={["email"]}
                      label={
                        <span>
                          Email{" "}
                          {renderTooltip("Primary email for communications")}
                        </span>
                      }
                      rules={[
                        { required: true, message: "Please enter email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["gstNumber"]}
                      label={
                        <span>
                          GST Number{" "}
                          {renderTooltip(
                            "GST registration number if applicable"
                          )}
                        </span>
                      }
                    >
                      <Input placeholder="Enter GST number" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={["description"]}
                  label={
                    <span>
                      Description{" "}
                      {renderTooltip("Brief description about your PG")}
                    </span>
                  }
                >
                  <Input.TextArea rows={3} placeholder="Enter PG description" />
                </Form.Item>
              </Card>
            </div>
          )}

          {/* Room Settings */}
          {activeTab === "rooms" && (
            <div className="settings-section">
              <Card title="Room Settings" className="settings-card">
                <div className="room-types-section">
                  <div className="section-header">
                    <h3>Room Types</h3>
                    <PgButton
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddRoomType}
                    >
                      Add Room Type
                    </PgButton>
                  </div>

                  <Table
                    columns={roomTypeColumns}
                    dataSource={roomTypes}
                    rowKey="id"
                    pagination={false}
                  />

                  <Divider />

                  <Row gutter={[24, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="allowMixedGenderRooms"
                        label={
                          <span>
                            Allow Mixed Gender Rooms{" "}
                            {renderTooltip(
                              "Enable if you allow mixed gender rooms"
                            )}
                          </span>
                        }
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="maintenanceNotificationThreshold"
                        label={
                          <span>
                            Maintenance Alert (days){" "}
                            {renderTooltip("Days before maintenance alert")}
                          </span>
                        }
                        rules={[{ required: true }]}
                      >
                        <InputNumber
                          min={1}
                          max={30}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          )}

          {/* Bed Settings */}
          {activeTab === "beds" && (
            <div className="settings-section">
              <Card title="Bed Settings" className="settings-card">
                <div className="bed-types-section">
                  <div className="section-header">
                    <h3>Bed Types</h3>
                    <PgButton
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddBedType}
                    >
                      Add Bed Type
                    </PgButton>
                  </div>

                  <Table
                    columns={bedTypeColumns}
                    dataSource={bedTypes}
                    rowKey="id"
                    pagination={false}
                  />
                </div>
              </Card>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payments" && (
            <div className="settings-section">
              <Card title="Payment Settings" className="settings-card">
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="currency"
                      label={
                        <span>
                          Currency{" "}
                          {renderTooltip(
                            "Default currency for all transactions"
                          )}
                        </span>
                      }
                    >
                      <Select>
                        <Select.Option value="INR">INR (₹)</Select.Option>
                        <Select.Option value="USD">USD ($)</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="paymentDueDay"
                      label={
                        <span>
                          Payment Due Day{" "}
                          {renderTooltip("Day of month when rent is due")}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={1} max={31} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="latePaymentGracePeriod"
                      label={
                        <span>
                          Grace Period (days){" "}
                          {renderTooltip(
                            "Days allowed after due date before late fee"
                          )}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} max={30} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="latePaymentFee"
                      label={
                        <span>
                          Late Fee{" "}
                          {renderTooltip("Fee charged for late payments")}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="securityDepositMonths"
                      label={
                        <span>
                          Security Deposit (months){" "}
                          {renderTooltip(
                            "Number of months rent as security deposit"
                          )}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={1} max={12} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="advanceRentMonths"
                      label={
                        <span>
                          Advance Rent (months){" "}
                          {renderTooltip(
                            "Number of months rent to be paid in advance"
                          )}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={1} max={12} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="paymentMethods"
                  label={
                    <span>
                      Accepted Payment Methods{" "}
                      {renderTooltip("Payment methods accepted")}
                    </span>
                  }
                >
                  <Select mode="multiple" placeholder="Select payment methods">
                    <Select.Option value="cash">Cash</Select.Option>
                    <Select.Option value="bank_transfer">
                      Bank Transfer
                    </Select.Option>
                    <Select.Option value="upi">UPI</Select.Option>
                    <Select.Option value="cheque">Cheque</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <Card title="Notification Settings" className="settings-card">
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="enableEmailNotifications"
                      label={
                        <span>
                          Email Notifications{" "}
                          {renderTooltip("Enable email notifications")}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="enableSMSNotifications"
                      label={
                        <span>
                          SMS Notifications{" "}
                          {renderTooltip("Enable SMS notifications")}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="tab-title" style={{marginBottom: "16px"}}>Notification Preferences</div>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name={["notificationPreferences", "paymentReminders"]}
                      label={
                        <span>
                          Payment Reminders{" "}
                          {renderTooltip(
                            "Get notified about upcoming payments"
                          )}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["notificationPreferences", "maintenanceAlerts"]}
                      label={
                        <span>
                          Maintenance Alerts{" "}
                          {renderTooltip(
                            "Get notified about maintenance issues"
                          )}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name={["notificationPreferences", "newTenantAlerts"]}
                      label={
                        <span>
                          New Tenant Alerts{" "}
                          {renderTooltip(
                            "Get notified about new tenant registrations"
                          )}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["notificationPreferences", "exitNotices"]}
                      label={
                        <span>
                          Exit Notices{" "}
                          {renderTooltip("Get notified about tenant exits")}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={["notificationPreferences", "complianceAlerts"]}
                  label={
                    <span>
                      Compliance Alerts{" "}
                      {renderTooltip(
                        "Get notified about compliance requirements"
                      )}
                    </span>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div className="settings-section">
              <Card title="System Settings" className="settings-card">
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="autoBackup"
                      label={
                        <span>
                          Auto Backup{" "}
                          {renderTooltip("Enable automatic data backup")}
                        </span>
                      }
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="backupFrequency"
                      label={
                        <span>
                          Backup Frequency{" "}
                          {renderTooltip("How often to backup data")}
                        </span>
                      }
                    >
                      <Select>
                        <Select.Option value="daily">Daily</Select.Option>
                        <Select.Option value="weekly">Weekly</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="dataRetentionPeriod"
                      label={
                        <span>
                          Data Retention (days){" "}
                          {renderTooltip("How long to keep historical data")}
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        min={30}
                        max={3650}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="theme"
                      label={
                        <span>
                          Theme {renderTooltip("Application theme preference")}
                        </span>
                      }
                    >
                      <Select>
                        <Select.Option value="light">Light</Select.Option>
                        <Select.Option value="dark">Dark</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="primaryColor"
                  label={
                    <span>
                      Primary Color{" "}
                      {renderTooltip("Main color theme for the application")}
                    </span>
                  }
                >
                  <ColorPicker />
                </Form.Item>
              </Card>
            </div>
          )}

          <div className="settings-actions">
            <Space>
              <PgButton
                type="secondary"
                icon={<ReloadOutlined />}
                onClick={handleReset}
              >
                Reset to Default
              </PgButton>
              <PgButton
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              >
                Save Changes
              </PgButton>
            </Space>
          </div>
        </Form>
      </div>

      {/* Room Type Modal */}
      <Modal
        title={editingRoomType ? "Edit Room Type" : "Add Room Type"}
        open={isRoomTypeModalVisible}
        onCancel={() => setIsRoomTypeModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingRoomType}
          onFinish={handleRoomTypeModalOk}
        >
          <Form.Item
            name="name"
            label="Type Name"
            rules={[{ required: true, message: "Please enter type name" }]}
          >
            <Input placeholder="e.g., Deluxe AC" />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <InputNumber min={1} max={10} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true, message: "Please enter base price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} prefix="₹" />
          </Form.Item>
          <Form.Item
            name="amenities"
            label="Amenities"
          >
            <Select mode="multiple" placeholder="Select amenities">
              <Select.Option value="wifi">WiFi</Select.Option>
              <Select.Option value="ac">AC</Select.Option>
              <Select.Option value="tv">TV</Select.Option>
              <Select.Option value="attached_bathroom">Attached Bathroom</Select.Option>
              <Select.Option value="geyser">Geyser</Select.Option>
              <Select.Option value="wardrobe">Wardrobe</Select.Option>
              <Select.Option value="balcony">Balcony</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsRoomTypeModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingRoomType ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bed Type Modal */}
      <Modal
        title={editingBedType ? "Edit Bed Type" : "Add Bed Type"}
        open={isBedTypeModalVisible}
        onCancel={() => setIsBedTypeModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingBedType}
          onFinish={handleBedTypeModalOk}
        >
          <Form.Item
            name="name"
            label="Type Name"
            rules={[{ required: true, message: "Please enter type name" }]}
          >
            <Input placeholder="e.g., Single Bed" />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Please enter bed size" }]}
          >
            <Select>
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="double">Double</Select.Option>
              <Select.Option value="queen">Queen</Select.Option>
              <Select.Option value="king">King</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true, message: "Please enter base price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} prefix="₹" />
          </Form.Item>
          <Form.Item
            name="features"
            label="Features"
          >
            <Select mode="multiple" placeholder="Select features">
              <Select.Option value="mattress">Mattress</Select.Option>
              <Select.Option value="pillow">Pillow</Select.Option>
              <Select.Option value="blanket">Blanket</Select.Option>
              <Select.Option value="bed_sheet">Bed Sheet</Select.Option>
              <Select.Option value="side_table">Side Table</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsBedTypeModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingBedType ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
