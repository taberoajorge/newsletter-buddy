import SendNewsletter from "../assets/icon-advanced.svg";
import AddNewUser from "../assets/icon-pro.svg";
import Dashboard from "../assets/icon-arcade.svg";
import NavItem from "../components/NavItem";

const style = {
  display: "flex",
  flexDirection: "column",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "274px",
  height: "568px",
  left: "266px",
  top: "121px",
  borderRadius: "15px",
};

const SideBar = ({ setContent }: any) => {
  return (
    <nav style={style}>
      <NavItem
        imgSrc={SendNewsletter}
        alt="Newsletter Buddy"
        label="Send Newsletter"
        onClick={() => setContent("sendNewsletter")}
      />
      <NavItem
        imgSrc={Dashboard}
        alt="Newsletter Buddy"
        label="Analytics"
        onClick={() => setContent("analytics")}
      />
      <NavItem
        imgSrc={AddNewUser}
        alt="Newsletter Buddy"
        label="Add New User"
        onClick={() => setContent("addSubscriber")}
      />
    </nav>
  );
};

export default SideBar;
