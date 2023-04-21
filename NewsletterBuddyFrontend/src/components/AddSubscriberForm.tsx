import GeneralForm from "../layout/GeneralForm";
import { h } from "preact";

interface AddSubscriberFormProps {
  formState: {
    state: {
      name: string;
      singleEmail: string;
    };
    handleChange: (e: Event, field: string) => void;
    loading: boolean;
  };
}

const AddSubscriberForm = ({ formState }: AddSubscriberFormProps) => {
  const fields = [
    {
      id: "name",
      label: "Name:",
      type: "text",
      value: formState.state.name,
      disabled: formState.loading,
    },
    {
      id: "singleEmail",
      label: "Add a single email address:",
      type: "email",
      value: formState.state.singleEmail,
      disabled: formState.loading,
    },
  ];

  return (
    <GeneralForm
      title="Add Subscriber"
      fields={fields}
      handleChange={formState.handleChange}
      loading={formState.loading}
    />
  );
};

export default AddSubscriberForm;
