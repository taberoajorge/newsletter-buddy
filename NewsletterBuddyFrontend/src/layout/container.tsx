import { h } from "preact";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: var(--secondary-color);
  border: none;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  height: -webkit-fill-available;
  display: grid;
  place-items: center;

  @media (min-width: 768px) {
    grid-template-areas:
      "side header"
      "side form"
      "side button";
    grid-template-columns: 100px 1fr;
    grid-gap: 10px;
    width: 85rem;
    max-width: 90rem;
    max-height: 66rem;
    margin: auto;
  }
`;

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function Container({ children }: { children: any }) {
  return <StyledContainer>{children}</StyledContainer>;
}
