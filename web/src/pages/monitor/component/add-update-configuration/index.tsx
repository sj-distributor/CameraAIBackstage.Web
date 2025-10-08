import {
  CloseCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  TimePicker,
} from "antd";
import { RuleObject } from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { clone, isEmpty, isNil } from "ramda";
import { Fragment, useCallback, useState } from "react";

import { PaintAreaIcon } from "@/assets/monitor";
import downArrow from "@/assets/public/down-arrow.png";
import { CameraAiMonitorType } from "@/services/dtos/monitor";

import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";
import { MonitorPlotArea } from "../monitor-plot-area";
import { useAction } from "./hook";
import { IOptionsStringDto, TimeType } from "./props";
import { CustomPopconfirm } from "../../../../components/popconfirm";

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
    selectModalType,
    costumeAnimalOption,
    costumeAnimalType,
    isPlot,
    previewImg,
    previewImgLoading,
    setCronList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    navigate,
    onChangeUserNotificationType,
    handleUnitConversion,
    secondsToTime,
    filterOption,
    setSelectModalType,
    setCostumeAnimalType,
    setIsPlot,
    getVideoByEquipmentId,
    coordinatesRef,
    equipmentName,
    setEquipmentName,
    weChatGroupDto,
    weChatGroupList,
    enterpriseWeChatGroup,
    updateWeChatGroupDto,
    handleAddWeChatGroup,
    handleDeleteWeChatGroup,
    updateEnterpriseWeChatGroup,
  } = useAction();

  const { message } = App.useApp();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [viewPlot, setViewPlot] = useState<boolean>(false);

  const validateValue = (_: RuleObject, value: CameraAiMonitorType[]) => {
    if (value.length) {
      if (selectModalType.includes(CameraAiMonitorType.Animal)) {
        if (
          value.every(
            (item) =>
              item !== CameraAiMonitorType.Cat &&
              item !== CameraAiMonitorType.Dog &&
              item !== CameraAiMonitorType.Bird
          )
        ) {
          return Promise.reject(`${t(KEYS.ANIMAL_TYPE_TIPS, source)}`);
        }
      }

      if (selectModalType.includes(CameraAiMonitorType.Costume)) {
        if (
          value.every(
            (item) =>
              item !== CameraAiMonitorType.FluorescentClothing &&
              item !== CameraAiMonitorType.Gloves &&
              item !== CameraAiMonitorType.SafetyShoes
          )
        ) {
          return Promise.reject(`${t(KEYS.COSTUME_TYPE_TIPS, source)}`);
        }
      }

      return Promise.resolve();
    } else {
      return Promise.reject(`${t(KEYS.EQUIPMENT_TYPE_TIPS, source)}`);
    }
  };

  const renderConfigurationItems = useCallback(() => {
    const conditions = [
      {
        // 持续时长
        types: [
          CameraAiMonitorType.People,
          CameraAiMonitorType.Vehicles,
          CameraAiMonitorType.AbnormalVehicles,
          CameraAiMonitorType.Smoke,
          CameraAiMonitorType.Fight,
          CameraAiMonitorType.Costume,
          CameraAiMonitorType.Security,
          CameraAiMonitorType.Animal,
          CameraAiMonitorType.DoorSafety,
          CameraAiMonitorType.DoorRolling,
        ],
        content: (
          <div className="flex flex-col w-[26.4375rem] mr-2">
            <span className="pb-2">{t(KEYS.DURATION_TIME, source)}</span>
            <div className="flex flex-row">
              <FormItem
                className="mr-[.5rem] w-[77%]"
                name="time"
                rules={[
                  {
                    required: true,
                    message: `${t(KEYS.DURATION_TIME_PLACEHOLDER, source)}`,
                  },
                  {
                    validator: (_, value) => {
                      if (value && value <= 0) {
                        return Promise.reject(new Error("持續時長不可設置為0"));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
                initialValue={
                  editDetailData?.duration
                    ? handleUnitConversion(editDetailData.duration, false)
                    : null
                }
              >
                <Input
                  placeholder={t(KEYS.DURATION_TIME_PLACEHOLDER, source)}
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
                    message: `${t(KEYS.DURATION_UNIT_RULE_TIPS, source)}`,
                  },
                ]}
                initialValue={
                  editDetailData?.duration
                    ? handleUnitConversion(editDetailData.duration, true)
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
                  onChange={(value) => form.setFieldValue("timeType", value)}
                  suffixIcon={<img src={downArrow} />}
                />
              </FormItem>
            </div>
          </div>
        ),
      },
      {
        // 配备类型
        types: [CameraAiMonitorType.Costume, CameraAiMonitorType.Animal],
        content: (
          <div className="flex flex-col w-[26.4375rem] pr-[2rem]">
            <span className="pb-2">{t(KEYS.EQUIPMENT_TYPE, source)}</span>

            <FormItem
              name="costumeAnimalType"
              rules={[
                {
                  validator: validateValue,
                },
              ]}
              initialValue={
                editDetailData
                  ? (editDetailData?.monitorTypes ?? []).filter(
                      (type) =>
                        type === CameraAiMonitorType.Cat ||
                        type === CameraAiMonitorType.Dog ||
                        type === CameraAiMonitorType.Bird ||
                        type === CameraAiMonitorType.FluorescentClothing ||
                        type === CameraAiMonitorType.Gloves ||
                        type === CameraAiMonitorType.SafetyShoes
                    )
                  : null
              }
            >
              <Select
                mode="multiple"
                options={costumeAnimalOption}
                value={costumeAnimalType}
                onChange={(value) => {
                  setCostumeAnimalType(value);
                }}
              />
            </FormItem>
          </div>
        ),
      },
      {
        // 目标消失事件
        types: [CameraAiMonitorType.Security],
        content: (
          <div className="flex flex-col w-[24.4rem] mr-[2rem]">
            <span className="pb-2">{t(KEYS.TIME_INTERVAL, source)}</span>
            <div className="flex flex-row">
              <FormItem
                className="mr-[.5rem] w-[77%]"
                name="securityTime"
                rules={[
                  {
                    required: true,
                    message: `${t(KEYS.TIME_INTERVAL_PLACEHOLDER, source)}`,
                  },
                ]}
                initialValue={
                  editDetailData?.timeInterval
                    ? handleUnitConversion(editDetailData.timeInterval, false)
                    : null
                }
              >
                <Input
                  placeholder={t(KEYS.TIME_INTERVAL_PLACEHOLDER, source)}
                  type="number"
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(
                      /[^0-9.]/g,
                      ""
                    );

                    form.setFieldValue("securityTime", sanitizedValue);
                  }}
                />
              </FormItem>

              <FormItem
                className="w-[23%]"
                name="securityTimeType"
                rules={[
                  {
                    required: true,
                    message: `${t(KEYS.DURATION_UNIT_RULE_TIPS, source)}`,
                  },
                ]}
                initialValue={
                  editDetailData?.timeInterval
                    ? handleUnitConversion(editDetailData.timeInterval, true)
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
                    form.setFieldValue("securityTimeType", value)
                  }
                  suffixIcon={<img src={downArrow} />}
                />
              </FormItem>
            </div>
          </div>
        ),
      },
      // {
      //   // 绘制区域
      //   types: [CameraAiMonitorType.TouchGoods],
      //   content: (
      //     <div className="flex flex-col w-[24.4rem]">
      //       <span className="pb-2">繪製區域</span>
      //       <div className="flex items-center">
      //         <div
      //           className="w-[7.25rem] h-[2rem] rounded-[0.5rem] border-solid border border-[#2853E3] flex justify-center items-center cursor-pointer"
      //           onClick={() => {
      //             if (isEmpty(form.getFieldValue("deviceSelect"))) {
      //               message.info("请先选择设备");

      //               return;
      //             }

      //             if (isEmpty(areaVideo)) {
      //               message.info("没有绘制区域");

      //               return;
      //             }
      //             setIsPlot(true);

      //             setIsEdit(true);
      //           }}
      //         >
      //           <PaintAreaIcon />
      //           <div className="text-[#2853E3] ml-1">繪製區域</div>
      //         </div>
      //         {!isEmpty(coordinatesRef.current) && (
      //           <div
      //             className="ml-[0.94rem] text-[#2853E3] underline underline-offset-2 cursor-pointer"
      //             onClick={() => {
      //               setViewPlot(true);
      //               setIsEdit(false);
      //             }}
      //           >
      //             查看繪製截圖
      //           </div>
      //         )}
      //       </div>
      //     </div>
      //   ),
      // },
    ];

    return conditions
      .filter(({ types }) =>
        types.some((type) => selectModalType.includes(type))
      )
      .map(({ content }, index) => <Fragment key={index}>{content}</Fragment>);
  }, [selectModalType, previewImg, coordinatesRef.current]);

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
          <span className="text-[1.125rem] font-semibold tracking-tight">
            <span className="mx-2 text-[#5F6279]"> /</span>
            {isPlot
              ? "绘制区域"
              : type === "add"
              ? `${t(KEYS.ADD, source)}${t(KEYS.CONFIGURATION, source)}`
              : `${t(KEYS.EDIT, source)}${t(KEYS.CONFIGURATION, source)}`}
          </span>
          {isPlot ? (
            <MonitorPlotArea
              type={true}
              isEdit={isEdit}
              previewImg={previewImg}
              coordinatesRef={coordinatesRef}
              equipmentName={equipmentName}
              backPage={() => {
                setIsPlot(false);
              }}
            />
          ) : detailLoading ? (
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
                  <Spin spinning={submitLoading} tip="Loading..." size="large">
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
                          {/* AI检测事件模型 */}
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
                                editDetailData
                                  ? (editDetailData?.monitorTypes ?? []).filter(
                                      (type) =>
                                        type !== CameraAiMonitorType.Cat &&
                                        type !== CameraAiMonitorType.Dog &&
                                        type !== CameraAiMonitorType.Bird &&
                                        type !==
                                          CameraAiMonitorType.FluorescentClothing &&
                                        type !== CameraAiMonitorType.Gloves &&
                                        type !== CameraAiMonitorType.SafetyShoes
                                    )
                                  : null
                              }
                            >
                              <Select
                                mode="multiple"
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
                                  {
                                    value: CameraAiMonitorType.Security,
                                    label: `${t(MONITOR_KEY.SECURITY, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.Smoke,
                                    label: `${t(MONITOR_KEY.SMOKE, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.Fight,
                                    label: `${t(MONITOR_KEY.FIGHT, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.Costume,
                                    label: `${t(MONITOR_KEY.COSTUME, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.Animal,
                                    label: `${t(MONITOR_KEY.ANIMAL, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.TouchGoods,
                                    label: `${t(MONITOR_KEY.TOUCH_GOODS, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    value: CameraAiMonitorType.Forklift,
                                    label: `${t(MONITOR_KEY.FORKLIFT, {
                                      ns: "monitor",
                                    })}`,
                                  },
                                  {
                                    label: `${t(MONITOR_KEY.FLOOR_WATER, {
                                      ns: "monitor",
                                    })}`,
                                    value: CameraAiMonitorType.FloorWater,
                                  },
                                  {
                                    label: `${t(MONITOR_KEY.FLOOR_ICE, {
                                      ns: "monitor",
                                    })}`,
                                    value: CameraAiMonitorType.FloorIce,
                                  },
                                  {
                                    label: `安全門關閉檢測`,
                                    value: CameraAiMonitorType.DoorSafety,
                                  },
                                  {
                                    label: `卷簾門關閉檢測`,
                                    value: CameraAiMonitorType.DoorRolling,
                                  },
                                  {
                                    label: `進出時間登記`,
                                    value: CameraAiMonitorType.Attendance,
                                  },
                                ]}
                                filterOption={filterOption}
                                onChange={(value) => {
                                  form.setFieldValue("exceptionType", value);

                                  setSelectModalType(value);
                                }}
                                onSelect={(value) => {
                                  if (
                                    value === CameraAiMonitorType.TouchGoods
                                  ) {
                                    coordinatesRef.current = [];

                                    form.setFieldValue("deviceSelect", []);
                                  }
                                }}
                                placeholder={t(
                                  KEYS.EXCEPTION_TYPE_PLACEHOLDER,
                                  source
                                )}
                              />
                            </FormItem>
                          </div>
                          {renderConfigurationItems()}
                          {/* 通知策略 */}
                          <div className="flex mr-[2rem] mb-[.75rem] relative">
                            <div className="flex flex-col w-[9.5rem] pr-[2rem]">
                              <span className="pb-2">
                                {t(KEYS.NOTICE_STRATEGY, source)}
                              </span>
                              <FormItem>
                                <Select
                                  defaultValue={t(KEYS.SINGLE_NOTICE, source)}
                                  options={[
                                    {
                                      value: `${t(KEYS.SINGLE_NOTICE, source)}`,
                                      label: `${t(KEYS.SINGLE_NOTICE, source)}`,
                                    },
                                  ]}
                                />
                              </FormItem>
                            </div>

                            <div className="flex flex-col">
                              <span className="pb-2">
                                <span className="text-red-500">* </span>
                                {t(KEYS.SINGLE_NOTICE_TIME, source)}
                              </span>

                              <div className="flex space-x-2">
                                <FormItem
                                  name="singleTime"
                                  rules={[
                                    {
                                      required: true,
                                      message: `${t(
                                        KEYS.SINGLE_NOTICE_TIME_TIPS,
                                        source
                                      )}`,
                                    },
                                    {
                                      validator: (_, value) => {
                                        if (value && value <= 0) {
                                          return Promise.reject(
                                            new Error("限定時間不可設置為0")
                                          );
                                        }

                                        return Promise.resolve();
                                      },
                                    },
                                  ]}
                                  initialValue={
                                    editDetailData?.singleNoticeTime
                                      ? handleUnitConversion(
                                          editDetailData.singleNoticeTime,
                                          false
                                        )
                                      : null
                                  }
                                >
                                  <Input
                                    placeholder={t(
                                      KEYS.SINGLE_NOTICE_TIME_TIPS,
                                      source
                                    )}
                                    type="number"
                                    onChange={(e) => {
                                      const sanitizedValue =
                                        e.target.value.replace(/[^0-9.]/g, "");

                                      form.setFieldValue(
                                        "singleTime",
                                        sanitizedValue
                                      );
                                    }}
                                  />
                                </FormItem>

                                <FormItem
                                  className="w-[40%]"
                                  name="singleTimeType"
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
                                    editDetailData?.singleNoticeTime
                                      ? handleUnitConversion(
                                          editDetailData.singleNoticeTime,
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
                                      form.setFieldValue(
                                        "singleTimeType",
                                        value
                                      )
                                    }
                                    suffixIcon={<img src={downArrow} />}
                                  />
                                </FormItem>
                              </div>
                            </div>

                            <div className="absolute text-[0.75rem] text-[#5F6279] bottom-0">
                              {t(KEYS.SINGLE_NOTICE_TIPS, source)}
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
                                options={deviceList.map((item) => {
                                  return {
                                    label: item.equipmentName ?? "",
                                    value: item.id,
                                  };
                                })}
                                filterOption={filterOption}
                                onChange={(value, record) => {
                                  coordinatesRef.current = [];

                                  if (!Array.isArray(record)) {
                                    setEquipmentName(record.label);
                                  }

                                  getVideoByEquipmentId(value);
                                }}
                                mode={
                                  selectModalType.includes(
                                    CameraAiMonitorType.TouchGoods
                                  ) ||
                                  editDetailData?.monitorTypes?.includes(
                                    CameraAiMonitorType.TouchGoods
                                  )
                                    ? undefined
                                    : "multiple"
                                }
                              />
                            </FormItem>
                          </div>
                          {selectModalType.includes(
                            CameraAiMonitorType.TouchGoods
                          ) && (
                            <div className="flex flex-col w-[24.4rem]">
                              <span className="pb-2">繪製區域</span>
                              <div className="flex items-center">
                                <div
                                  className="w-[7.25rem] h-[2rem] rounded-[0.5rem] border-solid border border-[#2853E3] flex justify-center items-center cursor-pointer"
                                  onClick={() => {
                                    if (
                                      isEmpty(
                                        form.getFieldValue("deviceSelect")
                                      )
                                    ) {
                                      message.info("请先选择设备");

                                      return;
                                    }

                                    if (isEmpty(previewImg)) {
                                      message.info("没有绘制区域");

                                      return;
                                    }

                                    if (
                                      editDetailData?.equipmentIds &&
                                      !isAdd
                                    ) {
                                      const data = deviceList.find(
                                        (item) =>
                                          item.id ===
                                          editDetailData.equipmentIds[0]
                                      );

                                      setEquipmentName(
                                        data?.equipmentName ?? ""
                                      );
                                    }

                                    setIsPlot(true);

                                    setIsEdit(true);
                                  }}
                                >
                                  <PaintAreaIcon />
                                  {previewImgLoading ? (
                                    <Spin
                                      indicator={<LoadingOutlined spin />}
                                      size="small"
                                    />
                                  ) : (
                                    <div className="text-[#2853E3] ml-1">
                                      繪製區域
                                    </div>
                                  )}
                                </div>
                                {!(
                                  isNil(coordinatesRef.current) ||
                                  isEmpty(coordinatesRef.current)
                                ) && (
                                  <div
                                    className="ml-[0.94rem] text-[#2853E3] underline underline-offset-2 cursor-pointer"
                                    onClick={() => {
                                      setViewPlot(true);
                                      setIsEdit(false);
                                    }}
                                  >
                                    查看繪製截圖
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
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
                                      `${t(
                                        KEYS.SETTING_TIME_RULE_TIPS,
                                        source
                                      )}`
                                    );
                                  },
                                },
                              ]}
                              initialValue={[
                                editDetailData &&
                                editDetailData?.startTime !== null
                                  ? secondsToTime(editDetailData.startTime)
                                  : null,
                                editDetailData &&
                                editDetailData?.endTime !== null
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
                                      isEmpty(
                                        cronList.filter((x) => x.isActive)
                                      )
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
                                      type={
                                        item.isActive ? "primary" : "default"
                                      }
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
                                  filterOption={filterOption}
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
                                            {notifyType.map(
                                              (typeItem, index) => {
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
                                                          (x) =>
                                                            x === item.value
                                                        )}
                                                      onChange={(e) => {
                                                        onChangeUserNotificationType(
                                                          typeItem.type,
                                                          item.value,
                                                          item.label,
                                                          e.target.checked
                                                        );
                                                      }}
                                                    />
                                                    <span className="pl-[.3125rem]">
                                                      {typeItem.title}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
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

                        <div className="flex flex-col p-[0rem_8.6rem_0rem_5.25rem]">
                          <Form.Item
                            label="企業微信群組"
                            initialValue={editDetailData?.enterpriseWeChatGroup}
                            name="enterpriseWeChatGroup"
                          >
                            <div className="flex items-center">
                              <div className="border border-solid rounded border-[#E7E8EE] min-h-[2rem] w-full py-1 px-2 overflow-auto flex gap-2 flex-wrap">
                                {weChatGroupList.length > 0 ? (
                                  weChatGroupList.map((item, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="px-3 py-1 text-sm rounded-xl cursor-pointer
                                        bg-[#F6F8FC] text-[#323444] flex"
                                        onClick={() =>
                                          updateWeChatGroupDto({
                                            activeIndex:
                                              weChatGroupDto.activeIndex ===
                                              index
                                                ? null
                                                : index,
                                          })
                                        }
                                      >
                                        {item.name}

                                        {weChatGroupDto.activeIndex ===
                                          index && (
                                          <CloseOutlined
                                            className="text-[0.625rem] ml-2"
                                            onClick={(e) =>
                                              handleDeleteWeChatGroup(e, index)
                                            }
                                          />
                                        )}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span className="text-[#9D9FB0] text-sm">
                                    點擊添加
                                  </span>
                                )}
                              </div>

                              <CustomPopconfirm
                                open={weChatGroupDto.open}
                                placement="topLeft"
                                title="新增企微群組"
                                body={
                                  <>
                                    <Input
                                      placeholder="請輸入企業微信名"
                                      className="w-[20.3rem]"
                                      value={enterpriseWeChatGroup?.name}
                                      onChange={(e) =>
                                        updateEnterpriseWeChatGroup({
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                    <Input
                                      placeholder="请输入企微群組機器人Webhook地址的Key"
                                      className="w-[20.3rem]"
                                      value={enterpriseWeChatGroup?.webhookKey}
                                      onChange={(e) =>
                                        updateEnterpriseWeChatGroup({
                                          webhookKey: e.target.value,
                                        })
                                      }
                                    />
                                  </>
                                }
                                onConfirm={handleAddWeChatGroup}
                                onCancel={() => {
                                  updateWeChatGroupDto({ open: false });
                                }}
                              >
                                <PlusCircleOutlined
                                  className="text-[1.375rem] text-[#5F6279] ml-4 cursor-pointer"
                                  onClick={() =>
                                    updateWeChatGroupDto({ open: true })
                                  }
                                />
                              </CustomPopconfirm>
                            </div>
                          </Form.Item>
                        </div>
                      </div>
                    </Form.Item>
                  </Spin>
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
        <Modal
          width={1000}
          open={viewPlot}
          closable={false}
          footer={null}
          destroyOnClose
          className="plotModal relative"
        >
          <div className="h-[30rem]">
            <MonitorPlotArea
              type={true}
              isEdit={isEdit}
              previewImg={previewImg}
              coordinatesRef={coordinatesRef}
              equipmentName={equipmentName}
              backPage={() => {}}
            />
          </div>

          <div
            className="absolute left-[50%] -bottom-[3rem] cursor-pointer"
            onClick={() => setViewPlot(false)}
          >
            <CloseCircleOutlined
              style={{
                color: "#D7D7E2",
                fontSize: "1.67rem",
              }}
            />
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
