import { Form, Popconfirm, Select, Tooltip, message } from "antd";
import { useState } from "react";
import "./Rooms.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import AddFloorModal from "../../components/resusableComponents/AddFloorModal";
import AddRoomModal from "../../components/resusableComponents/AddRoomModal";
import AddBedModal from "../../components/resusableComponents/AddBedModal";
import PgTable from "../../components/resusableComponents/PgTable";
import {
  ItemDeleteIcon,
  ItemEditIcon,
} from "../../components/resusableComponents/DrayageIcons";

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

  const [floors, setFloors] = useState([]);
  const [editingFloor, setEditingFloor] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [editingBed, setEditingBed] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  const handleAddFloor = (floorData) => {
    if (editingFloor) {
      // Update existing floor
      setFloors(
        floors.map((floor) =>
          floor.id === editingFloor.id ? { ...floor, ...floorData } : floor
        )
      );
      message.success("Floor updated successfully");
    } else {
      // Add new floor
      const newFloor = {
        ...floorData,
        id: `floor-${floors.length + 1}`,
      };
      setFloors([...floors, newFloor]);
      message.success("Floor added successfully");
    }
    setFloorModal(false);
    setEditingFloor(null);
  };

  const handleEditFloor = (floor) => {
    setEditingFloor(floor);
    setFloorModal(true);
  };

  const handleDeleteFloor = (id) => {
    // Check if any rooms are using this floor
    const roomsUsingFloor = rooms.some((room) => room.floorId === id);

    if (roomsUsingFloor) {
      message.error("Cannot delete floor with existing rooms");
      return;
    }

    setFloors(floors.filter((floor) => floor.id !== id));
    message.success("Floor deleted successfully");
  };

  const floorColumns = [
    {
      title: "Floor ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Floor Name",
      dataIndex: "floorName",
      key: "floorName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}
        >
          <Tooltip title="Edit">
            <ItemEditIcon onClick={() => handleEditFloor(record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this floor?"
            onConfirm={() => handleDeleteFloor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <ItemDeleteIcon style={{ cursor: "pointer" }} />
            </Tooltip>
          </Popconfirm>
        </div>
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
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}
        >
          <Tooltip title="Edit">
            <ItemEditIcon onClick={() => handleEditFloor(record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this Room?"
            onConfirm={() => handleDeleteFloor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <ItemDeleteIcon style={{ cursor: "pointer" }} />
            </Tooltip>
          </Popconfirm>
        </div>
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
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}
        >
          <Tooltip title="Edit">
            <ItemEditIcon onClick={() => handleEditFloor(record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this Bed?"
            onConfirm={() => handleDeleteFloor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <ItemDeleteIcon style={{ cursor: "pointer" }} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
              <div className="tab-title">Floors - {floors.length}</div>
              <PgButton onClick={() => setFloorModal(true)}>Add Floor</PgButton>
            </div>
            <div>
              <PgTable columns={floorColumns} dataSource={floors} />
            </div>

            <AddFloorModal
              onSubmit={handleAddFloor}
              visible={floorModal}
              onClose={() => setFloorModal(false)}
              floorData={editingFloor}
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
              <div className="tab-title">Rooms - {rooms.length}</div>
              <PgButton onClick={() => setRoomModal(true)}>Add Room</PgButton>
            </div>
            <div>
              <PgTable columns={roomColumns} dataSource={rooms} />
            </div>

            <AddRoomModal
              visible={roomModal}
              floors={floors}
              onClose={() => setRoomModal(false)}
              onSubmit={handleAddRoom}
              roomData={editingRoom}
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
              <div className="tab-title">Beds - {beds.length}</div>
              <PgButton onClick={() => setBedModal(true)}>Add Bed</PgButton>
            </div>
            <div>
              <PgTable columns={bedColumns} dataSource={beds} />
            </div>
            <AddBedModal
              visible={bedModal}
              rooms={rooms}
              onClose={() => setBedModal(false)}
              onSubmit={handleAddBed}
              bedData={editingBed}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
