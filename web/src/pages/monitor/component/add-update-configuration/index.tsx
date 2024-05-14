import { CloseOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Select,
  Spin,
  TimePicker,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { clone, isEmpty } from "ramda";

import downArrow from "@/assets/public/down-arrow.png";
import { CameraAiMonitorType } from "@/services/dtos/monitor";

import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";
import { useAction } from "./hook";
import { IOptionsStringDto, TimeType } from "./props";

export const AddOrUpdateConfiguration = () => {
  const {
    cronList,
    userOptions,
    form,
    type,
    KEYS,
    t,
    source,
    selectUserValue,
    notifyType,
    selectUserData,
    editDetailData,
    deviceList,
    isAdd,
    detailLoading,
    submitLoading,
    setCronList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    navigate,
    onChangeUserNotificationType,
    handleUnitConversion,
    secondsToTime,
  } = useAction();

  const { message } = App.useApp();

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
            {t(KEYS.MONITOR, source)}
          </span>
          <span className="text-[1.125rem] font-semibold tracking-tight ">
            <span className="mx-2 text-[#5F6279]"> /</span>
            {type === "add"
              ? `${t(KEYS.ADD, source)}`
              : `${t(KEYS.EDIT, source)}`}
            {t(KEYS.CONFIGURATION, source)}
          </span>
          {detailLoading ? (
            <Spin
              spinning={detailLoading}
              className="flex justify-center items-center h-[45%]"
              size="large"
            />
          ) : (
            ((!isAdd && editDetailData) || isAdd) && (
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
                    initialValue={editDetailData?.title}
                  >
                    <Input
                      className="h-[5.1875rem]"
                      placeholder={t(KEYS.TITLE_PLACEHOLDER, source)}
                      onChange={(e) => {
                        form.setFieldValue("title", e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={t(KEYS.RULE_SETTING, source)}
                    name="rule"
                    rules={[
                      {
                        required: true,
                        validator: () => {
                          // 不做外层校验
                          return Promise.resolve();
                        },
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
                            initialValue={
                              editDetailData ? editDetailData.monitorType : null
                            }
                          >
                            <Select
                              suffixIcon={<img src={downArrow} />}
                              options={[
                                {
                                  value: CameraAiMonitorType.People,
                                  label: `${t(MONITOR_KEY.IDENTIFY_PEOPLE, {
                                    ns: "monitor",
                                  })}`,
                                },
                                {
                                  value: CameraAiMonitorType.Vehicles,
                                  label: `${t(MONITOR_KEY.IDENTIFY_VEHICLES, {
                                    ns: "monitor",
                                  })}`,
                                },
                                {
                                  value: CameraAiMonitorType.AbnormalVehicles,
                                  label: `${t(
                                    MONITOR_KEY.IDENTIFY_ABNORMAL_VEHICLES,
                                    { ns: "monitor" }
                                  )}`,
                                },
                              ]}
                              onChange={(value) => {
                                form.setFieldValue("exceptionType", value);
                              }}
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
                              initialValue={
                                editDetailData?.duration
                                  ? handleUnitConversion(
                                      editDetailData.duration,
                                      false
                                    )
                                  : null
                              }
                            >
                              <Input
                                placeholder={t(
                                  KEYS.DURATION_TIME_PLACEHOLDER,
                                  source
                                )}
                                type="number"
                                onChange={(e) => {
                                  const sanitizedValue = e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  );

                                  form.setFieldValue("time", sanitizedValue);
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
                              initialValue={
                                editDetailData?.duration
                                  ? handleUnitConversion(
                                      editDetailData.duration,
                                      true
                                    )
                                  : null
                              }
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
                                onChange={(value) =>
                                  form.setFieldValue("timeType", value)
                                }
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
                            initialValue={editDetailData?.equipmentIds}
                          >
                            <Select
                              placeholder={t(
                                KEYS.SELECT_DEVICE_PLACEHOLDER,
                                source
                              )}
                              suffixIcon={<img src={downArrow} />}
                              options={deviceList}
                              onChange={(value) =>
                                form.setFieldValue("deviceSelect", value)
                              }
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
                                validator: (_, value) => {
                                  if (
                                    !!value &&
                                    !isEmpty(value) &&
                                    !!value[0] &&
                                    !!value[1]
                                  ) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(
                                    `${t(KEYS.SETTING_TIME_RULE_TIPS, source)}`
                                  );
                                },
                              },
                            ]}
                            initialValue={[
                              editDetailData &&
                              editDetailData?.startTime !== null
                                ? secondsToTime(editDetailData.startTime)
                                : null,
                              editDetailData && editDetailData?.endTime !== null
                                ? secondsToTime(editDetailData.endTime)
                                : null,
                            ]}
                          >
                            <TimePicker.RangePicker
                              placeholder={[
                                `${t(KEYS.START_TIME, source)}`,
                                `${t(KEYS.END_TIME, source)}`,
                              ]}
                              className="flex"
                              onChange={(dates) => {
                                if (
                                  dates &&
                                  dates[0]?.format("HH:mm") ===
                                    dates[1]?.format("HH:mm")
                                ) {
                                  message.warning("不可选择相同时间的范围");

                                  return;
                                } else {
                                  form.setFieldValue("timeSetting", dates);
                                }
                              }}
                              format="HH:mm"
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
                                validator: () => {
                                  if (
                                    isEmpty(cronList.filter((x) => x.isActive))
                                  ) {
                                    return Promise.reject(
                                      `${t(
                                        KEYS.REPEAT_EVERY_WEEK_RULE_TIPS,
                                        source
                                      )}`
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <div className="flex justify-between flex-wrap">
                              {cronList.map((item, index) => {
                                return (
                                  <Button
                                    type={item.isActive ? "primary" : "default"}
                                    key={index}
                                    className="min-w-[6rem]"
                                    onClick={() => {
                                      const newList = clone(cronList);

                                      newList[index].isActive =
                                        !newList[index].isActive;
                                      setCronList(newList);
                                    }}
                                  >
                                    {t(item.title, source)}
                                  </Button>
                                );
                              })}
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
                                  const isAllComplete = selectUserValue.every(
                                    (item) =>
                                      selectUserData.some((x) =>
                                        x.recipientIds.includes(item.value)
                                      )
                                  );

                                  if (
                                    selectUserData.some(
                                      (x) => !isEmpty(x.recipientIds)
                                    ) &&
                                    isAllComplete
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
                                options={userOptions}
                                value={selectUserValue}
                                mode="multiple"
                                onChange={(_, option) =>
                                  onChangeNoticeUserList(
                                    option as IOptionsStringDto[]
                                  )
                                }
                              />
                              {selectUserValue &&
                                selectUserValue.map((item, index) => (
                                  <div
                                    className="px-[1rem] my-[.375rem] border border-[#E7E8EE] border-solid rounded"
                                    key={index}
                                  >
                                    <div className="flex flex-row justify-between items-center">
                                      <div className="py-[.3125rem] flex flex-row items-center min-w-[7rem]">
                                        <span className="w-[6.75rem] text-[#2853E3]">
                                          {item.label}
                                        </span>
                                        <div className="flex-wrap flex flex-row">
                                          {notifyType.map((typeItem, index) => {
                                            return (
                                              <div
                                                className={`flex flex-row items-center ${
                                                  index !==
                                                    notifyType.length - 1 &&
                                                  "pr-[2.5625rem]"
                                                }`}
                                                key={index}
                                              >
                                                <Checkbox
                                                  className="w-[1.125rem] h-[1.125rem]"
                                                  checked={selectUserData
                                                    .find(
                                                      (x) =>
                                                        x.notifyType ===
                                                        typeItem.type
                                                    )
                                                    ?.recipientIds.some(
                                                      (x) => x === item.value
                                                    )}
                                                  onChange={(e) => {
                                                    onChangeUserNotificationType(
                                                      typeItem.type,
                                                      item.value,
                                                      e.target.checked
                                                    );
                                                  }}
                                                />
                                                <span className="pl-[.3125rem]">
                                                  {typeItem.title}
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                      <CloseOutlined
                                        className="w-[1rem] h-[1rem] text-[#5F6279] text-xs"
                                        onClick={() =>
                                          onDeleteNoticeUserItem(item.value)
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
                            initialValue={editDetailData?.notificationContent}
                          >
                            <TextArea
                              placeholder={t(
                                KEYS.NOTIFICATION_CONTENT_PLACEHOLDER,
                                source
                              )}
                              onChange={(e) => {
                                form.setFieldValue("content", e.target.value);
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
                        {/* 暂时不做这块内容，注释 UI */}
                        {/* <span className="pb-[1rem] font-semibold">
                        {t(KEYS.LOUDSPEAKER, source)}
                      </span> */}
                        <div className="flex flex-col">
                          {/* <Form.Item label={t(KEYS.SELECT_DEVICE, source)}>
                          <Select
                            placeholder={t(KEYS.SELECT_RULE_TIPS, source)}
                            suffixIcon={<img src={downArrow} />}
                            mode="multiple"
                          />
                        </Form.Item> */}
                          <Form.Item
                            label={t(KEYS.BROADCAST_INFORMATION, source)}
                            initialValue={editDetailData?.broadcastContent}
                            name="broadcastContent"
                          >
                            <TextArea
                              placeholder={t(
                                KEYS.BROADCAST_INFORMATION_PLACEHOLDER,
                                source
                              )}
                              // value={broadcastContent}
                              onChange={(e) => {
                                // setBroadcastContent(e.target.value);
                                form.setFieldValue("user", e.target.value);
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/* <div className="flex flex-col p-[0rem_11rem_0rem_5.25rem]">
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
                    </div> */}
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
                      loading={submitLoading}
                    >
                      {t(KEYS.CONFIRM, source)}
                    </Button>
                  </div>
                </Form>
              </div>
            )
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};
