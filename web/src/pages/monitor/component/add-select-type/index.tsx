import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, ConfigProvider, Input } from "antd";

import menuIcon from "../../../../assets/monitor/menu-icon.svg";
import { IWarningType, IWarningTypeLabel } from "../../props";
import { useAction } from "./hook";

export const AddSelectType = () => {
  const {
    KEYS,
    t,
    source,
    filteredMonitorTypeOption,
    keyWord,
    collapseOpenKey,
    navigate,
    setKeyWord,
    setCollapseOpenKey,
  } = useAction();

  const collapseItem: CollapseProps["items"] = [
    {
      key: IWarningType.People,
      label: (
        <div className="flex items-center">
          <div className="w-[0.19rem] h-[1rem] bg-[#2853E3] mr-[0.5rem]" />
          <div className="text-[#2853E3] font-semibold">
            {IWarningTypeLabel[IWarningType.People]}
          </div>
        </div>
      ),
      children: <></>,
    },
    {
      key: IWarningType.Vehicles,
      label: (
        <div className="flex items-center">
          <div className="w-[0.19rem] h-[1rem] bg-[#2853E3] mr-[0.5rem]" />
          <div className="text-[#2853E3] font-semibold">
            {IWarningTypeLabel[IWarningType.Vehicles]}
          </div>
        </div>
      ),
      children: <></>,
    },
    {
      key: IWarningType.Element,
      label: (
        <div className="flex items-center">
          <div className="w-[0.19rem] h-[1rem] bg-[#2853E3] mr-[0.5rem]" />
          <div className="text-[#2853E3] font-semibold">
            {IWarningTypeLabel[IWarningType.Element]}
          </div>
        </div>
      ),
      children: <></>,
    },
  ];

  const updateCollapseItem = collapseItem
    .map((item) => {
      const matchedOption = filteredMonitorTypeOption.find(
        (option) => option.type === item.key
      );

      return {
        ...item,
        children: matchedOption?.children.map((item, index) => (
          <div
            key={index}
            className="p-[1rem] rounded-lg text-[.875rem] hover:text-[#2853E3] cursor-pointer"
            onClick={() =>
              navigate(`/monitor/configuration/add/` + item.value.toString())
            }
          >
            {item.label}
          </div>
        )),
      };
    })
    .filter((item) => item.children && item.children.length > 0);

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
          <span
            className="text-[1.125rem] text-[#5F6279] cursor-pointer"
            onClick={() => navigate("/monitor")}
          >
            {t(KEYS.MONITOR, source)}
          </span>
          <span className="text-[1.125rem] font-semibold tracking-tight">
            / {t(KEYS.ADD, source)}
          </span>

          <div className="my-[1rem] h-[calc(100%-8.125rem)] flex justify-center">
            <div className=" w-[71.25rem]">
              <div className="flex items-center">
                <img src={menuIcon} />
                <span className="text-[1rem] font-semibold py-[1rem] pl-[.625rem]">
                  {t(KEYS.CHOOSE_TYPE, source)}
                </span>
              </div>
              <div className="border border-[#E7E8EE] border-solid rounded-lg p-[2rem_1.5rem] h-full overflow-y-auto customScollbar shadow-md">
                <div className="flex items-center mb-[1rem]">
                  <div className="w-[5rem] h-[2.5rem] bg-[#F0F4FF] text-[#2853E3] flex justify-center items-center mr-[0.63rem]">
                    CAMERA
                  </div>
                  <Input
                    placeholder="请输入"
                    className="w-[17.5rem] h-[2.5rem]"
                    suffix={<SearchOutlined />}
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                  />
                </div>

                <Collapse
                  items={updateCollapseItem}
                  bordered={false}
                  ghost={true}
                  activeKey={collapseOpenKey}
                  className="monitorCollapse"
                  expandIcon={(panelProps) => {
                    return (
                      <>
                        {panelProps.isActive ? (
                          <DownOutlined
                            style={{
                              fontSize: "0.6rem",
                              fontWeight: "bolder",
                              marginLeft: "1rem",
                            }}
                          />
                        ) : (
                          <UpOutlined
                            style={{
                              fontSize: "0.6rem",
                              marginLeft: "1rem",
                            }}
                          />
                        )}
                      </>
                    );
                  }}
                  onChange={(key) => setCollapseOpenKey(key as string[])}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
