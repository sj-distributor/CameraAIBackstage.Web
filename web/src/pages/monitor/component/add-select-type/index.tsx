import { Collapse, CollapseProps, ConfigProvider } from "antd";

import cameraTag from "../../../../assets/monitor/camera-tag.png";
import collapseDown from "../../../../assets/monitor/collapse-down.png";
import menuIcon from "../../../../assets/monitor/menu-icon.svg";
import { IMonitorConfigurationType } from "../../props";
import { useAction } from "./hook";

export const AddSelectType = () => {
  const { text, token, navigate } = useAction();

  const collapseItem: () => CollapseProps["items"] = () => [
    {
      key: "1",
      children: (
        <>
          {text.map((item, index) => (
            <div
              className="hover:bg-[#F6F8FC] py-[1.5rem] px-[1rem] rounded-lg text-[.875rem]"
              key={index}
              onClick={() =>
                navigate("/monitor/configuration/" + "add" + "/" + item.id, {
                  state: { type: IMonitorConfigurationType.Add, id: item.id },
                })
              }
            >
              {item.name}
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#2853E3",
          },
          Button: {
            colorLink: "#2853E3",
            colorLinkActive: "#5168e3",
            colorLinkHover: "#5168e3",
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#5168e3",
            defaultBorderColor: "#2853E3",
            defaultColor: "#2853E3",
            linkHoverBg: "#F0F4FF",
          },
        },
      }}
    >
      <div>
        <div className="bg-white h-[calc(100vh-5rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] text-[#5F6279]">監測管理 </span>
          <span className="text-[1.125rem] font-semibold tracking-tight">
            / 新增
          </span>
          <div className="my-[1rem] h-[calc(100%-8.125rem)] flex justify-center">
            <div className=" w-[71.25rem]">
              <div className="flex items-center">
                <img src={menuIcon} />
                <span className="text-[1rem] font-semibold py-[1rem] pl-[.625rem]">
                  選擇類型
                </span>
              </div>
              <div className="border border-[#E7E8EE] border-solid rounded-lg p-[2rem_1.5rem] h-full overflow-y-auto customScollbar shadow-md">
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={() => (
                    <div className="flex items-center font-semibold">
                      <img src={collapseDown} />
                      <img src={cameraTag} className="pl-4" />
                    </div>
                  )}
                  style={{ background: token.colorBgContainer }}
                  items={collapseItem()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
