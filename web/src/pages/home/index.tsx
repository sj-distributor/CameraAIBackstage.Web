import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";

import { routerList } from "@/routes";

import arrow from "../../assets/public/arrow.png";
import avatar from "../../assets/public/avatar.png";
import language from "../../assets/public/language.png";
import { Main } from "../main";
const headerStyle: React.CSSProperties = {
  height: "4rem",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "flex-end",
  paddingLeft: "1.5rem",
  alignItems: "center",
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "white",
  justifyContent: "center",
};

const layoutStyle = {
  overflow: "hidden",
  height: "100vh",
};

const siderHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "white",
  color: "#2853E3",
  fontSize: "1rem",
  padding: 0,
  fontWeight: 600,
  borderRight: ".0625rem solid #F6F8FC",
  borderBottom: ".0625rem solid #F6F8FC",
  boxSizing: "border-box",
  marginBottom: "1.25rem",
};

type MenuItem = Required<MenuProps>["items"][number];

const getMenu = () => {
  if (!routerList) return;

  const items = routerList.reduce((accumulator, item) => {
    if (item.path !== "") {
      const menuItem: MenuItem | SubMenuType = {
        label: item.name,
        key: item.path,
        icon: item.icon,
      };

      if (item.children) {
        (menuItem as SubMenuType).children = item.children
          .filter((child) => child.path !== "")
          .map((child) => ({
            label: child.name,
            key: child.path,
          }));
      }

      accumulator.push(menuItem);
    }

    return accumulator;
  }, [] as MenuItem[]);

  return items;
};

export const Home = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          onClick={() => {
            navigate("login");
          }}
        >
          登出
        </a>
      ),
      key: "0",
    },
  ];

  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Header style={siderHeaderStyle}>Camera AI後台管理系統</Header>
        <Menu
          className="menuStyle"
          onClick={({ _, key }) => {
            navigate(key);
          }}
          mode="inline"
          items={getMenu()}
          style={{ border: "none" }}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <div className="flex justify-center items-center mr-[2rem]">
            <img src={language} className="mr-[.375rem]" />
            中文
          </div>
          <div className="flex justify-center items-center mr-[2rem]">
            <img src={avatar} className="mr-[.375rem]" />
            Janny.K
          </div>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
            <a
              onClick={(e) => e.preventDefault()}
              className="block h-[100%] pt-[1.8125rem]"
            >
              <img src={arrow} />
            </a>
          </Dropdown>
        </Header>
        <Main />
      </Layout>
    </Layout>
  );
};
