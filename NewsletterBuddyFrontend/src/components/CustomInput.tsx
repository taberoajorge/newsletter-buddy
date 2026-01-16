import { h } from "preact";
import styled from "styled-components";

export const StyledLabel = styled.label`
  color: var(--text-color);
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  color: var(--text-color);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  margin: 1rem auto;
  padding: 1rem 1.2rem;
  width: 100%;
  box-shadow: 2px 2px #f5f5f5;
  border: 1px solid hsl(0,0%,86%);

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--border-color);
  }

`;

const StyledTextArea = styled.textarea`
  color: var(--text-color);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;
  box-shadow: 2px 2px #f5f5f5;
  border: 1px solid hsl(0,0%,86%);

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--border-color);
  }

`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomInput = ({
  id,
  label,
  type,
  value,
  accept,
  onChange,
  inputRef,
}:
any) => {
  return (
    <StyledInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      {type === "textarea" ? (
        <StyledTextArea id={id} value={value} onChange={onChange} />
      ) : (
        <StyledInput
          id={id}
          type={type}
          value={value}
          accept={accept}
          onChange={onChange}
          ref={inputRef}
        />
      )}
    </StyledInputContainer>
  );
};

export default CustomInput;
