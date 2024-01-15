import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { Outlet } from "react-router-dom";

import { KeyIcon, LogOutIcon } from "@/assets/top-menu";
import { routerList } from "@/routes";

import arrow from "../../assets/public/arrow.png";
import avatar from "../../assets/public/avatar.png";
import language from "../../assets/public/language.png";
import { useAction } from "./hook";
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
  zIndex: 10,
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
  const { isHover, navigate, setIsHover } = useAction();

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex items-center hover:text-[#2853e3]"
          onMouseEnter={() => setIsHover({ ...isHover, updatePassword: true })}
          onMouseLeave={() => setIsHover({ ...isHover, updatePassword: false })}
        >
          <KeyIcon isHover={isHover.updatePassword} />
          <div className="ml-[.5rem]">修改密碼</div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className="flex items-center hover:text-[#2853e3]"
          onMouseEnter={() => setIsHover({ ...isHover, logOut: true })}
          onMouseLeave={() => setIsHover({ ...isHover, logOut: false })}
          onClick={() => {
            navigate("login");
          }}
        >
          <LogOutIcon isHover={isHover.logOut} />
          <div className="ml-[.5rem]">退出登錄</div>
        </div>
      ),
      key: "1",
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
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottom"
            rootClassName="dropDownMenu"
          >
            <div className="flex items-center">
              <div className="flex justify-center items-center mr-[2rem]">
                <img src={avatar} className="mr-[.375rem]" />
                Janny.K
              </div>
              <a onClick={(e) => e.preventDefault()}>
                <img src={arrow} />
              </a>
            </div>
          </Dropdown>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
