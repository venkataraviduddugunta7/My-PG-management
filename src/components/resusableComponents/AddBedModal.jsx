import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useState } from "react";
import PgButton from "./PgButton";

const { Option } = Select;

const bedTypes = ["Single", "Bunk", "Double", "Queen", "King"];

const AddBedModal = ({ visible, onClose, onSubmit, rooms }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      closable={false}
      title="Add New Bed"
      open={visible}
      onCancel={onClose}
      footer={
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <PgButton
            key="cancel"
            size="small"
            type="secondary"
            onClick={onClose}
          >
            Cancel
          </PgButton>
          ,
          <PgButton
            key="submit"
            size="small"
            type="primary"
            onClick={() => form.submit()}
          >
            Add Bed
          </PgButton>
          ,
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="roomId"
          label="Select Room"
          rules={[{ required: true, message: "Please select a room" }]}
        >
          <Select placeholder="Select room">
            {rooms.map((room) => (
              <Option key={room.id} value={room.id}>
                {`${room.roomNumber} (${room.roomType})`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="bedNumber"
          label="Bed Number/Identifier"
          rules={[{ required: true, message: "Please enter bed number" }]}
        >
          <Input placeholder="e.g. 1, 2, A, B..." />
        </Form.Item>

        <Form.Item
          name="bedType"
          label="Bed Type"
          rules={[{ required: true, message: "Please select bed type" }]}
        >
          <Select placeholder="Select bed type">
            {bedTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Initial Status"
          initialValue="available"
        >
          <Select>
            <Option value="available">Available</Option>
            <Option value="occupied">Occupied</Option>
            <Option value="maintenance">Under Maintenance</Option>
          </Select>
        </Form.Item>

        <Form.Item name="notes" label="Notes (Optional)">
          <Input.TextArea
            rows={2}
            placeholder="Any special notes about this bed"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBedModal;
