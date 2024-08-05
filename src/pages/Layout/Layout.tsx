import React from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
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
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Button,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { Helmet } from "react-helmet-async";

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
type Props = {};

const LayoutPage = (props: Props) => {
  let navigation = useNavigation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  // buatkan fungsi hook untuk mengambil path name
  // dari useLocation
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <Helmet></Helmet>
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
          <a href="/dashboard">
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
              <Typography>Logo</Typography>
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
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
                <div style={{ position: "fixed", top: 0, right: 0 }}>
                  {navigation.state !== "idle" && (
                    <p>Navigation in progress...</p>
                  )}
                </div>
                <Outlet />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Kanrisha D
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutPage;
