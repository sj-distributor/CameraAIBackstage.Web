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

import KEYS from "@/i18n/language/keys/user-list-keys";

import { useAction } from "./hook";

export const UserDetail = () => {
  const {
    t,
    form,
    selectLoading,
    selectRange,
    regionData,
    userInfo,
    isSuperAdmin,
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
                onClick={() =>
                  navigate(`${isSuperAdmin ? "/team/userList" : "/user/list"}`)
                }
              >
                {t(KEYS.USER_LIST, { ns: "userList" })}
              </div>
            ),
          },
          {
            title: t(KEYS.DETAIL, { ns: "userList" }),
          },
        ]}
        className="text-[1.125rem] font-semibold ml-[1.5rem] mt-[2rem]"
      />

      <div className="flex flex-col items-center overflow-scroll h-[calc(100vh-15rem)] no-scrollbar w-full min-w-[34rem]">
        <div className="p-[2rem_1.5rem] w-[80%] max-w-[71.25rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">
            {t(KEYS.USER_INFO, { ns: "userList" })}
          </div>
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
          <div className="text-[#323444] font-semibold mb-[1rem]">
            {t(KEYS.USER_SETTING, { ns: "userList" })}
          </div>
          <Form
            form={form}
            labelCol={{ span: 3 }}
            className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]"
          >
            <Form.Item
              label={t(KEYS.ACCOUNT_STATUS, { ns: "userList" })}
              colon={false}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label={t(KEYS.ANNOUNCE_PHONE, { ns: "userList" })}
              colon={false}
            >
              <Input
                className="w-[60%]"
                placeholder={t(KEYS.ANNOUNCE_PHONE_PLACEHOLDER, {
                  ns: "userList",
                })}
                onChange={(e) => {
                  form.setFieldValue("title", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label={t(KEYS.ANNOUNCE_WECHAT, { ns: "userList" })}
              colon={false}
            >
              <Input
                className="w-[60%]"
                placeholder={t(KEYS.ANNOUNCE_WECHAT_PLACEHOLDER, {
                  ns: "userList",
                })}
              />
            </Form.Item>
            <Form.Item
              label={t(KEYS.ANNOUNCE_EMAIL, { ns: "userList" })}
              colon={false}
            >
              <Input
                className="w-[60%]"
                placeholder={t(KEYS.ANNOUNCE_EMAIL_PLACEHOLDER, {
                  ns: "userList",
                })}
              />
            </Form.Item>
            <Form.Item
              label={t(KEYS.VIEW_RANGE, { ns: "userList" })}
              colon={false}
            >
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
            onClick={() =>
              navigate(`${isSuperAdmin ? "/team/userList" : "/user/list"}`)
            }
          >
            {t(KEYS.RETURN, { ns: "userList" })}
          </Button>
        </ConfigProvider>

        <Button
          className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
          type="primary"
          onClick={onSubmit}
        >
          {t(KEYS.SUBMIT, { ns: "userList" })}
        </Button>
      </div>
    </div>
  );
};
