import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, MenuProps, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { SubMenuType } from "antd/es/menu/hooks/useItems";
import { Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/home-menu-keys";
import { IRouterList } from "@/services/dtos/routes";

import avatar from "../../assets/public/avatar.png";
import downArrow from "../../assets/public/down-arrow.png";
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

export const Home = () => {
  const { menuInformation, navigate, setMenuInformation } = useAction();

  const { language, changeLanguage, t, routerList } = useAuth();

  const myPermissions = [
    "CanViewCameraAiUserAccountPage",
    "CanViewCameraAiRoleUserPage",
    "CanViewCameraAiMonitorManagementPage",
    "CanAddCameraAiMonitor",
    "CanViewCameraAiAreaManagementPage",
    "CanGrantCameraAiRole",
  ];

  const hasPermission = (permission: string | undefined) => {
    return permission && myPermissions.includes(permission);
  };

  const permissionRouterList = (list: IRouterList[]) => {
    return list
      .map((item) => {
        const result: IRouterList = {
          path: "",
          element: <></>,
        };

        const isHave = item.children?.some((childItem) =>
          childItem.permissions ? hasPermission(childItem.permissions) : true
        );

        if (hasPermission(item.permissions) || isHave) {
          result.path = item.path;
          result.element = item.element;
          result.name = item.name;
          result.icon = item.icon;
          result.children =
            item.path !== "/monitor"
              ? item.children &&
                item.children
                  .map((childItem) =>
                    hasPermission(childItem.permissions) ||
                    childItem.path === "/system/log"
                      ? childItem
                      : {
                          path: "",
                          element: <></>,
                        }
                  )
                  .filter((childItem) => childItem)
              : [];

          return result;
        }

        return null;
      })
      .filter((item) => item !== null);
  };

  const getMenu = () => {
    if (!routerList) return;

    const items = permissionRouterList(routerList).reduce(
      (accumulator, item) => {
        if (item && item.path !== "") {
          const menuItem: MenuItem | SubMenuType = {
            label: item.name,
            key: item.path,
            icon: item.icon,
          };

          if (!!item.children && !item.path.includes("/monitor")) {
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
      },
      [] as MenuItem[]
    );

    return items;
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center hover:text-[#2853e3]">
          <span className="iconfont icon-a-Key2" />
          <div className="ml-[.5rem]">
            {t(KEYS.CHANGE_PASSWORD, { ns: "homeMenu" })}
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className="flex items-center hover:text-[#2853e3]"
          onClick={() => navigate("login")}
        >
          <span className="iconfont icon-sign_out" />
          <div className="ml-[.5rem]">
            {t(KEYS.SIGN_OUT, { ns: "homeMenu" })}
          </div>
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
          mode="inline"
          items={getMenu()}
          style={{ border: "none" }}
          openKeys={menuInformation.openKeys}
          selectedKeys={menuInformation.selectedKeys}
          onOpenChange={(keyPath) => {
            setMenuInformation({ ...menuInformation, openKeys: keyPath });
          }}
          onClick={({ key, keyPath }) => {
            setMenuInformation({
              ...menuInformation,
              selectedKeys: [keyPath[0]],
            });

            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Select
            className="mr-4"
            value={language}
            style={{ width: 120 }}
            defaultValue="ch"
            bordered={false}
            onChange={(value) => changeLanguage(value)}
            suffixIcon={false}
            popupClassName="navigation-select-dropdown teamNameSelect"
            options={[
              {
                value: "ch",
                label: (
                  <div>
                    <GlobalOutlined className="mr-2" />
                    中文繁體
                  </div>
                ),
              },
              {
                value: "en",
                label: (
                  <div>
                    <GlobalOutlined className="mr-2" />
                    English
                  </div>
                ),
              },
            ]}
          />
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
                <img src={downArrow} className="flex items-center" />
              </a>
            </div>
          </Dropdown>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
