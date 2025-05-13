import { Modal } from "antd";
import PgButton from "./PgButton";
import "./TenantForm.scss";

const TermsAgreementModal = ({ visible, onAccept, onCancel }) => {
  const termsRules = [
    "Tenant must provide valid government ID proof",
    "Rent must be paid by the 5th of every month",
    "No smoking inside the premises",
    "Visitors allowed only between 8AM-10PM",
    "Security deposit is non-refundable if lease is broken early",
  ];

  return (
    <Modal
     className="premium-tenant-form"
      title={<div className="section-title">Terms and Conditions</div>}
      visible={visible}
      onCancel={onCancel}
      footer={
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <PgButton
            key="cancel"
            type="secondary"
            size="small"
            onClick={onCancel}
          >
            Cancel
          </PgButton>
          ,
          <PgButton key="accept" type="primary" size="small" onClick={onAccept}>
            I Agree
          </PgButton>
        </div>
      }
      closable={false}
    >
      <div className="premium-tenant-form" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {termsRules.map((term) => (
          <div key={term} style={{ marginBottom: "8px" }} className="terms-lable">
            • {term}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TermsAgreementModal;
