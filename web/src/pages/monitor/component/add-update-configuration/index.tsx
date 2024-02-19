import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { clone, isEmpty } from "ramda";

import downArrow from "@/assets/public/down-arrow.png";

import { useAction } from "./hook";
import { NotificationToolType, TimeType } from "./props";

export const AddOrUpdateConfiguration = () => {
  const {
    cronList,
    setCronList,
    userList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    selectUserList,
    setSelectUserList,
    navigate,
    setDuration,
    duration,
    durationTimeType,
    setDurationTimeType,
    exceptionTypeList,
    setSelectExceptionId,
    deviceList,
    setSelectDeviceId,
    timeSetting,
    setTimeSetting,
    form,
    type,
    KEYS,
    t,
    source,
  } = useAction();

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#2853E3",
          },
          Button: {
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#5168e3",
          },
        },
      }}
    >
      <div className="relative">
        <div className="bg-white h-[calc(100vh-3.25rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar min-w-[35rem]">
          <span
            className="text-[1.125rem] text-[#5F6279] cursor-pointer"
            onClick={() => navigate("/monitor")}
          >
            {t(KEYS.MONITOR, source)}{" "}
          </span>
          <span className="text-[1.125rem] font-semibold tracking-tight">
            /{" "}
            {type === "add"
              ? `${t(KEYS.EDIT, source)}`
              : `${t(KEYS.ADD, source)}`}
            {t(KEYS.CONFIGURATION, source)}
          </span>
          <div className="my-[1rem] h-[calc(100%-7.2rem)] flex justify-center">
            <Form
              onFinish={onSubmit}
              className="p-[2rem_1.5rem] h-full overflow-y-auto no-scrollbar w-[71.25rem]"
              form={form}
              layout="vertical"
              autoComplete="off"
              scrollToFirstError
            >
              <Form.Item
                label={t(KEYS.TITLE, source)}
                name="title"
                rules={[
                  {
                    required: true,
                    message: `${t(KEYS.TITLE_PLACEHOLDER, source)}`,
                  },
                ]}
              >
                <Input
                  className="h-[5.1875rem]"
                  placeholder={t(KEYS.TITLE_PLACEHOLDER, source)}
                />
              </Form.Item>

              <Form.Item
                label={t(KEYS.RULE_SETTING, source)}
                name="rule"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md py-[1.5rem]">
                  <div className="flex flex-row w-full p-[0rem_5.25rem] flex-wrap">
                    <div className="flex flex-col w-[26.3125rem] pr-[2rem]">
                      <span className="pb-2">
                        {t(KEYS.EXCEPTION_TYPE, source)}
                      </span>
                      <FormItem
                        name="exceptionType"
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              KEYS.EXCEPTION_TYPE_PLACEHOLDER,
                              source
                            )}`,
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={<img src={downArrow} />}
                          options={exceptionTypeList}
                          onChange={(value) => setSelectExceptionId(value)}
                          placeholder={t(
                            KEYS.EXCEPTION_TYPE_PLACEHOLDER,
                            source
                          )}
                        />
                      </FormItem>
                    </div>

                    <div className="flex flex-col w-[26.4375rem]">
                      <span className="pb-2">
                        {t(KEYS.DURATION_TIME, source)}
                      </span>
                      <div className="flex flex-row">
                        <FormItem
                          className="mr-[.5rem] w-[77%]"
                          name="time"
                          rules={[
                            {
                              required: true,
                              message: `${t(
                                KEYS.DURATION_TIME_PLACEHOLDER,
                                source
                              )}`,
                            },
                          ]}
                        >
                          <Input
                            placeholder={t(
                              KEYS.DURATION_TIME_PLACEHOLDER,
                              source
                            )}
                            value={duration}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );

                              setDuration(sanitizedValue);
                            }}
                          />
                        </FormItem>

                        <FormItem
                          className="w-[23%]"
                          name="timeType"
                          rules={[
                            {
                              required: true,
                              message: `${t(
                                KEYS.DURATION_UNIT_RULE_TIPS,
                                source
                              )}`,
                            },
                          ]}
                        >
                          <Select
                            placeholder={t(KEYS.SECOND, source)}
                            defaultActiveFirstOption
                            options={[
                              {
                                value: TimeType.Second,
                                label: `${t(KEYS.SECOND, source)}`,
                              },
                              {
                                value: TimeType.Minute,
                                label: `${t(KEYS.MINUTE, source)}`,
                              },
                              {
                                value: TimeType.Hours,
                                label: `${t(KEYS.HOUR, source)}`,
                              },
                            ]}
                            value={durationTimeType}
                            onChange={(value) => setDurationTimeType(value)}
                            suffixIcon={<img src={downArrow} />}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full p-[0rem_5.25rem_0rem_5.25rem] flex-wrap">
                    <div className="flex flex-col w-[26.3125rem] pr-[2rem]">
                      <span className="pb-2">
                        {t(KEYS.SELECT_DEVICE, source)}
                      </span>
                      <FormItem
                        name="deviceSelect"
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              KEYS.SELECT_DEVICE_RULE_TIPS,
                              source
                            )}`,
                          },
                        ]}
                      >
                        <Select
                          placeholder={t(
                            KEYS.SELECT_DEVICE_PLACEHOLDER,
                            source
                          )}
                          suffixIcon={<img src={downArrow} />}
                          options={deviceList}
                          onChange={(value) => setSelectDeviceId(value)}
                          mode="multiple"
                        />
                      </FormItem>
                    </div>
                    <div className="flex flex-col w-[26.4375rem]">
                      <span className="pb-2">
                        {t(KEYS.SETTING_TIME, source)}
                      </span>
                      <FormItem
                        name="timeSetting"
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              KEYS.SETTING_TIME_RULE_TIPS,
                              source
                            )}`,
                          },
                        ]}
                      >
                        <TimePicker.RangePicker
                          placeholder={[
                            `${t(KEYS.START_TIME, source)}`,
                            `${t(KEYS.END_TIME, source)}`,
                          ]}
                          className="flex"
                          value={timeSetting}
                          onChange={(dates) => {
                            setTimeSetting(dates);
                          }}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div className="flex flex-row w-full p-[0rem_5.25rem_0rem_5.25rem]">
                    <div className="flex flex-col w-[48rem]">
                      <span className="pb-2">
                        {t(KEYS.REPEAT_EVERY_WEEK, source)}
                      </span>
                      <FormItem
                        name="repeatEveryWeek"
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              KEYS.REPEAT_EVERY_WEEK_RULE_TIPS,
                              source
                            )}`,
                            validator: (_, value) => {
                              console.log(value);

                              if (isEmpty(value) || !value) {
                                return Promise.reject();
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <div className="flex justify-between flex-wrap">
                          {cronList.map((item, index) => (
                            <Button
                              type={item.value ? "primary" : "default"}
                              key={index}
                              className="min-w-[6rem]"
                              onClick={() => {
                                const newList = clone(cronList);

                                newList[index].value = !newList[index].value;
                                setCronList(newList);
                              }}
                            >
                              {t(item.title, source)}
                            </Button>
                          ))}
                        </div>
                      </FormItem>
                    </div>
                  </div>
                </div>
              </Form.Item>

              <Form.Item label={t(KEYS.ACTION, source)}>
                <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md">
                  <div className="flex flex-col p-[2rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">
                      {t(KEYS.NOTIFY_USER, source)}
                    </span>
                    <div className="flex flex-col">
                      <Form.Item
                        label={t(KEYS.NOTIFY_USER, source)}
                        rules={[
                          {
                            required: true,
                            validator: () => {
                              if (
                                !isEmpty(selectUserList) &&
                                selectUserList.every(
                                  (x) => !isEmpty(x.notificationTool)
                                )
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                `${t(KEYS.NOTIFY_USER_RULE_TIPS, source)}`
                              );
                            },
                          },
                        ]}
                        name="user"
                      >
                        <div>
                          <Select
                            placeholder={t(
                              KEYS.NOTIFY_USER_PLACEHOLDER,
                              source
                            )}
                            allowClear={false}
                            removeIcon={null}
                            suffixIcon={<img src={downArrow} />}
                            options={userList}
                            value={selectUserList.map((item) => item.name)}
                            mode="multiple"
                            onChange={onChangeNoticeUserList}
                          />
                          {selectUserList &&
                            selectUserList.map((item, index) => (
                              <div
                                className="px-[1rem] my-[.375rem] border border-[#E7E8EE] border-solid rounded"
                                key={index}
                              >
                                <div className="flex flex-row justify-between items-center">
                                  <div className="py-[.3125rem] flex flex-row items-center">
                                    <span className="w-[6.75rem] text-[#2853E3]">
                                      {item.name}
                                    </span>
                                    <div className="flex flex-row items-center pr-[2.5625rem]">
                                      <Checkbox
                                        className="w-[1.125rem] h-[1.125rem]"
                                        checked={item.notificationTool?.includes(
                                          NotificationToolType.Email
                                        )}
                                        onChange={(value) => {
                                          if (!value) return;
                                          const newList = clone(selectUserList);

                                          if (
                                            !isEmpty(item.notificationTool) &&
                                            item.notificationTool.includes(
                                              NotificationToolType.Email
                                            )
                                          )
                                            return;
                                          newList[index].notificationTool.push(
                                            NotificationToolType.Email
                                          );
                                          setSelectUserList(newList);
                                        }}
                                      />
                                      <span className="pl-[.3125rem]">
                                        {t(KEYS.EMAIL, source)}
                                      </span>
                                    </div>
                                    <div className="flex flex-row items-center pr-[2.5625rem]">
                                      <Checkbox
                                        className="w-[1.125rem] h-[1.125rem]"
                                        checked={item.notificationTool?.includes(
                                          NotificationToolType.EnterpriseWeChat
                                        )}
                                        onChange={(value) => {
                                          if (!value) return;
                                          const newList = clone(selectUserList);

                                          if (
                                            !isEmpty(item.notificationTool) &&
                                            item.notificationTool.includes(
                                              NotificationToolType.EnterpriseWeChat
                                            )
                                          )
                                            return;
                                          newList[index].notificationTool.push(
                                            NotificationToolType.EnterpriseWeChat
                                          );
                                          setSelectUserList(newList);
                                        }}
                                      />
                                      <span className="pl-[.3125rem]">
                                        {t(KEYS.ENTERPRISE_WECHAT, source)}
                                      </span>
                                    </div>
                                    <div className="flex flex-row items-center pr-[2.5625rem]">
                                      <Checkbox
                                        className="w-[1.125rem] h-[1.125rem]"
                                        checked={item.notificationTool?.includes(
                                          NotificationToolType.Sms
                                        )}
                                        onChange={(value) => {
                                          if (!value) return;
                                          const newList = clone(selectUserList);

                                          if (
                                            !isEmpty(item.notificationTool) &&
                                            item.notificationTool.includes(
                                              NotificationToolType.Sms
                                            )
                                          )
                                            return;
                                          newList[index].notificationTool.push(
                                            NotificationToolType.Sms
                                          );
                                          setSelectUserList(newList);
                                        }}
                                      />
                                      <span className="pl-[.3125rem]">
                                        {t(KEYS.SHORT_MESSAGE, source)}
                                      </span>
                                    </div>
                                    <div className="flex flex-row items-center pr-[2.5625rem]">
                                      <Checkbox
                                        className="w-[1.125rem] h-[1.125rem]"
                                        checked={item.notificationTool?.includes(
                                          NotificationToolType.Telephone
                                        )}
                                        onChange={(value) => {
                                          if (!value) return;
                                          const newList = clone(selectUserList);

                                          if (
                                            !isEmpty(item.notificationTool) &&
                                            item.notificationTool.includes(
                                              NotificationToolType.Telephone
                                            )
                                          )
                                            return;
                                          newList[index].notificationTool.push(
                                            NotificationToolType.Telephone
                                          );
                                          setSelectUserList(newList);
                                        }}
                                      />
                                      <span className="pl-[.3125rem]">
                                        {t(KEYS.TELEPHONE, source)}
                                      </span>
                                    </div>
                                  </div>
                                  <CloseOutlined
                                    className="w-[1rem] h-[1rem] text-[#5F6279] text-xs"
                                    onClick={() =>
                                      onDeleteNoticeUserItem(index)
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </Form.Item>
                      <Form.Item
                        label={t(KEYS.NOTIFICATION_CONTENT, source)}
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              KEYS.NOTIFICATION_CONTENT_PLACEHOLDER,
                              source
                            )}`,
                          },
                        ]}
                        name="content"
                      >
                        <TextArea
                          placeholder={t(
                            KEYS.NOTIFICATION_CONTENT_PLACEHOLDER,
                            source
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">
                      {t(KEYS.LOUDSPEAKER, source)}
                    </span>
                    <div className="flex flex-col">
                      <Form.Item label={t(KEYS.SELECT_DEVICE, source)}>
                        <Select
                          placeholder={t(KEYS.SELECT_RULE_TIPS, source)}
                          suffixIcon={<img src={downArrow} />}
                          mode="multiple"
                        />
                      </Form.Item>
                      <Form.Item label={t(KEYS.BROADCAST_INFORMATION, source)}>
                        <TextArea
                          placeholder={t(
                            KEYS.BROADCAST_INFORMATION_PLACEHOLDER,
                            source
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">
                      {t(KEYS.LIGHT_REMINDER, source)}
                    </span>
                    <div className="flex flex-col">
                      <Form.Item label={t(KEYS.SELECT_DEVICE, source)}>
                        <Select
                          placeholder={t(KEYS.SELECT_RULE_TIPS, source)}
                          suffixIcon={<img src={downArrow} />}
                          mode="multiple"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Form.Item>

              <div className="h-[5rem] absolute bottom-[2rem] left-[-1.5rem] bg-white w-[calc(100%+3rem)] z-1 flex justify-center items-center shadow-[0_1.875rem_1.25rem_1.25rem_rgba(0,0,0,0.3)]">
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
                    onClick={() => {
                      type === "add"
                        ? navigate("/monitor/add")
                        : navigate("/monitor");
                    }}
                  >
                    {t(KEYS.BACK, source)}
                  </Button>
                </ConfigProvider>

                <Button
                  htmlType="submit"
                  className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
                  type="primary"
                >
                  {t(KEYS.CONFIRM, source)}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
