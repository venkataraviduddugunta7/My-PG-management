import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useState } from "react";
import PgButton from "./PgButton";

const { Option } = Select;

const roomTypes = ["Standard", "Deluxe", "Premium", "Dormitory", "Shared"];

const AddRoomModal = ({ visible, onClose, onSubmit, floors }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      closable={false}
      title="Add New Room"
      open={visible}
      onCancel={onClose}
      footer={
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <PgButton
            key="cancel"
            type="secondary"
            size="small"
            onClick={onClose}
          >
            Cancel
          </PgButton>
          ,
          <PgButton
            key="submit"
            type="primary"
            size="small"
            onClick={() => form.submit()}
          >
            Add Room
          </PgButton>
          ,
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="floorId"
          label="Select Floor"
          rules={[{ required: true, message: "Please select a floor" }]}
        >
          <Select placeholder="Select floor">
            {floors.map((floor) => (
              <Option key={floor.id} value={floor.id}>
                {floor.floorName || `Floor ${floor.floorNumber}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="roomNumber"
          label="Room Number"
          rules={[{ required: true, message: "Please enter room number" }]}
        >
          <Input placeholder="e.g. 101, 102..." />
        </Form.Item>

        <Form.Item
          name="roomType"
          label="Room Type"
          rules={[{ required: true, message: "Please select room type" }]}
        >
          <Select placeholder="Select room type">
            {roomTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Maximum Capacity"
          rules={[{ required: true, message: "Please enter capacity" }]}
        >
          <InputNumber min={1} max={10} placeholder="Number of beds" />
        </Form.Item>

        <Form.Item
          name="rent"
          label="Monthly Rent"
          rules={[{ required: true, message: "Please enter rent amount" }]}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
