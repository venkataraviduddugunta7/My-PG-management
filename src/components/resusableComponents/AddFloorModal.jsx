import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import PgButton from "./PgButton";

const AddFloorModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Floor"
      open={visible}
      onCancel={onClose}
      footer={[
        <PgButton key="cancel" type="secondary" size="small" onClick={onClose}>
          Cancel
        </PgButton>,
        <PgButton key="submit" size="small" onClick={() => form.submit()}>
          Add Floor
        </PgButton>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="floorNumber"
          label="Floor Number"
          rules={[{ required: true, message: "Please enter floor number" }]}
        >
          <Input type="number" min={0} placeholder="e.g. 1, 2, 3..." />
        </Form.Item>

        <Form.Item name="floorName" label="Floor Name (Optional)">
          <Input placeholder="e.g. Ground Floor, First Floor" />
        </Form.Item>

        <Form.Item name="description" label="Description (Optional)">
          <Input.TextArea
            rows={3}
            placeholder="Any special notes about this floor"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFloorModal;
