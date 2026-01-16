import { useState } from "preact/hooks";
import { Layout, Menu, Breadcrumb, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import SubmitButton from "../components/SubmitButton";
import ContentHandler from "../layout/contentHandler";
import { useNewsletterBuddy } from "../hooks/use-newsletter";
import { ACTIONS, menuItems } from "../constants/constants";

const { Header, Content, Footer, Sider } = Layout;

const NewsletterBuddy = () => {
  const {
    state,
    dispatch,
    content,
    setContent,
    loading,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleFormSubmit,
    stateValidation,
  } = useNewsletterBuddy();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    const action = menuItems.find((item) => item.key === key)?.action;
    if (action) setContent(action);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo-vertical">
          <p>
          {collapsed ? "NB" : "Newsletter Buddy"}
          </p>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems.map((item) => ({
            ...item,
            onClick: () => handleMenuClick(item.key),
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 64, height: 64 }}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Newsletter Buddy</Breadcrumb.Item>
            <Breadcrumb.Item>{content}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 700,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <ContentHandler
              content={content}
              formState={{
                state,
                handleChange,
                handleFileChange,
                fileInputRef,
                loading,
                dispatch,
              }}
            />
            {content !== ACTIONS.ANALYTICS && (
              <SubmitButton
                handleSubmit={handleFormSubmit}
                disabled={loading || !stateValidation(state) && !ACTIONS.ADD_SUBSCRIBER}
              />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Newsletter Buddy ©{new Date().getFullYear()} Created by Alex Taberoa
        </Footer>
      </Layout>
    </Layout>
  );
};

export default NewsletterBuddy;
