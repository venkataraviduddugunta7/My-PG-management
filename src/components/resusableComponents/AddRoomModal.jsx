import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import PgButton from "./PgButton";
import "./TenantForm.scss";
import { DropdownIcon, TagsCloseIcon } from "./DrayageIcons";

const { Option } = Select;

const roomTypes = ["Standard", "Deluxe", "Premium", "Dormitory", "Shared"];

const AddRoomModal = ({ visible, onClose, onSubmit, floors, roomData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (roomData) {
      form.setFieldsValue(roomData);
    } else {
      form.resetFields();
    }
  }, [roomData, form]);

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
          <div>{roomData ? "Edit Room" : "New Room"}</div>
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
        <div className="form-lable">Floor</div>
        <Form.Item
          name="floorId"
          rules={[{ required: true, message: "Please select a floor" }]}
        >
          <Select placeholder="Select floor" suffixIcon={<DropdownIcon />}>
            {floors.map((floor) => (
              <Option key={floor.id} value={floor.id}>
                {floor.floorName || `Floor ${floor.floorNumber}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="form-lable">Room Number</div>
        <Form.Item
          name="roomNumber"
          rules={[{ required: true, message: "Please enter room number" }]}
        >
          <Input placeholder="e.g. 101, 102..." />
        </Form.Item>
        <div className="form-lable">Room Name</div>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter room name" }]}
        >
          <Input placeholder="e.g. Room 101, Deluxe Room A..." />
        </Form.Item>
        <div className="form-lable">Room Type</div>
        <Form.Item
          name="roomType"
          rules={[{ required: true, message: "Please select room type" }]}
        >
          <Select placeholder="Select room type" suffixIcon={<DropdownIcon />}>
            {roomTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Row gutter={[16]}>
          <Col span={12}>
            <div className="form-lable">Maximum Capacity</div>
            <Form.Item
              name="capacity"
              rules={[{ required: true, message: "Please enter capacity" }]}
            >
              <Input
                min={1}
                type="number"
                placeholder="Number of beds"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
