import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
  Upload,
  Row,
  Col,
  Tooltip,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./TenantForm.scss";
import { DropdownIcon, ItemDeleteIcon, TagsCloseIcon } from "./DrayageIcons";
import PgButton from "./PgButton";

const { Option } = Select;
const { TextArea } = Input;

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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const stayTypes = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Yearly",
  "Custom",
];
const idTypes = ["Aadhar", "PAN", "Passport", "Driving License", "Voter ID"];

const TenantFormModal = ({ visible, onClose, onSubmit, tenantData }) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const termsRules = [
    "Tenant must provide valid government ID proof",
    "Rent must be paid by the 5th of every month",
    "No smoking inside the premises",
    "Visitors allowed only between 8AM-10PM",
    "Security deposit is non-refundable if lease is broken early",
  ];

  useEffect(() => {
    if (tenantData) {
      form.setFieldsValue(tenantData);
    } else {
      form.resetFields();
    }
  }, [tenantData, form]);

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob?.format("YYYY-MM-DD"),
      doj: values.doj?.format("YYYY-MM-DD"),
    };
    onSubmit(formattedValues);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handlePreview = async (file) => {
    let src = file.url || file.preview;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width: 100%" />`);
  };

  return (
    <Modal
      className="premium-tenant-form"
      open={visible}
      title={
        <div
          className="modal-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {tenantData ? "Edit Tenant Details" : "New Tenant Registration"}
          </div>
          <Tooltip title="Close">
            <TagsCloseIcon width={24} height={24} onClick={onClose} />
          </Tooltip>
        </div>
      }
      onCancel={onClose}
      onOk={() => form.submit()}
      footer={
        <div
          style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}
        >
          <PgButton onClick={onClose} type="secondary" size="small">
            Cancel
          </PgButton>
          <PgButton size="small" onClick={onSubmit}> 
            {tenantData ? "Update Tenant" : "Add Tenant"}
          </PgButton>
        </div>
      }
      width={900}
      closable={false}
    >
      <div className="form-container">
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <div className="personal-Information">
            <div className="section-title">Personal Information</div>

            <Row gutter={[16]}>
              <Col span={18}>
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="form-lable">Full Name</div>
                      <Form.Item
                        name="name"
                        rules={[
                          { required: true, message: "Please enter full name" },
                        ]}
                      >
                        <Input placeholder="Enter full name as per GOVT ID" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <div className="form-lable">Father's Name</div>
                      <Form.Item
                        name="fatherName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter father's name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter father's name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={6}>
                      <div className="form-lable">Age</div>
                      <Form.Item
                        name="age"
                        rules={[
                          { required: true, message: "Please enter age" },
                        ]}
                      >
                        <Input
                          placeholder="Enter age"
                          type="number"
                          min={18}
                          max={99}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <div className="form-lable">Gender</div>
                      <Form.Item
                        name="gender"
                        rules={[
                          { required: true, message: "Please select gender" },
                        ]}
                      >
                        <Select
                          placeholder="Select gender"
                          suffixIcon={<DropdownIcon />}
                        >
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <div className="form-lable">Blood Group</div>
                      <Form.Item
                        name="bloodGroup"
                        rules={[
                          {
                            required: true,
                            message: "Please select blood group",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select blood group"
                          suffixIcon={<DropdownIcon />}
                        >
                          {bloodGroups.map((group) => (
                            <Option key={group} value={group}>
                              {group}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <div className="form-lable">Marital Status</div>
                      <Form.Item
                        name="maritalStatus"
                        rules={[
                          {
                            required: true,
                            message: "Please select marital status",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select status"
                          suffixIcon={<DropdownIcon />}
                        >
                          <Option value="single">Single</Option>
                          <Option value="married">Married</Option>
                          <Option value="divorced">Divorced</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="form-lable">Date of Birth</div>
                      <Form.Item
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Please select date of birth",
                          },
                        ]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <div className="form-lable">Mobile Number</div>
                      <Form.Item
                        name="mobile"
                        rules={[
                          {
                            required: true,
                            message: "Please enter mobile number",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message: "Please enter valid 10 digit number",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Mobile Number"
                          maxLength={10}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="form-lable">Email Address</div>
                  <Form.Item
                    name="email"
                    rules={[
                      { type: "email", message: "Please enter valid email" },
                      { required: true, message: "Please enter email" },
                    ]}
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </div>
              </Col>
              <Col span={6}>
                <div
                  className="profile-upload-section"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div className="form-lable">Profile Photo</div>
                  <Form.Item
                    name="profileImage"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      name="profile"
                      listType="picture-card"
                      maxCount={1}
                      accept="image/*"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={handleChange}
                      onPreview={handlePreview}
                    >
                      {fileList.length >= 1 ? null : (
                        <div className="upload-placeholder">
                          <UploadOutlined style={{ fontSize: "24px" }} />
                          <div>Click to Upload</div>
                          <div className="upload-hint">Max. 2MB</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>

          <div className="address-section">
            <div className="section-title">Address Details</div>
            <Row gutter={16}>
              <Col span={24}>
                <div className="form-lable"> Current Address </div>
                <Form.Item
                  name="address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <TextArea rows={3} placeholder="Enter complete address" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <div className="form-lable"> City</div>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: "Please enter city" }]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className="form-lable"> State </div>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: "Please enter state" }]}
                >
                  <Input placeholder="Enter state" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className="form-lable"> Pincode </div>
                <Form.Item
                  name="pincode"
                  rules={[
                    { required: true, message: "Please enter pincode" },
                    {
                      pattern: /^[0-9]{6}$/,
                      message: "Please enter valid 6 digit pincode",
                    },
                  ]}
                >
                  <Input maxLength={6} placeholder="Enter pincode" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="professional-section">
            <div className="section-title">Professional Details</div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-lable"> Profession/Occupation </div>
                <Form.Item
                  name="profession"
                  rules={[
                    { required: true, message: "Please select profession" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select profession"
                    suffixIcon={<DropdownIcon />}
                  >
                    {professions.map((prof) => (
                      <Option key={prof} value={prof}>
                        {prof}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-lable"> Company/Institution </div>
                <Form.Item name="company">
                  <Input placeholder="Enter company/institution name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <div className="form-lable"> Designation </div>
                <Form.Item name="designation">
                  <Input placeholder="Enter designation" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-lable"> Work Address </div>
                <Form.Item name="workAddress">
                  <Input placeholder="Enter work address" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="stay-details-section">
            <div className="section-title">Stay Details</div>
            <Row gutter={16}>
              <Col span={8}>
                <div className="form-lable"> Stay Type </div>
                <Form.Item
                  name="stayType"
                  rules={[
                    { required: true, message: "Please select stay type" },
                  ]}
                >
                  <Select
                    placeholder="Select stay type"
                    suffixIcon={<DropdownIcon />}
                  >
                    {stayTypes.map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className="form-lable"> Date of Joining </div>
                <Form.Item
                  name="doj"
                  rules={[
                    { required: true, message: "Please select joining date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className="form-lable"> Duration (Months) </div>
                <Form.Item
                  name="duration"
                  rules={[{ required: true, message: "Please enter duration" }]}
                >
                  <Input type="number" min={1} placeholder="Enter duration" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <div className="form-lable"> Room Number </div>
                <Form.Item
                  name="roomNumber"
                  rules={[
                    { required: true, message: "Please enter room number" },
                  ]}
                >
                  <Input placeholder="Enter room number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-lable"> Bed Number </div>
                <Form.Item
                  name="bedNumber"
                  rules={[
                    { required: true, message: "Please enter bed number" },
                  ]}
                >
                  <Input placeholder="Enter bed number" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="emergency-contact-section">
            <div className="section-title">Emergency Contact Details</div>
            <Form.List name="emergencyContacts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} align="middle">
                      <Col span={8}>
                        <div className="form-lable"> Contact Name </div>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            { required: true, message: "Missing contact name" },
                          ]}
                        >
                          <Input placeholder="Contact name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div className="form-lable"> Relation </div>
                        <Form.Item
                          {...restField}
                          name={[name, "relation"]}
                          rules={[
                            { required: true, message: "Missing relation" },
                          ]}
                        >
                          <Input placeholder="Relation" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div className="form-lable"> Phone </div>
                        <Form.Item
                          {...restField}
                          name={[name, "phone"]}
                          rules={[
                            { required: true, message: "Missing phone number" },
                            {
                              pattern: /^[0-9]{10}$/,
                              message: "Invalid phone number",
                            },
                          ]}
                        >
                          <Input placeholder="Phone number" maxLength={10} />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <ItemDeleteIcon
                          onClick={() => remove(name)}
                          style={{ marginTop: "30px" }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <PgButton
                      type="secondary"
                      size="small"
                      onClick={() => add()}
                      block
                    >
                      Add Emergency Contact
                    </PgButton>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div className="document-section">
            <div className="section-title">Document Verification</div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-lable"> ID Type </div>
                <Form.Item
                  name="idType"
                  rules={[{ required: true, message: "Please select ID type" }]}
                >
                  <Select placeholder="Select ID type">
                    {idTypes.map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-lable"> ID Number </div>
                <Form.Item
                  name="idNumber"
                  rules={[
                    { required: true, message: "Please enter ID number" },
                  ]}
                >
                  <Input placeholder="Enter ID number" />
                </Form.Item>
              </Col>
            </Row>
            <div className="form-lable"> Upload ID Proof </div>
            <Form.Item
              name="idDocument"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload ID proof" }]}
            >
              <Upload name="idProof" maxCount={1} beforeUpload={() => false}>
                <PgButton
                  type="secondary"
                  size="small"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </PgButton>
              </Upload>
            </Form.Item>
            <div className="form-lable"> Agreement Signed </div>
            <Form.Item name="agreementSigned" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>

          <div className="additional-section">
            <div className="section-title">Additional Information</div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-lable"> Food Preferences </div>
                <Form.Item name="foodPreference">
                  <Select placeholder="Select food preference">
                    <Option value="veg">Vegetarian</Option>
                    <Option value="nonveg">Non-Vegetarian</Option>
                    <Option value="jain">Jain</Option>
                    <Option value="eggetarian">Eggetarian</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-lable">Special Needs/Requirements </div>
                <Form.Item name="specialNeeds">
                  <TextArea
                    rows={1}
                    placeholder="Any special needs or requirements"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="form-lable"> Additional Notes </div>
            <Form.Item name="notes">
              <TextArea
                rows={3}
                placeholder="Any additional notes about the tenant"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default TenantFormModal;
