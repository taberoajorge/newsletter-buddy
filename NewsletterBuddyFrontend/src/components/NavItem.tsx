interface NavItemProps {
  imgSrc: string;
  alt: string;
  label: string;
  onClick: () => void;
}
const style = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.2rem",
  border: "none",
  background: "none",
  cursor: "pointer",
};

const NavItem = ({ imgSrc, alt, label, onClick }: NavItemProps) => {
  return (
    <button style={style} onClick={onClick}>
      <img src={imgSrc} alt={alt} />
      <label>{label}</label>
    </button>
  );
};

export default NavItem;
