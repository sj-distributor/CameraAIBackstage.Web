import { CloseOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Spin,
  Switch,
} from "antd";
import { CustomTagProps } from "rc-select/lib/BaseSelect";

import { useAction } from "./hook";

export interface IUserInfoProps {
  label: string;
  value: string;
}

export const UserDetail = () => {
  const {
    form,
    selectLoading,
    selectRange,
    regionData,
    userInfo,
    navigate,
    setSelectRange,
    filterOption,
    onSubmit,
  } = useAction();

  return (
    <div className="bg-white relative overflow-hidden no-scrollbar h-screen">
      <Breadcrumb
        items={[
          {
            title: (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/user/list")}
              >
                用户列表
              </div>
            ),
          },
          {
            title: "详情",
          },
        ]}
        className="text-[1.125rem] font-semibold ml-[1.5rem] mt-[2rem]"
      />

      <div className="flex flex-col items-center overflow-scroll h-[calc(100vh-15rem)] no-scrollbar w-full min-w-[34rem]">
        <div className="p-[2rem_1.5rem] w-[80%] max-w-[71.25rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">用户信息</div>
          <Form className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem] pr-[3.5rem] flex flex-wrap justify-between">
            {userInfo.map((item, index) => {
              return (
                <Form.Item
                  label={item.label}
                  key={index}
                  className="w-[20rem] flex justify-end"
                  colon={false}
                >
                  <Input
                    defaultValue={item.value}
                    disabled
                    className="w-[15rem] userDetailDisableInput"
                  />
                </Form.Item>
              );
            })}
          </Form>
        </div>

        <div className="p-[2rem_1.5rem] w-[80%] max-w-[71.25rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">用户设置</div>
          <Form
            form={form}
            labelCol={{ span: 3 }}
            className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]"
          >
            <Form.Item label="帳號狀態" colon={false}>
              <Switch />
            </Form.Item>
            <Form.Item label="通知電話" colon={false}>
              <Input
                className="w-[60%]"
                placeholder="如沒有設置通知電話，默認使用用戶信息的電話"
                onChange={(e) => {
                  form.setFieldValue("title", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="通知企業微信" colon={false}>
              <Input
                className="w-[60%]"
                placeholder="如沒有設置通知企業微信，默認使用用戶信息的企業微信"
              />
            </Form.Item>
            <Form.Item label="通知郵箱" colon={false}>
              <Input
                className="w-[60%]"
                placeholder="如沒有設置通知郵箱，默認使用關聯郵箱"
              />
            </Form.Item>
            <Form.Item label="查看範圍" colon={false}>
              <Select
                style={{ width: "60%" }}
                value={selectRange}
                mode="multiple"
                allowClear
                options={regionData}
                filterOption={filterOption}
                dropdownRender={(menu) => (
                  <>
                    {selectLoading ? (
                      <Spin className="flex justify-center" />
                    ) : (
                      <div>{menu}</div>
                    )}
                  </>
                )}
                onChange={(value) => {
                  if (value.every((item) => item === -1)) {
                    setSelectRange(value);
                  } else {
                    const data = value.filter((item) => item !== -1);

                    setSelectRange(data);
                  }
                }}
                onSelect={(value) => {
                  if (value === -1) {
                    setSelectRange([value]);
                  }
                }}
                tagRender={(props: CustomTagProps) => {
                  const { label, closable, onClose } = props;

                  if (selectRange.includes(-1)) {
                    return <span className="ml-2">{label}</span>;
                  }

                  return (
                    <span className="ant-select-selection-item !bg-[#F6F8FC] !px-3">
                      {label}
                      {closable && (
                        <span
                          onClick={onClose}
                          className="ant-select-selection-item-remove ml-2"
                        >
                          <CloseOutlined />
                        </span>
                      )}
                    </span>
                  );
                }}
                popupClassName={"selectOptions"}
              />
              {/* <Select
                mode="multiple"
                allowClear
                filterOption={filterOption}
                style={{ width: "60%" }}
                className="userDetailSelect"
                options={[
                  {
                    value: 1,
                    label: "廣東省中山市行政路1號",
                  },
                  {
                    value: 2,
                    label: "廣東省中山市中山三路1號",
                  },
                ]}
              /> */}
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="h-[5rem] absolute bottom-0 bg-white w-[calc(100%+3rem)] z-1000 flex justify-center items-center shadow-[0_1.875rem_1.25rem_1.25rem_rgba(0,0,0,0.3)]">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBorderColor: "#2853E3",
                defaultColor: "#2853E3",
              },
            },
          }}
        >
          <Button
            className="w-[6rem] h-[2.75rem]"
            onClick={() => navigate("/user/list")}
          >
            返回
          </Button>
        </ConfigProvider>

        <Button
          className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
          type="primary"
          onClick={onSubmit}
        >
          確定
        </Button>
      </div>
    </div>
  );
};
