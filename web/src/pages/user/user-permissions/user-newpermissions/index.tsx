import { AutoComplete, Breadcrumb, Button, Checkbox, Form, Input } from "antd";

import { useAction } from "./hook";

export const NewOrUpdatePermissions = () => {
  const {
    AddRoleName,
    handleCheckBox,
    frontendOptionsList,
    backendOptionsList,
    navigate,
  } = useAction();

  return (
    <div className="h-[20rem] w-[107rem] bg-white rounded-b-md">
      <Breadcrumb
        items={[
          {
            title: (
              <div onClick={() => navigate("/user/permissions")}>角色列表</div>
            ),
          },
          {
            title: "新增角色",
          },
        ]}
        className="text-[1.125rem] font-semibold ml-[1.5rem] pt-[2rem] "
      />
      <div className="bg-white w-full h-[calc(100vh-14rem)] overflow-auto no-scrollbar">
        <div className="ml-[17rem] mt-[1rem]">
          <span className="font-medium">角色信息</span>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[10.9rem] pr-[15.75rem] border-2 mt-[1rem]">
            <div className="flex justify-center items-center pl-[5.3rem] pt-[2rem]">
              <Form.Item
                name="角色名稱"
                label="角色名稱"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="h-[2rem] w-[48rem]"
              >
                <AutoComplete onChange={AddRoleName} placeholder="請輸入">
                  <Input />
                </AutoComplete>
              </Form.Item>
            </div>
            <div className="flex justify-center items-center mb-[2rem] pl-[5.3rem]">
              <Form.Item
                name="角色描述"
                label="角色描述"
                rules={[
                  {
                    required: true,
                    message: "請輸入",
                  },
                ]}
                className="h-[2.06rem] w-[48rem]"
              >
                <Input.TextArea placeholder="請輸入" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">前台功能權限</div>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[15rem] pr-[15.75rem] border-2 mt-[1rem] mb-[1rem]">
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[1rem]">
              <div className="flex justify-row mb-[1rem]">
                <span className="mr-[4.3rem] font-medium"> 可見頁面</span>
                <span className="font-medium">功能權限</span>
              </div>
              <div className="flex flex-col">
                {frontendOptionsList.map((item, index) => (
                  <div className="flex flex-row mb-[0.8rem]" key={index}>
                    {item.option.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={item.optionName}
                        value={item.option}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">後台功能權限</div>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[24rem] pr-[15.75rem] border-2 mt-[1rem]">
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[2rem]">
              <div className="flex justify-row mb-[1.2rem]">
                <span className="mr-[4.5rem] font-medium"> 可見頁面</span>
                <span className="font-medium">功能權限</span>
              </div>
              <div className="flex flex-col">
                {backendOptionsList.map((items, index) => (
                  <div className="flex flex-row mb-[0.8rem]" key={index}>
                    {items.option.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={index}
                        value={items.option}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[6rem] bg-white flex justify-center pt-[1rem] shadow-[0_4px_25px_-0_rgba(68,68,71,0.15)]">
        <Button
          className="w-[5rem] h-[2.5rem] mr-[3rem]"
          onClick={() => navigate("/user/permissions")}
        >
          取消
        </Button>
        <Button
          type="primary"
          className="w-[5rem] h-[2.5rem] mr-[1rem] bg-[#2853E3]"
        >
          確定
        </Button>
      </div>
    </div>
  );
};
