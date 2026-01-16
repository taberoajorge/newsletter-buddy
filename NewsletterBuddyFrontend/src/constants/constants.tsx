import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const ACTIONS = {
  SEND_NEWSLETTER: "sendNewsletter",
  ANALYTICS: "analytics",
  ADD_SUBSCRIBER: "addSubscriber",
};

export const FILE_TYPES = ["application/pdf", "image/png"];

export const menuItems = [
  {
    label: "Send newsletter",
    key: "1",
    icon: <PieChartOutlined />,
    action: ACTIONS.SEND_NEWSLETTER,
  },
  {
    label: "Analytics",
    key: "2",
    icon: <DesktopOutlined />,
    action: ACTIONS.ANALYTICS,
  },
  {
    label: "Add new user",
    key: "3",
    icon: <UserOutlined />,
    action: ACTIONS.ADD_SUBSCRIBER,
  },
];