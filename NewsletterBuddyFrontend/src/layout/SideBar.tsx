import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;

  @media (min-width: 768px) {
    grid-area: side;
    width: 100%;
    flex-direction: column;
    height: inherit;
  }
`;

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const SideBar = ({ children }: any) => {
  return <StyledNav>{children}</StyledNav>;
};

export default SideBar;
