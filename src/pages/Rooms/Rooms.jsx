import { Form, InputNumber, Select, Button, message } from "antd";
import { useState } from "react";
import "./Rooms.scss";

const Rooms = () => {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [activeTab, setActiveTab] = useState("Floors"); // Default active tab

  const [form] = Form.useForm();

  // Tab configuration
  const tabs = [
    { id: "Beds", label: "Beds" },
    { id: "Rooms", label: "Rooms" },
    { id: "Floors", label: "Floors" },
  ];

  // ─── Floor Creation ───────────────────────────────────────────
  const createFloor = (values) => {
    const newFloor = {
      id: `F${floors.length + 1}`,
      ...values,
    };
    setFloors([...floors, newFloor]);
    message.success("Floor added!");
    form.resetFields();
  };

  // ─── Room Creation ────────────────────────────────────────────
  const createRoom = (values) => {
    const newRoom = {
      id: `R${rooms.length + 1}`,
      ...values,
    };
    setRooms([...rooms, newRoom]);
    message.success("Room added!");
    form.resetFields();
  };

  // ─── Bed Creation ─────────────────────────────────────────────
  const createBed = (values) => {
    const newBed = {
      id: `B${beds.length + 1}`,
      ...values,
    };
    setBeds([...beds, newBed]);
    message.success("Bed(s) added!");
    form.resetFields();
  };

  return (
    <div className="RoomsStyle">
      <div className="tabheader">Room Management</div>

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
        {/* Floor Tab */}
        {activeTab === "Floors" && (
          <Form layout="vertical" onFinish={createFloor} form={form}>
            <Form.Item
              label="Floor Number"
              name="floorNumber"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Room Capacity on Floor"
              name="roomCapacity"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Floor
            </Button>
          </Form>
        )}

        {/* Room Tab */}
        {activeTab === "Rooms" && (
          <Form layout="vertical" onFinish={createRoom} form={form}>
            <Form.Item
              label="Select Floor"
              name="floorId"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a floor">
                {floors.map((floor) => (
                  <Select.Option key={floor.id} value={floor.id}>
                    Floor {floor.floorNumber}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Room Number"
              name="roomNumber"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Sharing Capacity"
              name="sharingCapacity"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Room
            </Button>
          </Form>
        )}

        {/* Bed Tab */}
        {activeTab === "Beds" && (
          <Form layout="vertical" onFinish={createBed} form={form}>
            <Form.Item
              label="Select Room"
              name="roomId"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a room">
                {rooms.map((room) => (
                  <Select.Option key={room.id} value={room.id}>
                    Room {room.roomNumber}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Number of Beds"
              name="bedCount"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Beds
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Rooms;
