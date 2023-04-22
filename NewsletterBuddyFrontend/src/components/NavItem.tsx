import { NavItemProps } from "interfaces/interfaces";
import styled from "styled-components";

const StyledNavItem = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const NavItem = ({ imgSrc, alt, label, onClick }: NavItemProps) => {
  return (
    <StyledNavItem onClick={onClick}>
      <img src={imgSrc} alt={alt} />
      <label>{label}</label>
    </StyledNavItem>
  );
};

export default NavItem;
