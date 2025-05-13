import { Form, Select, message } from "antd";
import { useState } from "react";
import "./Rooms.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import AddFloorModal from "../../components/resusableComponents/AddFloorModal";
import AddRoomModal from "../../components/resusableComponents/AddRoomModal";
import AddBedModal from "../../components/resusableComponents/AddBedModal";
import PgTable from "../../components/resusableComponents/PgTable";

const Rooms = () => {
  const [floorModal, setFloorModal] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [bedModal, setBedModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Floors");

  const [form] = Form.useForm();

  // Tab configuration
  const tabs = [
    { id: "Beds", label: "Beds" },
    { id: "Rooms", label: "Rooms" },
    { id: "Floors", label: "Floors" },
  ];

  const [floors, setFloors] = useState([
    {
      id: "floor-1",
      floorNumber: 1,
      floorName: "Ground Floor",
      description: "Main floor with reception",
    },
    {
      id: "floor-2",
      floorNumber: 2,
      floorName: "First Floor",
      description: "Standard rooms floor",
    },
    {
      id: "floor-3",
      floorNumber: 3,
      floorName: "Second Floor",
      description: "Premium rooms floor",
    },
  ]);

  const [rooms, setRooms] = useState([
    {
      id: "room-1",
      floorId: "floor-1",
      roomNumber: "101",
      roomType: "Standard",
      capacity: 2,
      rent: 5000,
    },
    {
      id: "room-2",
      floorId: "floor-1",
      roomNumber: "102",
      roomType: "Deluxe",
      capacity: 3,
      rent: 7000,
    },
    {
      id: "room-3",
      floorId: "floor-2",
      roomNumber: "201",
      roomType: "Premium",
      capacity: 2,
      rent: 8000,
    },
    {
      id: "room-4",
      floorId: "floor-3",
      roomNumber: "301",
      roomType: "Shared",
      capacity: 4,
      rent: 4000,
    },
  ]);

  const [beds, setBeds] = useState([
    {
      id: "bed-1",
      roomId: "room-1",
      bedNumber: "1",
      bedType: "Single",
      status: "occupied",
      notes: "Near window",
    },
    {
      id: "bed-2",
      roomId: "room-1",
      bedNumber: "2",
      bedType: "Single",
      status: "available",
      notes: "Near door",
    },
    {
      id: "bed-3",
      roomId: "room-2",
      bedNumber: "1",
      bedType: "Bunk",
      status: "available",
      notes: "Lower bunk",
    },
    {
      id: "bed-4",
      roomId: "room-2",
      bedNumber: "2",
      bedType: "Bunk",
      status: "available",
      notes: "Upper bunk",
    },
    {
      id: "bed-5",
      roomId: "room-3",
      bedNumber: "1",
      bedType: "Double",
      status: "maintenance",
      notes: "Needs mattress replacement",
    },
  ]);

  const floorColumns = [
    {
      title: "Floor ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Floor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <a onClick={() => onEdit(record)}>Edit</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </>
      ),
    },
  ];

  const roomColumns = [
    {
      title: "Room ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <a onClick={() => onEdit(record)}>Edit</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </>
      ),
    },
  ];

  const bedColumns = [
    {
      title: "Bed ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bed Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Occupied" ? "red" : "green" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <a onClick={() => onEdit(record)}>Edit</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </>
      ),
    },
  ];

  const handleAddFloor = (floorData) => {
    const newFloor = {
      ...floorData,
      id: `floor-${floors.length + 1}`,
    };
    setFloors([...floors, newFloor]);
    setFloorModal(false);
  };

  const handleAddRoom = (roomData) => {
    const newRoom = {
      ...roomData,
      id: `room-${rooms.length + 1}`,
    };
    setRooms([...rooms, newRoom]);
    setRoomModal(false);
  };

  const handleAddBed = (bedData) => {
    const newBed = {
      ...bedData,
      id: `bed-${beds.length + 1}`,
    };
    setBeds([...beds, newBed]);
    setBedModal(false);
  };

  const handleEditFloor = (floor) => {
    setFloorModal(true);
    form.setFieldsValue(floor);
  };

  const handleDeleteFloor = (id) => {
    setFloors(floors.filter((f) => f.id !== id));
    message.success("Floor deleted");
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
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Floors {floors.length}</div>
              <PgButton onClick={() => setFloorModal(true)}>Add Floor</PgButton>
            </div>
            <div>
              <PgTable columns={floorColumns} dataSource={floors} />
            </div>

            <AddFloorModal
              visible={floorModal}
              onClose={() => setFloorModal(false)}
            />
          </div>
        )}

        {/* Room Tab */}
        {activeTab === "Rooms" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Rooms {rooms.length}</div>
              <PgButton onClick={() => setRoomModal(true)}>Add Room</PgButton>
            </div>
            <div>
              <PgTable columns={roomColumns} dataSource={rooms} />
            </div>

            <AddRoomModal
              visible={roomModal}
              floors={floors}
              onClose={() => setRoomModal(false)}
            />
          </div>
        )}

        {/* Bed Tab */}
        {activeTab === "Beds" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Beds {beds.length}</div>
              <PgButton onClick={() => setBedModal(true)}>Add Bed</PgButton>
            </div>
            <div>
              <PgTable columns={bedColumns} dataSource={beds} />
            </div>
            <AddBedModal
              visible={bedModal}
              rooms={rooms}
              onClose={() => setBedModal(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
