import GeneralForm from "../layout/GeneralForm";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { FILE_TYPES } from "../constants/constants";
import { StyledLabel } from "./CustomInput";

const beforeUpload = (file, formState) => {
  const isValidType = FILE_TYPES.includes(file.type);
  if (!isValidType) {
    toast.error("Invalid file type");
    return Upload.LIST_IGNORE;
  }
  formState.dispatch({ type: "updateField", field: "file", value: file });
  return false;
};

const SendNewsletterForm = ({ formState }) => {
  const { dispatch, handleChange, loading, state } = formState;
  const draggerProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => beforeUpload(file, formState),
    onRemove: () => dispatch({ type: "updateField", field: "file", value: null }),
  };

  const fields = [
    {
      id: "subject",
      label: "Subject:",
      type: "text",
      value: state.subject,
      disabled: loading,
    },
    {
      id: "htmlBody",
      label: "HTML Body:",
      type: "textarea",
      value: state.htmlBody,
      disabled: loading,
    },
    {
      id: "scheduleDate",
      label: "Schedule Date:",
      type: "datetime-local",
      value: state.scheduleDate,
      disabled: loading,
    },
  ];

  return (
    <div>
      <GeneralForm
        title="Send Newsletter"
        fields={fields}
        handleChange={handleChange}
        loading={loading}
      />
      <div>
        <StyledLabel>Upload a PNG or PDF file</StyledLabel>
        <Upload.Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibited from uploading company data or other banned files.
          </p>
        </Upload.Dragger>
      </div>
    </div>
  );
};

export default SendNewsletterForm;
