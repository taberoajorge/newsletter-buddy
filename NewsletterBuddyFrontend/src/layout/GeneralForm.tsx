import CustomInput from "components/CustomInput";
import { GeneralFormProps } from "interfaces/interfaces";
import { h, Ref } from "preact";
import { JSX } from "preact/jsx-runtime";
import styled from "styled-components";

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
            type === "file"
              ? handleFileChange
              : (e: Event) => handleChange(e, id)
          }
          inputRef={inputRef}
          disabled={loading}
        />
      ))}
    </StyledForm>
  );
};

export default GeneralForm;
