import { Collapse, CollapseProps, ConfigProvider, theme } from "antd";

import cameraTag from "../../../../assets/camera-tag.png";
import down from "../../../../assets/down.png";
import icon from "../../../../assets/icon.svg";

export const AddSelectType = () => {
  const { token } = theme.useToken();

  const text = [
    "識別人員",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
    "識別車輛",
  ];

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      children: (
        <>
          {text.map((item, index) => (
            <div
              className="hover:bg-[#F6F8FC] py-[1.5rem] px-[1rem] rounded-lg"
              key={index}
            >
              {item}
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
          Collapse: {
            contentBg: "red",
          },
        },
      }}
    >
      <div className="h-full w-full p-[1.5rem]">
        <div className="bg-white h-[calc(100vh-5rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] text-[#5F6279]">監測管理 </span>
          <span className="text-[1.125rem] font-semibold tracking-tight">
            / 新增
          </span>
          <div className="mx-[16.375rem] my-[1rem] h-[calc(100%-8.125rem)]">
            <div className="flex items-center">
              <img src={icon} />
              <span className="text-[1.125rem] font-semibold py-[1rem]">
                選擇類型
              </span>
            </div>
            <div className="border border-[#E7E8EE] border-solid rounded-lg p-[2rem_1.5rem] h-full overflow-y-auto custom-scollbar">
              <Collapse
                bordered={false}
                expandIcon={() => (
                  <div className="flex items-center">
                    <img src={down} /> <img src={cameraTag} className="pl-4" />
                  </div>
                )}
                style={{ background: token.colorBgContainer }}
                items={getItems()}
              />
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
