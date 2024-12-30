import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import { useNavigate } from "react-router-dom";

export interface IUserInfoProps {
  label: string;
  value: string;
}

export const UserDetail = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const userInfo: IUserInfoProps[] = [
    {
      label: "用户ID",
      value: "001",
    },
    {
      label: "用戶名",
      value: "DANNY.L",
    },
    {
      label: "部門",
      value: "OSC",
    },
    {
      label: "組別",
      value: "A組",
    },
    {
      label: "崗位",
      value: "001",
    },
    {
      label: "是否在職",
      value: "在職",
    },
    {
      label: "電話",
      value: "13712312345",
    },
    {
      label: "企業微信",
      value: "XXX.X",
    },
    {
      label: "關聯郵箱",
      value: "xx@QWE..COM",
    },
  ];

  const filterOption = (
    input: string,
    option?: {
      label?: string;
      value: number | string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
    });
  };

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
          <div className="text-[#323444] font-semibold mb-[1rem]">用户信息</div>
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
              />
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
