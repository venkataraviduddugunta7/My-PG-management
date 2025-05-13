import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import PgButton from "./PgButton";
import "./TenantForm.scss";

const AddFloorModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      className="premium-tenant-form"
      closable={false}
      title="Add New Floor"
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
          <PgButton key="submit" size="small" onClick={() => form.submit()}>
            Add Floor
          </PgButton>
          ,
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="form-lable">Floor Number</div>
        <Form.Item
          name="floorNumber"
          rules={[{ required: true, message: "Please enter floor number" }]}
        >
          <Input type="number" min={0} placeholder="e.g. 1, 2, 3..." />
        </Form.Item>
        <div className="form-lable">Floor Name</div>
        <Form.Item name="floorName">
          <Input placeholder="e.g. Ground Floor, First Floor" />
        </Form.Item>
        <div className="form-lable">Description</div>
        <Form.Item name="description">
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
