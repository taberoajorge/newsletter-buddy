import GeneralForm from "../layout/GeneralForm";
import { RefObject, h } from "preact";

interface SendNewsletterFormProps {
  formState: {
    state: {
      file: File | null;
      subject: string;
      htmlBody: string;
      scheduleDate: string;
    };
    handleChange: (e: Event, field: string) => void;
    handleFileChange: (e: Event) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    loading: boolean;
  };
}

const SendNewsletterForm = ({ formState }: SendNewsletterFormProps) => {
  const fields = [
    {
      id: "file",
      label: "Upload a PDF/PNG image:",
      type: "file",
      value: formState.state.file?.name,
      accept: ".pdf,.png",
      inputRef: formState.fileInputRef,
      disabled: formState.loading,
    },
    {
      id: "subject",
      label: "Subject:",
      type: "text",
      value: formState.state.subject,
      disabled: formState.loading,
    },
    {
      id: "htmlBody",
      label: "HTML Body:",
      type: "textarea",
      value: formState.state.htmlBody,
      disabled: formState.loading,
    },
    {
      id: "scheduleDate",
      label: "Schedule Date:",
      type: "datetime-local",
      value: formState.state.scheduleDate,
      disabled: formState.loading,
    },
  ];

  return (
    <GeneralForm
      title="Send Newsletter"
      fields={fields}
      handleChange={formState.handleChange}
      handleFileChange={formState.handleFileChange}
      loading={formState.loading}
    />
  );
};

export default SendNewsletterForm;
