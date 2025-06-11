import { Modal, Form, Input, Select, InputNumber, Tooltip } from "antd";
import { useEffect, useState } from "react";
import "./TenantForm.scss";
import PgButton from "./PgButton";
import { DropdownIcon, TagsCloseIcon } from "./DrayageIcons";

const { Option } = Select;

const bedTypes = ["Single", "Bunk", "Double", "Queen", "King"];

const AddBedModal = ({ visible, onClose, onSubmit, rooms, bedData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (bedData) {
      form.setFieldsValue(bedData);
    } else {
      form.resetFields();
    }
  }, [bedData, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
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
          <div>{bedData ? "Edit Bed" : "New Bed"}</div>
          <Tooltip title="Close">
            <TagsCloseIcon width={24} height={24} onClick={onClose} />
          </Tooltip>
        </div>
      }
      className="premium-tenant-form"
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
        <div className="form-lable">Room</div>
        <Form.Item
          name="roomId"
          rules={[{ required: true, message: "Please select a room" }]}
        >
          <Select placeholder="Select room" suffixIcon={<DropdownIcon />}>
            {rooms.map((room) => (
              <Option key={room.id} value={room.id}>
                {room.name || room.roomNumber || room.id}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="form-lable">Bed Number</div>
        <Form.Item
          name="bedNumber"
          rules={[{ required: true, message: "Please enter bed number" }]}
        >
          <Input placeholder="e.g. 1, 2, A, B..." />
        </Form.Item>
        <div className="form-lable">Bed Type</div>
        <Form.Item
          name="bedType"
          rules={[{ required: true, message: "Please select bed type" }]}
        >
          <Select placeholder="Select bed type" suffixIcon={<DropdownIcon />}>
            {bedTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="form-lable">Monthly Rent</div>
        <Form.Item
          name="rent"
          rules={[{ required: true, message: "Please enter rent amount" }]}
        >
          <Input
            min={1}
            type="number"
            style={{ width: "100%" }}
            placeholder="Monthly Rent"
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
          />
        </Form.Item>
        <div className="form-lable">Initial Status</div>
        <Form.Item name="status" initialValue="Available">
          <Select suffixIcon={<DropdownIcon />}>
            <Option value="Available">Available</Option>
            <Option value="Occupied">Occupied</Option>
            <Option value="Maintenance">Under Maintenance</Option>
          </Select>
        </Form.Item>
        <div className="form-lable">Notes</div>
        <Form.Item name="notes">
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
