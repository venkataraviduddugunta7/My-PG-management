import { Col, Input, Row } from "antd";
import TenantCard from "../../components/resusableComponents/TenantCard";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Tenants.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import TenantFormModal from "../../components/resusableComponents/TenantFormModal";
import { useState } from "react";
import TermsAgreementModal from "../../components/resusableComponents/TermsAgreementModal";
import {
  FilterSearchIcon,
  RouteCommercialIcon,
  RouteWarehouseIcon,
  TagsCloseIcon,
} from "../../components/resusableComponents/DrayageIcons";
import PgTable from "../../components/resusableComponents/PgTable";

// Mock data generator function
const generateTenants = () => {
  const tenants = [];

  const imageOptions = [
    "https://xsgames.co/randomusers/avatar.php?g=male",
    "https://xsgames.co/randomusers/avatar.php?g=female",
    "https://xsgames.co/randomusers/avatar.php?g=pixel",
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
  ];

  const professions = [
    "Software Engineer",
    "Doctor",
    "Teacher",
    "Marketing Executive",
    "Graphic Designer",
    "Accountant",
    "Nurse",
    "Data Analyst",
    "Sales Manager",
    "Architect",
    "Chef",
    "Electrician",
    "Student",
    "Research Scientist",
    "Bank Manager",
    "Journalist",
    "Interior Designer",
    "Pharmacist",
    "HR Manager",
    "Civil Engineer",
  ];

  for (let i = 1; i <= 10; i++) {
    tenants.push({
      id: `T${1000 + i}`,
      name: `Tenant ${i}`,
      age: 20 + Math.floor(Math.random() * 30),
      dob: `19${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 12 + 1)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 28 + 1)
        .toString()
        .padStart(2, "0")}`,
      doj: `20${Math.floor(Math.random() * 15 + 10)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 12 + 1)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 28 + 1)
        .toString()
        .padStart(2, "0")}`,
      mobile: `${Math.floor(9000000000 + Math.random() * 1000000000)}`,
      address: `Address Line ${i}, City ${i}`,
      pincode: Math.floor(100000 + Math.random() * 900000),
      profession: professions[Math.floor(Math.random() * professions.length)],
      isActive: Math.random() > 0.3,
      image:
        imageOptions[Math.floor(Math.random() * imageOptions.length)] +
        `&random=${i}`,
    });
  }
  return tenants;
};

const Tenants = () => {
  // Initialize state with generated tenants
  const [tenants, setTenants] = useState(generateTenants());
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isTermsModalVisible, setTermsModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingTenantData, setPendingTenantData] = useState(null);

  // Calculate statistics based on current tenants
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.isActive).length;
  const inactiveTenants = totalTenants - activeTenants;

  const [selectedMode, setSelectedMode] = useState("table");

  const modes = [
    { id: "table", component: RouteCommercialIcon },
    { id: "card", component: RouteWarehouseIcon },
  ];

  const statsData = [
    { name: "All Tenants", value: totalTenants },
    { name: "Active Tenants", value: activeTenants },
    { name: "Inactive Tenants", value: inactiveTenants },
    { name: "Blocked", value: inactiveTenants },
  ];

  const columnDefs = [
    {
      title: "Tenant ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date of Joining",
      dataIndex: "doj",
      key: "doj",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];
  

  // Filter tenants based on search term
  // const filteredTenants = tenants.filter(
  //   (tenant) =>
  //     tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     tenant.mobile.includes(searchTerm) ||
  //     tenant.profession.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleAddTenant = (formData) => {
    if (termsAccepted) {
      const newTenant = {
        ...formData,
        id: `T${1000 + tenants.length + 1}`,
        isActive: true,
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel",
      };
      setTenants([...tenants, newTenant]);
      setAddModalVisible(false);
    } else {
      setPendingTenantData(formData);
      setTermsModalVisible(true);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setTermsModalVisible(false);
    if (pendingTenantData) {
      const newTenant = {
        ...pendingTenantData,
        id: `T${1000 + tenants.length + 1}`,
        isActive: true,
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel",
      };
      setTenants([...tenants, newTenant]);
      setAddModalVisible(false);
      setPendingTenantData(null);
    }
  };

  return (
    <div className="TenantStyles">
      <div className="tabheader">Tenants</div>
      <div style={{ padding: "16px" }}>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {statsData.map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <StatsCard statName={stat.name} count={stat.value} />
            </Col>
          ))}
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "16px",
          }}
        >
          <div>
            <Input
              placeholder="Search tenants..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              style={{ width: "224px" }}
              className="input-style"
              suffix={
                searchTerm ? (
                  <TagsCloseIcon onClick={() => setSearchTerm("")} />
                ) : (
                  <FilterSearchIcon />
                )
              }
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                background: "#f7f8fa",
                borderRadius: "24px",
                outline: "2px solid #cdd4f0",
                overflow: "hidden", // Ensures rounded corners clip content
              }}
            >
              {modes.map(({ id, component: IconComponent }, index) => {
                const isSelected = selectedMode === id;
                const isFirst = index === 0;
                const isLast = index === modes.length - 1;

                let borderRadius = "0px"; // default for middle items
                if (isFirst) borderRadius = "24px 0px 0px 24px";
                else if (isLast) borderRadius = "0px 24px 24px 0px";

                return (
                  <div
                    key={id}
                    onClick={() => setSelectedMode(id)}
                    style={{
                      cursor: "pointer",
                      borderRadius,
                      background: isSelected ? "#cdd4f0" : "transparent",
                      padding: "6px 16px",
                      transition: "0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "#cdd4f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <IconComponent />
                  </div>
                );
              })}
            </div>

            <PgButton onClick={() => setAddModalVisible(true)}>
              Add Tenant
            </PgButton>
          </div>

          <TenantFormModal
            visible={isAddModalVisible}
            onClose={() => setAddModalVisible(false)}
            onSubmit={handleAddTenant}
            termsAccepted={termsAccepted}
            onShowTerms={() => setTermsModalVisible(true)}
          />

          <TermsAgreementModal
            visible={isTermsModalVisible}
            onAccept={handleAcceptTerms}
            onCancel={() => {
              setTermsModalVisible(false);
              setPendingTenantData(null);
            }}
          />
        </Row>
        {selectedMode === "card" && (
          <Row gutter={[16, 16]}>
            {tenants.map((tenant) => (
              <Col key={tenant.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <TenantCard tenant={tenant} />
              </Col>
            ))}
          </Row>
        )}

        {selectedMode === "table" && (
          <PgTable
            columns={columnDefs}
            dataSource={tenants}
            pagination={{ pageSize: 10 }}
            scroll={{ y: "calc(100vh - 300px)" }}
          />
        )}
      </div>
    </div>
  );
};

export default Tenants;
