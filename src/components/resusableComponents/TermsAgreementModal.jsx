import { Modal } from "antd";
import { useSelector } from "react-redux";
import PgButton from "./PgButton";
import "./TenantForm.scss";

const TermsAgreementModal = ({ visible, onAccept, onCancel }) => {
  const { settings } = useSelector((state) => state.settings);
  const termsRules = settings.termsAndConditions || [];

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
          <PgButton 
            key="accept" 
            type="primary" 
            size="small" 
            onClick={onAccept}
            disabled={termsRules.length === 0}
          >
            I Agree
          </PgButton>
        </div>
      }
      closable={false}
    >
      <div className="premium-tenant-form" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div style={{ textAlign: "justify", lineHeight: "1.6" }}>
          <p style={{ marginBottom: "16px", color: "#666" }} className="terms-lable">
            By proceeding with the registration, you acknowledge that you have read, understood, and agree to comply with the following terms and conditions:
          </p>
          {termsRules.length > 0 ? (
            termsRules.map((term, index) => (
              <div key={index} style={{ 
                marginBottom: "12px",
                paddingLeft: "16px",
                color: "#333"
              }} className="terms-lable">
                <strong>{index + 1}.</strong> {term}
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: "center", 
              color: "#999", 
              fontStyle: "italic",
              padding: "20px"
            }} className="terms-lable">
              No terms and conditions have been configured yet. Please contact the administrator.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TermsAgreementModal;
