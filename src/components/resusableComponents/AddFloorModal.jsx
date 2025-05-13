import { Modal, Form, Input, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import PgButton from "./PgButton";
import "./TenantForm.scss";
import { TagsCloseIcon } from "./DrayageIcons";

const AddFloorModal = ({ visible, onClose, onSubmit, floorData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (floorData) {
      form.setFieldsValue(floorData);
    } else {
      form.resetFields();
    }
  }, [floorData, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      className="premium-tenant-form"
      closable={false}
      title={
        <div
          className="modal-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{floorData ? "Edit Floor" : "New Floor"}</div>
          <Tooltip title="Close">
            <TagsCloseIcon width={24} height={24} onClick={onClose} />
          </Tooltip>
        </div>
      }
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
           {floorData? "Update Floor " : "Add Floor"}
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
