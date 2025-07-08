import { Col, Input, Row, Tooltip } from "antd";
import TenantCard from "../../components/resusableComponents/TenantCard";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Tenants.scss";
import PgButton from "../../components/resusableComponents/PgButton";
import TenantFormModal from "../../components/resusableComponents/TenantFormModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TermsAgreementModal from "../../components/resusableComponents/TermsAgreementModal";
import {
  FilterSearchIcon,
  ItemDeleteIcon,
  ItemEditIcon,
  RouteCommercialIcon,
  RouteWarehouseIcon,
  TagsCloseIcon,
} from "../../components/resusableComponents/DrayageIcons";
import PGTable from "../../components/PGTable/PGTable";
import { addTenant, updateTenant, deleteTenant, setTenants } from "../../store/slices/tenantsSlice";

// Mock data generator function - Updated for new table structure
const generateTenants = () => {
  const tenants = [];

  const names = [
    "Rajesh Kumar", "Priya Sharma", "Amit Singh", "Sneha Patel", "Vikram Reddy",
    "Anita Gupta", "Rohit Mehta", "Kavya Nair", "Arjun Yadav", "Pooja Joshi",
    "Manoj Tiwari", "Deepika Rao", "Suresh Iyer", "Meera Agarwal", "Kiran Joshi",
    "Ravi Pillai", "Sonia Verma", "Ajay Malhotra", "Neha Saxena", "Vishal Chopra"
  ];

  const professions = [
    "Software Engineer", "Doctor", "Teacher", "Marketing Executive", "Graphic Designer",
    "Accountant", "Nurse", "Data Analyst", "Sales Manager", "Architect",
    "Chef", "Electrician", "Student", "Research Scientist", "Bank Manager",
    "Journalist", "Interior Designer", "Pharmacist", "HR Manager", "Civil Engineer"
  ];

  const statuses = ['Active', 'Inactive', 'Pending'];
  const paymentStatuses = ['Paid', 'Pending', 'Overdue'];

  for (let i = 1; i <= 20; i++) {
    const name = names[i % names.length];
    tenants.push({
      id: i,
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
      room: `A${Math.floor(Math.random() * 20) + 101}`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      rent: Math.floor(Math.random() * 5000) + 8000,
      joinDate: new Date(2024 - Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      deposit: Math.floor(Math.random() * 10000) + 15000,
      emergencyContact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      age: 20 + Math.floor(Math.random() * 30),
      profession: professions[Math.floor(Math.random() * professions.length)],
      address: `Address Line ${i}, City ${i}`,
      pincode: Math.floor(100000 + Math.random() * 900000),
      dob: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      // Legacy fields for compatibility
      isActive: statuses[Math.floor(Math.random() * statuses.length)] === 'Active',
      mobile: `${Math.floor(9000000000 + Math.random() * 1000000000)}`,
      doj: new Date(2024 - Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`
    });
  }
  return tenants;
};

const Tenants = () => {
  const dispatch = useDispatch();
  const { tenants } = useSelector(state => state.tenants);
  const { floors } = useSelector(state => state.floors);
  const { rooms } = useSelector(state => state.rooms);
  const { beds } = useSelector(state => state.beds);

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTenant, setEditingTenant] = useState(null);

  const [isTermsModalVisible, setTermsModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingTenantData, setPendingTenantData] = useState(null);

  // Initialize with mock data if tenants array is empty
  useEffect(() => {
    if (tenants.length === 0) {
      dispatch(setTenants(generateTenants()));
    }
  }, [dispatch, tenants.length]);

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


  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setAddModalVisible(true);
  };

  const handleDelete = (tenantId) => {
    dispatch(deleteTenant(tenantId));
  };

  const handleUpdateTenant = (formData) => {
    dispatch(updateTenant({ id: editingTenant.id, ...formData }));
    setEditingTenant(null);
    setAddModalVisible(false);
  };

  // Handle actions from the new table
  const handleTableActions = (action, tenant) => {
    switch (action) {
      case 'edit':
        handleEdit(tenant);
        break;
      case 'delete':
        handleDelete(tenant.id);
        break;
      case 'view':
        // Add view logic if needed
        console.log('View tenant:', tenant);
        break;
      default:
        break;
    }
  };

  // Remove old filtering logic as new table handles this internally

  const handleAddTenant = (formData) => {
    if (termsAccepted) {
      dispatch(addTenant(formData));
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
      dispatch(addTenant(pendingTenantData));
      setAddModalVisible(false);
      setPendingTenantData(null);
    }
  };

  const handleTermsChange = (accepted) => {
    setTermsAccepted(accepted);
  };

  return (
    <div className="TenantStyles">
      <div className="tabheader">Tenants</div>
      <div className="tenants-content">
        <div className="stats-section">
          <Row gutter={[16, 16]}>
            {statsData.map((stat, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                <StatsCard statName={stat.name} count={stat.value} />
              </Col>
            ))}
          </Row>
        </div>

        <div className="filter-controls">
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
          </Row>
        </div>

        <TenantFormModal
          visible={isAddModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            setEditingTenant(null);
          }}
          onSubmit={editingTenant ? handleUpdateTenant : handleAddTenant}
          termsAccepted={termsAccepted}
          onShowTerms={() => setTermsModalVisible(true)}
          onTermsChange={handleTermsChange}
          tenantData={editingTenant}
          isEditing={!!editingTenant}
          floors={floors}
          rooms={rooms}
          beds={beds}
        />

        <TermsAgreementModal
          visible={isTermsModalVisible}
          onAccept={handleAcceptTerms}
          onCancel={() => {
            setTermsModalVisible(false);
            setTermsAccepted(false); // Uncheck the checkbox when terms are cancelled
            setPendingTenantData(null);
          }}
        />
        <div className="table-section">
          {selectedMode === "card" && (
            <Row gutter={[16, 16]}>
              {tenants
                .filter((tenant) =>
                  tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tenant.mobile.includes(searchTerm) ||
                  tenant.profession.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((tenant) => (
                  <Col key={tenant.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <TenantCard tenant={tenant} />
                  </Col>
                ))}
            </Row>
          )}

          {selectedMode === "table" && (
            <PGTable
              data={tenants}
              type="tenants"
              showSearch={false} // We're using the external search
              showColumnToggle={true}
              showExport={true}
              enableRowSelection={true}
              enableSorting={true}
              enableFiltering={true}
              enableResizing={true}
              enableColumnOrdering={false} // Disable reordering to maintain sticky columns
              pageSize={10}
              onRowAction={handleTableActions}
              globalFilter={searchTerm} // Pass the search term for external filtering
              height="100%" // Use full container height
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tenants;
