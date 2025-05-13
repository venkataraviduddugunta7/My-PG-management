import { Form, Select, message } from "antd";
import { useState } from "react";
import "./Rooms.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import AddFloorModal from "../../components/resusableComponents/AddFloorModal";
import AddRoomModal from "../../components/resusableComponents/AddRoomModal";
import AddBedModal from "../../components/resusableComponents/AddBedModal";
import PgTable from "../../components/resusableComponents/PgTable";

const Rooms = () => {
  const [floors, setFloors] = useState([]);
  const [floorModal, setFloorModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomModal, setRoomModal] = useState(false);
  const [beds, setBeds] = useState([]);
  const [bedModal, setBedModal] = useState(false);
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
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
                alignItems: "center",
              }}
            >
              <div className="tab-title">Floors</div>
              <PgButton onClick={() => setFloorModal(true)}>Add Floor</PgButton>
            </div>
            <div>
              <PgTable />
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
              <div className="tab-title">Rooms</div>
              <PgButton onClick={() => setRoomModal(true)}>Add Room</PgButton>
            </div>
            <div>
              <PgTable />
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
              <div className="tab-title">Beds</div>
              <PgButton onClick={() => setBedModal(true)}>Add Bed</PgButton>
            </div>
            <div>
              <PgTable />
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
