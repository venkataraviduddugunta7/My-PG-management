import { useState } from "react";
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
} from "antd";
import {
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./Settings.scss";
import { updateSettings, updateNotificationPreferences, resetSettings } from "../../store/slices/settingsSlice";
import PgButton from "../../components/resusableComponents/PgButton";

const Settings = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("general");

  // Tab configuration
  const tabs = [
    { id: "general", label: "General" },
    { id: "rooms", label: "Rooms" },
    { id: "payments", label: "Payments" },
    { id: "notifications", label: "Notifications" },
    { id: "system", label: "System" },
  ];

  const handleSave = async (values) => {
    try {
      dispatch(updateSettings(values));
      message.success("Settings saved successfully");
    } catch (error) {
      message.error("Failed to save settings");
    }
  };

  const handleReset = () => {
    dispatch(resetSettings());
    form.resetFields();
    message.success("Settings reset to default values");
  };

  const handleNotificationPreferenceChange = (key, value) => {
    dispatch(updateNotificationPreferences({ [key]: value }));
  };

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
        {/* General Settings */}
        {activeTab === "general" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">General Settings</div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings}
              onFinish={handleSave}
            >
              <Form.Item
                name="pgName"
                label="PG Name"
                rules={[{ required: true, message: "Please enter PG name" }]}
              >
                <Input placeholder="Enter PG name" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input.TextArea rows={3} placeholder="Enter address" />
              </Form.Item>

              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[{ required: true, message: "Please enter contact number" }]}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Form>
          </div>
        )}

        {/* Room Settings */}
        {activeTab === "rooms" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Room Settings</div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings}
              onFinish={handleSave}
            >
              <Form.Item
                name="defaultRoomCapacity"
                label="Default Room Capacity"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>

              <Form.Item
                name="allowMixedGenderRooms"
                label="Allow Mixed Gender Rooms"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="maintenanceNotificationThreshold"
                label="Maintenance Notification Threshold (days)"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={30} />
              </Form.Item>
            </Form>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === "payments" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Payment Settings</div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings}
              onFinish={handleSave}
            >
              <Form.Item name="currency" label="Currency">
                <Select>
                  <Select.Option value="INR">INR (₹)</Select.Option>
                  <Select.Option value="USD">USD ($)</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="paymentDueDay"
                label="Payment Due Day"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={31} />
              </Form.Item>

              <Form.Item
                name="latePaymentGracePeriod"
                label="Late Payment Grace Period (days)"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={30} />
              </Form.Item>

              <Form.Item
                name="latePaymentFee"
                label="Late Payment Fee"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                name="securityDepositMonths"
                label="Security Deposit (months)"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={12} />
              </Form.Item>
            </Form>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Notification Settings</div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings}
              onFinish={handleSave}
            >
              <Form.Item
                name="enableEmailNotifications"
                label="Enable Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="enableSMSNotifications"
                label="Enable SMS Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Divider>Notification Preferences</Divider>

              <Form.Item
                name={["notificationPreferences", "paymentReminders"]}
                label="Payment Reminders"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name={["notificationPreferences", "maintenanceAlerts"]}
                label="Maintenance Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name={["notificationPreferences", "newTenantAlerts"]}
                label="New Tenant Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name={["notificationPreferences", "exitNotices"]}
                label="Exit Notices"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name={["notificationPreferences", "complianceAlerts"]}
                label="Compliance Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Form>
          </div>
        )}

        {/* System Settings */}
        {activeTab === "system" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">System Settings</div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings}
              onFinish={handleSave}
            >
              <Form.Item
                name="autoBackup"
                label="Enable Auto Backup"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item name="backupFrequency" label="Backup Frequency">
                <Select>
                  <Select.Option value="daily">Daily</Select.Option>
                  <Select.Option value="weekly">Weekly</Select.Option>
                  <Select.Option value="monthly">Monthly</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dataRetentionPeriod"
                label="Data Retention Period (days)"
                rules={[{ required: true }]}
              >
                <InputNumber min={30} max={3650} />
              </Form.Item>

              <Form.Item name="theme" label="Theme">
                <Select>
                  <Select.Option value="light">Light</Select.Option>
                  <Select.Option value="dark">Dark</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="primaryColor" label="Primary Color">
                <ColorPicker />
              </Form.Item>
            </Form>
          </div>
        )}

        <Divider />

        <div className="settings-actions">
          <Space>
            <PgButton
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
            >
              Save Changes
            </PgButton>
            <PgButton
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              Reset to Default
            </PgButton>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Settings;
