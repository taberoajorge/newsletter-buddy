import { h } from "preact";
import { AddSubscriberFormProps } from "interfaces/interfaces";
import GeneralForm from "../layout/GeneralForm";

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
      id: "email",
      label: "Add an email or multiple addresses (separated by commas)",
      type: "email",
      value: formState.state.email,
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
