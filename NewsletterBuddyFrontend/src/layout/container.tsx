import { h } from "preact";

const style = {
  display: "flex",
  position: "absolute",
  left: "250px",
  top: "105px",
  background: "#FFFFFF",
  boxShadow: "0px 25px 40px -20px rgba(0, 0, 0, 0.0951141)",
  borderRadius: "15px",
  padding: "1rem",
  gap: "5rem",
  maxWidth: "800px",
  minWidth: "800px",
};

export default function Container({ children }: { children: any }) {
  return <div style={style}>{children}</div>;
}
