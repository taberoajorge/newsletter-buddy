import { SubmitButtonProps } from "interfaces/interfaces";
import { h } from "preact";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 9rem;
  height: 4rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--border-color);
  color: white;
  background-color: var(--border-color);
  font-size: 1.6rem;

  @media (min-width: 768px) {
    grid-area: "button";
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
