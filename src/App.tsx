import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Switch,
  Typography,
} from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const itemsActionProfile: MenuProps["items"] = [
  {
    label: (
      <a rel="noopener noreferrer" href="/profile">
        Profile
      </a>
    ),
    key: "0",
    icon: <ProfileOutlined />,
  },
  {
    label: (
      <a rel="noopener noreferrer" href="/setting">
        Settings
      </a>
    ),
    key: "1",
    icon: <SettingOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: (
      <a
        style={{
          color: "red",
        }}
        rel="noopener noreferrer"
        href="/logout"
      >
        Logout
      </a>
    ),
    key: "3",
    icon: (
      <LogoutOutlined
        style={{
          color: "red",
        }}
      />
    ),
  },
];

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  console.log(router, "router");

  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          // token: { colorPrimary: "#00b96b" }
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <StyleProvider hashPriority="high" layer>
          <Layout hasSider>
            <Sider
              // className="min-h-[100vh]"
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                // background: colorBgContainer,
              }}
              breakpoint="lg"
              collapsedWidth="0"
              // onBreakpoint={(broken) => {
              //   console.log(broken);
              // }}
              onCollapse={(collapsed, type) => {
                setCollapsed(collapsed);
              }}
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
            >
              <a href="/dashboard" className="text-white relative">
                <Flex
                  gap="middle"
                  align="center"
                  justify="center"
                  style={{
                    marginTop: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-8 h-8 relative"
                    width={32}
                    height={32}
                  />
                  <Typography className="text-white">Logo</Typography>
                </Flex>
              </a>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={items}
              />
            </Sider>
            <Layout
              style={{
                marginLeft: collapsed ? 0 : 200,
                transition: "margin-left 0.3s",
              }}
            >
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <Typography.Title
                    level={4}
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    Judul Halaman
                  </Typography.Title>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 12,
                    gap: 12,
                  }}
                >
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() => {
                      setDarkMode(!darkMode);
                    }}
                  >
                    {darkMode ? <MoonOutlined /> : <SunOutlined />}
                  </Button>
                  {/* <Switch
                    checkedChildren={<SunOutlined />}
                    unCheckedChildren={<MoonOutlined />}
                  /> */}
                  <Dropdown menu={{ items: itemsActionProfile }}>
                    <a
                      style={{
                        color: "black",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        <Avatar size={"small"} />
                        Dian Candra.
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </Header>
              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  style={{
                    padding: 24,
                    // minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    minHeight: "83vh",
                  }}
                >
                  <div>
                    <h1>Welcome to Farms!</h1>
                    <RouterProvider
                      router={router}
                      fallbackElement={<p>Initial Load...</p>}
                    />
                  </div>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }} className="text-red-500">
                Ant Design ©{new Date().getFullYear()} Created by Kanrisha D
              </Footer>
            </Layout>
          </Layout>
        </StyleProvider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
