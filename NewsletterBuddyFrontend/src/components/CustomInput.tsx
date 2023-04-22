import { h } from "preact";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: var(--text-color);
  font-size: 1.6rem;
`;

const StyledInput = styled.input`
  color: var(--text-color);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--border-color);
  }

  @media (min-width: 768px) {
    max-width: 50rem !important;
  }
`;

const StyledTextArea = styled.textarea`
  color: var(--text-color);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;
  max-width: 35rem !important;
  max-height: 24rem !important;

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--border-color);
  }

  @media (min-width: 768px) {
    max-width: 50rem !important;
  }
`;

const CustomInput = ({
  id,
  label,
  type,
  value,
  accept,
  onChange,
  inputRef,
  disabled,
}: // rome-ignore lint/suspicious/noExplicitAny: <explanation>
any) => {
  return (
    <>
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
    </>
  );
};

export default CustomInput;
