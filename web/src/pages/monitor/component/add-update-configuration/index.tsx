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
import TextArea from "antd/es/input/TextArea";
import { clone, isEmpty, T, values } from "ramda";
import { useLocation } from "react-router-dom";

import downArrow from "@/assets/public/down-arrow.png";

import { IMonitorConfigurationType } from "../../props";
import { useAction } from "./hook";
import { NotificationToolType, TimeType } from "./props";

export const AddOrUpdateConfiguration = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const { type, id } = location.state;

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
    // setExceptionTypeList,
    selectExceptionId,
    setSelectExceptionId,
    deviceList,
    // setDeviceList,
    selectDeviceId,
    setSelectDeviceId,
    timeSetting,
    setTimeSetting,
    selectWeekday,
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
        <div className="bg-white h-[calc(100vh-3.25rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] text-[#5F6279]">監測管理 / </span>
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {type === IMonitorConfigurationType.Update ? "修改" : "新增"}配置
          </span>
          <div className="mx-[15.5625rem] my-[1rem] h-[calc(100%-7.2rem)]">
            <Form
              onFinish={onSubmit}
              className="p-[2rem_1.5rem] h-full overflow-y-auto no-scrollbar"
              form={form}
              layout="vertical"
              autoComplete="off"
              scrollToFirstError
            >
              <Form.Item
                label="標題"
                name="title"
                rules={[{ required: true, message: "請輸入預警標題" }]}
              >
                <Input className="h-[5.1875rem]" placeholder="請輸入預警標題" />
              </Form.Item>

              <Form.Item
                label="規則設置"
                name="rule"
                rules={[
                  {
                    required: true,
                    validator: async () => {
                      let errors: string = "";

                      const hasFailed = false;

                      // await Promise.all([
                      //   [
                      //     "exceptionType",
                      //     "timeDuration",
                      //     "deviceSelect",
                      //     "timeSetting",
                      //     "repeatEveryWeek",
                      //   ].map((field) => {
                      //     return form
                      //       .validateFields([field])
                      //       .then(() => {})
                      //       .catch(() => {
                      //         console.log(hasFailed, "hasFailed");

                      //         hasFailed = true;
                      //         if (field === "repeatEveryWeek") {
                      //           errors = "請選擇重複週期";
                      //         } else {
                      //           errors = "請填寫完整信息";
                      //         }
                      //       });
                      //   }),
                      // ]);

                      if (!hasFailed && errors) {
                        errors = "";
                      }

                      if (errors) {
                        return Promise.reject(errors);
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md">
                  <div className="flex flex-row w-full p-[2rem_5.25rem_0rem_5.25rem]">
                    {/* <Form.Item
                      name="exceptionType"
                      rules={[
                        {
                          required: true,
                          validator: () => {
                            if (selectExceptionId !== null) {
                              return Promise.resolve();
                            }

                            return Promise.reject();
                          },
                        },
                      ]}
                      noStyle
                    >
                      <div className="flex flex-col w-[26.3125rem] pr-[2rem]">
                        <span className="pb-2">異常類型</span>
                        <Select
                          suffixIcon={<img src={downArrow} />}
                          options={exceptionTypeList}
                          onChange={(value) => setSelectExceptionId(value)}
                        />
                      </div>
                    </Form.Item> */}
                    {/* <Form.Item
                      name="timeDuration"
                      rules={[
                        {
                          required: true,
                          validator: () => {
                            if (!!duration && durationTimeType !== null) {
                              return Promise.resolve();
                            }

                            return Promise.reject();
                          },
                        },
                      ]}
                      noStyle
                    >
                      <div className="flex flex-col w-[26.4375rem] pb-[1.5rem]">
                        <span className="pb-2">持續時長</span>
                        <div className="flex flex-row">
                          <Input
                            className="mr-[.5rem] w-[77%]"
                            placeholder="請輸入"
                            value={duration}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );

                              setDuration(sanitizedValue);
                            }}
                          />
                          <Select
                            className="max-w-[23%]"
                            placeholder="秒"
                            defaultActiveFirstOption
                            options={[
                              { value: TimeType.Second, label: "秒" },
                              { value: TimeType.Minute, label: "分" },
                              { value: TimeType.Hours, label: "時" },
                            ]}
                            value={durationTimeType}
                            onChange={(value) => setDurationTimeType(value)}
                            suffixIcon={<img src={downArrow} />}
                          />
                        </div>
                      </div>
                    </Form.Item> */}
                  </div>
                  <div className="flex flex-row w-full p-[0rem_5.25rem_0rem_5.25rem]">
                    <Form.Item
                      name="deviceSelect"
                      key="deviceSelect"
                      rules={[
                        {
                          required: true,
                          validator: () => {
                            if (selectDeviceId !== null) {
                              return Promise.resolve();
                            }

                            return Promise.reject();
                          },
                        },
                      ]}
                      noStyle
                    >
                      <div className="flex flex-col w-[26.3125rem] pr-[2rem] pb-[1.5rem]">
                        <span className="pb-2">選擇設備</span>
                        <Select
                          placeholder="選擇設備（可多選）"
                          suffixIcon={<img src={downArrow} />}
                          options={deviceList}
                          onChange={(value) => setSelectDeviceId(value)}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="timeSetting"
                      key="timeSetting"
                      rules={[
                        {
                          required: true,
                          validator: () => {
                            if (timeSetting !== null) {
                              return Promise.resolve();
                            }

                            return Promise.reject();
                          },
                        },
                      ]}
                      noStyle
                    >
                      <div className="flex flex-col w-[26.4375rem] pb-[1.5rem]">
                        <span className="pb-2">設置時間</span>
                        <TimePicker.RangePicker
                          placeholder={["開始時間", "結束時間"]}
                          className="flex"
                          value={timeSetting}
                          onChange={(dates) => {
                            setTimeSetting(dates);
                          }}
                        />
                      </div>
                    </Form.Item>
                  </div>
                  <div className="flex flex-row w-full p-[0rem_5.25rem_0rem_5.25rem]">
                    <Form.Item
                      name="repeatEveryWeek"
                      key="repeatEveryWeek"
                      rules={[
                        {
                          required: true,
                          validator: () => {
                            if (selectWeekday) {
                              return Promise.resolve();
                            }

                            return Promise.reject();
                          },
                        },
                      ]}
                      noStyle
                    >
                      <div className="flex flex-col w-[48rem] pb-[1.5rem]">
                        <span className="pb-2">每週重複</span>
                        <div className="flex justify-between">
                          {cronList.map((item, index) => (
                            <Button
                              type={item.value ? "primary" : "default"}
                              key={index}
                              className="w-[6rem]"
                              onClick={() => {
                                const newList = clone(cronList);

                                newList[index].value = !newList[index].value;
                                setCronList(newList);
                              }}
                            >
                              {item.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </Form.Item>

              <Form.Item label="行動">
                <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md">
                  <div className="flex flex-col p-[2rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">發送通知</span>
                    <div className="flex flex-col">
                      <Form.Item
                        label="通知用戶"
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
                                "請選擇需要通知的用戶以及選擇通知渠道"
                              );
                            },
                          },
                        ]}
                        name="user"
                      >
                        <div>
                          <Select
                            placeholder="選擇用戶（可多選）"
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
                                        郵件
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
                                        企業微信
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
                                        短信
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
                                        電話
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
                        label="通知內容"
                        rules={[{ required: true, message: "請填寫通知內容" }]}
                        name="content"
                      >
                        <TextArea placeholder="請輸入通知內容" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">大聲公</span>
                    <div className="flex flex-col">
                      <Form.Item label="選擇設備">
                        <Select
                          placeholder="請選擇（可多選）"
                          suffixIcon={<img src={downArrow} />}
                        />
                      </Form.Item>
                      <Form.Item label="廣播信息">
                        <TextArea placeholder="請輸入廣播信息" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
                    <span className="pb-[1rem] font-semibold">燈光提醒</span>
                    <div className="flex flex-col">
                      <Form.Item label="選擇設備">
                        <Select
                          placeholder="請選擇（可多選）"
                          suffixIcon={<img src={downArrow} />}
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
                      navigate("/monitor");
                    }}
                  >
                    返回
                  </Button>
                </ConfigProvider>

                <Button
                  htmlType="submit"
                  className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
                  type="primary"
                >
                  確定
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};