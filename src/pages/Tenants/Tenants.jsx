import { Col, Input, Row } from "antd";
import TenantCard from "../../components/resusableComponents/TenantCard";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Tenants.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import TenantFormModal from "../../components/resusableComponents/TenantFormModal";
import { useState } from "react";

// Mock data for 50 tenants
const generateTenants = () => {
  const tenants = [];

  const imageOptions = [
    "https://xsgames.co/randomusers/avatar.php?g=male",
    "https://xsgames.co/randomusers/avatar.php?g=female",
    "https://xsgames.co/randomusers/avatar.php?g=pixel",
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    // Add more if needed
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

  for (let i = 1; i <= 50; i++) {
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
  const tenants = generateTenants();

  // Calculate statistics
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.isActive).length;
  const inactiveTenants = totalTenants - activeTenants;

  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const professionsCount = tenants.reduce((acc, tenant) => {
    acc[tenant.profession] = (acc[tenant.profession] || 0) + 1;
    return acc;
  }, {});

  const topProfessions = Object.entries(professionsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const averageAge = Math.round(
    tenants.reduce((sum, tenant) => sum + tenant.age, 0) / tenants.length
  );
  const recentJoinees = tenants.filter((t) => {
    const doj = new Date(t.doj);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return doj > threeMonthsAgo;
  }).length;

  const statsData = [
    { name: "All Tenants", value: totalTenants },
    { name: "Active Tenants", value: activeTenants },
    { name: "Inactive Tenants", value: inactiveTenants },
    { name: "Avg. Tenant Age", value: averageAge },
    { name: "Recent Joinees (3m)", value: recentJoinees },
    { name: "Blocked", value: inactiveTenants },
    // {
    //   name: `Top Profession: ${topProfessions[0][0]}`,
    //   value: topProfessions[0][1],
    // },
    // {
    //   name: `2nd Profession: ${topProfessions[1][0]}`,
    //   value: topProfessions[1][1],
    // },
    // {
    //   name: `3rd Profession: ${topProfessions[2][0]}`,
    //   value: topProfessions[2][1],
    // },
  ];

  return (
    <div className="TenantStyles">
      <div className="tabheader">Tenants</div>
      <div style={{ padding: "16px" }}>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {statsData.map((stat, index) => (
            <Col key={index}>
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
            {" "}
            <Input />
          </div>

          <PgButton onClick={() => setAddModalVisible(true)}>
            Add Tenant
          </PgButton>
          <TenantFormModal
            visible={isAddModalVisible}
            onClose={() => setAddModalVisible(false)}
            onSubmit={(formData) => {
              console.log("New Tenant:", formData);
              setAddModalVisible(false);
            }}
          />
        </Row>

        <Row gutter={[16]}>
          {tenants.map((tenant) => (
            <Col span={8} key={tenant.id}>
              <TenantCard tenant={tenant} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Tenants;
