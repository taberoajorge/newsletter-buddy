import { h } from "preact";
import { SubmitButtonProps } from "interfaces/interfaces";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 9rem;
  height: 4rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--border-color);
  font-size: 1.6rem;
  background-color: var(--blue);
  color: #fff;
  border-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--hover);
    color: fff;
  }

  &:disabled {
    background-color: var(--disabled);
    color: #fff;
    border: 0.1rem solid var(--disabled-border);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 5rem;
  }
`;

const SubmitButton = ({ handleSubmit, disabled }: SubmitButtonProps) => {
  return (
    <StyledButton onClick={handleSubmit} disabled={disabled}>
      Submit
    </StyledButton>
  );
};

export default SubmitButton;
