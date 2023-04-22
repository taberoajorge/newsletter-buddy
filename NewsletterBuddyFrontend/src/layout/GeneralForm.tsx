import CustomInput from "components/CustomInput";
import { h, Ref } from "preact";
import { JSX } from "preact/jsx-runtime";
import styled from "styled-components";

interface GeneralFormProps {
  title: string;
  fields: {
    id: string;
    label: string;
    type: string;
    value: string | File | null | undefined;
    accept?: string;
    inputRef?: Ref<HTMLInputElement>;
  }[];
  handleChange: (e: Event, field: string) => void;
  handleFileChange?: (e: Event) => void;
  loading?: boolean;
}

const StyledForm = styled.form`
  background-color: var(--secondary-color);
  border: none;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;

  label {
    display: table-footer-group;
  }

  @media (min-width: 768px) {
    grid-area: "form";
  }
`;

const GeneralForm = ({
  title,
  fields,
  handleChange,
  handleFileChange = () => {},
  loading = false,
}: GeneralFormProps): JSX.Element => {
  return (
    <StyledForm>
      <h1 style={{ fontSize: "2rem", textAlign: "center", margin: "1rem" }}>
        {title}
      </h1>
      {fields.map(({ id, label, type, value, accept, inputRef }) => (
        <CustomInput
          id={id}
          label={label}
          type={type}
          value={type === "file" ? undefined : (value as string)}
          accept={accept}
          onChange={
            type === "file" ? handleFileChange : (e) => handleChange(e, id)
          }
          inputRef={inputRef}
          disabled={loading}
        />
      ))}
    </StyledForm>
  );
};

export default GeneralForm;
