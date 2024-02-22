import { AutoComplete, Button, Checkbox, Form, Input } from "antd";
import { Outlet } from "react-router-dom";

import { useAction } from "./hook";

export const AddNewPermissions = () => {
  const {
    onChange,
    handleCheckBox,
    homePageList,
    monitor,
    videoPlayback,
    alertList,
    feedbackList,
    userList,
    permissionsList,
    deviceList,
    equipmentType,
    monitorSet,
    portraitSet,
    licensePlateSet,
    areaSet,
  } = useAction();

  return (
    <div>
      <Outlet />
      <div className="h-[20rem] w-[107rem] bg-white rounded-b-md ">
        <div className="bg-white w-full pr-[1rem] pl-[1.5rem] h-[calc(100vh-10rem)] overflow-auto">
          <div className="font-semibold tracking-tight pt-[0.5rem]">
            <Button type="text">
              <span className="text-[1rem]">角色列表</span>
            </Button>
            <span className="text-[1rem]">/</span>
            <Button type="text">
              <span className="text-[1rem] font-semibold">新增角色</span>
            </Button>
          </div>
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
                  <AutoComplete onChange={onChange} placeholder="請輸入">
                    <Input />
                  </AutoComplete>
                </Form.Item>
              </div>
              <div className="flex justify-center items-center mb-[2rem] pl-[5.3rem] ">
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
              <div className="flex flex-col w-[71.25rem] rounded flex pl-[4.9rem] pt-[1rem]">
                <div className="flex justify-row mb-[1rem]">
                  <span className="mr-[4.3rem] font-medium"> 可見頁面</span>
                  <span className="font-medium">功能權限</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row mb-[0.8rem]">
                    {homePageList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {monitor.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {videoPlayback.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {alertList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row">
                    {feedbackList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
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
                  <div className="flex flex-row mb-[0.8rem]">
                    {userList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem] ">
                    {permissionsList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {deviceList.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {equipmentType.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {monitorSet.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {portraitSet.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row mb-[0.8rem]">
                    {licensePlateSet.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex flex-row">
                    {areaSet.map((option) => (
                      <Checkbox
                        className="w-[8rem]"
                        key={option.value}
                        value={option.value}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[6rem] w-[107rem] bg-white flex justify-center pt-[1rem]">
          <Button className="w-[5rem] h-[2.5rem] mr-[3rem]">取消</Button>
          <Button
            type="primary"
            className="w-[5rem] h-[2.5rem] mr-[1rem] bg-[#2853E3]"
          >
            確定
          </Button>
        </div>
      </div>
    </div>
  );
};
