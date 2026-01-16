import CustomInput from "components/CustomInput";
import { GeneralFormProps } from "interfaces/interfaces";
import { h, Ref } from "preact";
import { JSX } from "preact/jsx-runtime";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
      <h1>
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
