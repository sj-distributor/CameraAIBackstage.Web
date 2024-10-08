import { useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import { clone, isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Moment } from "moment";

import { useAuth } from "@/hooks/use-auth";

import KEYS from "../../../../i18n/language/keys/monitor-configuration-keys";
import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";

import {
  ICronListDto,
  IOptionsNumberDto,
  IOptionsStringDto,
  TimeType,
} from "./props";
import {
  CameraAiMonitorType,
  CameraAiNotificationType,
  DayOfWeek,
  IMonitorNotificationsDto,
  IMonitorSettingsDto,
  IUserProfiles,
} from "@/services/dtos/monitor";
import {
  GetMonitorSettingDetail,
  GetUserList,
  MonitorSettingCreate,
  MonitorSettingUpdate,
} from "@/services/api/monitor";
import { GetEquipmentPage } from "@/services/api/equipment/list";
import dayjs from "dayjs";
import { getErrorMessage } from "@/utils/error-message";

export const useAction = () => {
  const { t } = useAuth();

  const source = { ns: "monitorConfiguration" };

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { type, id } = useParams();

  const { message } = App.useApp();

  const isAdd = type === "add";

  const initConfigurationInfo = {
    weekDays: [],
    equipmentIds: [],
    monitorNotifications: [],
    timeZone: "Pacific Standard Time",
    title: "",
    duration: null,
    notificationContent: "", //通知内容
    broadcastContent: "", //广播内容
    monitorTypes: [],
    startTime: null,
    endTime: null,
    timeInterval: null,
  };

  const notifyType = [
    {
      title: t(KEYS.EMAIL, source),
      type: CameraAiNotificationType.Email,
    },
    {
      title: t(KEYS.ENTERPRISE_WECHAT, source),
      type: CameraAiNotificationType.WorkWechat,
    },
    {
      title: t(KEYS.SHORT_MESSAGE, source),
      type: CameraAiNotificationType.Sms,
    },
    // 电话暂时隐藏
    // {
    //   title: t(KEYS.TELEPHONE, source),
    //   type: CameraAiNotificationType.PhoneCall,
    // },
  ];

  const initCronList = [
    { title: KEYS.MONDAY, value: DayOfWeek.Monday, isActive: false },
    { title: KEYS.TUESDAY, value: DayOfWeek.Tuesday, isActive: false },
    { title: KEYS.WEDNESDAY, value: DayOfWeek.Wednesday, isActive: false },
    { title: KEYS.THURSDAY, value: DayOfWeek.Thursday, isActive: false },
    { title: KEYS.FRIDAY, value: DayOfWeek.Friday, isActive: false },
    { title: KEYS.SATURDAY, value: DayOfWeek.Saturday, isActive: false },
    { title: KEYS.SUNDAY, value: DayOfWeek.Sunday, isActive: false },
  ];

  const initUserData = [
    {
      notifyType: CameraAiNotificationType.Email,
      recipientIds: [],
      recipients: [],
    },
    {
      notifyType: CameraAiNotificationType.PhoneCall,
      recipientIds: [],
      recipients: [],
    },
    {
      notifyType: CameraAiNotificationType.Sms,
      recipientIds: [],
      recipients: [],
    },
    {
      notifyType: CameraAiNotificationType.WorkWechat,
      recipientIds: [],
      recipients: [],
    },
  ];

  const [editDetailData, serEditDetailData] = useState<
    IMonitorSettingsDto | undefined
  >(isAdd ? initConfigurationInfo : undefined);

  const editCronList = initCronList.map((x) => {
    if (editDetailData?.weekDays.includes(x.value)) {
      x.isActive = true;
    }
    return x;
  });

  const [cronList, setCronList] = useState<ICronListDto[]>(
    isAdd ? initCronList : editCronList
  );

  const selectWeekday: DayOfWeek[] = useMemo(() => {
    return cronList.filter((x) => x.isActive).map((x) => x.value);
  }, [cronList]);

  const [userData, setUserData] = useState<IUserProfiles[]>([]); //接受数据

  const [selectUserData, setSelectUserData] = useState<
    IMonitorNotificationsDto[]
  >(isAdd ? initUserData : editDetailData?.monitorNotifications ?? []); //接口

  const [deviceList, setDeviceList] = useState<IOptionsNumberDto[]>([]);

  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  const [submitLoading, setSubmitLoadin] = useState<boolean>(false);

  const [selectModalType, setSelectModalType] = useState<CameraAiMonitorType[]>(
    []
  );

  const [costumeAnimalType, setCostumeAnimalType] = useState<
    CameraAiMonitorType[]
  >([]);

  const [isSelecteSecurity, setIsSelectSecurity] = useState<boolean>(false);

  const animalOptions = [
    {
      value: CameraAiMonitorType.Cat,
      label: t(MONITOR_KEY.CAT, {
        ns: "monitor",
      }),
    },
    {
      value: CameraAiMonitorType.Dog,
      label: t(MONITOR_KEY.DOG, {
        ns: "monitor",
      }),
    },
    {
      value: CameraAiMonitorType.Bird,
      label: t(MONITOR_KEY.BIRD, {
        ns: "monitor",
      }),
    },
  ];

  const costumeOptions = [
    {
      value: CameraAiMonitorType.FluorescentClothing,
      label: t(MONITOR_KEY.FlUORESCENTCLOTHING, {
        ns: "monitor",
      }),
    },
    {
      value: CameraAiMonitorType.Gloves,
      label: t(MONITOR_KEY.GLOVES, {
        ns: "monitor",
      }),
    },
    {
      value: CameraAiMonitorType.SafetyShoes,
      label: t(MONITOR_KEY.SAFETYSHOES, {
        ns: "monitor",
      }),
    },
  ];

  const costumeAnimalOption = useMemo(() => {
    let options: { value: CameraAiMonitorType; label: string }[] = [];

    if (selectModalType.includes(CameraAiMonitorType.Animal)) {
      options = options.concat(animalOptions);
    }

    if (selectModalType.includes(CameraAiMonitorType.Costume)) {
      options = options.concat(costumeOptions);
    }

    return options;
  }, [selectModalType]);

  const editDetailUser = useMemo(() => {
    // 处理编辑数据中的 user列表
    if (
      !editDetailData ||
      !editDetailData.monitorNotifications ||
      isEmpty(editDetailData.monitorNotifications)
    ) {
      return [];
    }

    // 将所有recipientIds抽离出来
    const editUser = editDetailData.monitorNotifications.reduce<string[]>(
      (acc, item) => {
        if (!isEmpty(item.recipientIds)) {
          acc.push(...item.recipientIds);
        }
        return acc;
      },
      []
    );

    // 根据 userData 找对应的recipientIds的名字并凑成一个 option 回显
    return userData.reduce<IOptionsStringDto[]>((acc, item) => {
      if (editUser.includes(item.staffId)) {
        acc.push({
          label: item.name,
          value: item.staffId,
        });
      }
      return acc;
    }, []);
  }, [editDetailData, userData]);

  //构造一个显示的 user option
  const userOptions: IOptionsStringDto[] = useMemo(() => {
    return userData
      ? userData.map((item) => {
          return {
            label: item.name,
            value: item.staffId,
          };
        })
      : [];
  }, [userData]);

  const [selectUserValue, setSelectUserValue] = useState<IOptionsStringDto[]>(
    isAdd ? [] : editDetailUser
  );

  const handleTotalDuration = (duration: number, unit: TimeType) => {
    let count: number = 0;
    // 转换秒数传参
    switch (unit) {
      case TimeType.Second:
        count = Number(duration);
        break;
      case TimeType.Minute:
        count = Number(duration) * 60;
        break;
      case TimeType.Hours:
        count = Number(duration) * 60 * 60;
        break;
      default:
        break;
    }

    return count;
  };

  const handleUnitConversion = (duration: number, isUnit: boolean) => {
    const divisibleMinutes = duration % 60;
    const divisibleHours = duration % 3600;

    if (divisibleHours === 0) {
      return isUnit ? TimeType.Hours : duration / 3600;
    } else if (divisibleMinutes === 0) {
      return isUnit ? TimeType.Minute : duration / 60;
    } else {
      return isUnit ? TimeType.Second : duration;
    }
  };

  const onDeleteNoticeUserItem = (staffId: string) => {
    // 复制选择的用户列表
    const newSelectUserList = clone(selectUserValue);

    // 在 newSelectUserList 中找到要删除的项并删除
    const filteredUserList = newSelectUserList.filter(
      (user) => user.value !== staffId
    );

    // 更新选择的用户列表状态
    setSelectUserValue(filteredUserList);

    // 在选择的用户数据列表中找到要删除的项并删除
    const updatedUserData = selectUserData.map((item) => {
      // 在 recipientIds 数组中找到要删除的 staffId 并删除
      item.recipientIds = item.recipientIds.filter((id) => id !== staffId);

      // 在 recipients 数组中找到要删除的 staffId 并删除
      item.recipients = item.recipients.filter(
        (recipient) => recipient.staffId !== staffId
      );

      return item;
    });

    // 更新选择的用户数据状态
    setSelectUserData(updatedUserData);
  };

  const onChangeNoticeUserList = (option: IOptionsStringDto[]) => {
    const idList = option.map((idItem) => idItem.value);

    // 构造一个 label value 的 option
    const filterList = userData.reduce<IOptionsStringDto[]>((acc, item) => {
      if (idList.includes(item.staffId)) {
        const newValue: IOptionsStringDto = {
          label: item.name,
          value: item.staffId,
        };
        acc.push(newValue);
      }
      return acc;
    }, []);

    setSelectUserValue(filterList);
  };

  const secondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    return dayjs().hour(hours).minute(minutes);
  };

  const timeToSeconds = (date: Moment) => {
    const hour = date.hour();

    const minute = date.minute();

    return hour * 3600 + minute * 60;
  };

  const onSubmit = () => {
    const filterSelectUserData = selectUserData.filter(
      (x) => !isEmpty(x.recipientIds)
    ); // 去除空的recipientIds的 userdata

    form.validateFields().then(async (values) => {
      const data: IMonitorSettingsDto = {
        title: values.title,
        duration: handleTotalDuration(values.time, values.timeType),
        notificationContent: values.content,
        monitorTypes: values.exceptionType,
        weekDays: values.repeatEveryWeek,
        monitorNotifications: filterSelectUserData,
        equipmentIds: values.deviceSelect,
        startTime: timeToSeconds(values.timeSetting[0]),
        endTime: timeToSeconds(values.timeSetting[1]),
        timeZone: "Pacific Standard Time",
        isActive: true,
      };
      if ((isAdd && !!values.broadcastContent) || !isAdd) {
        data.broadcastContent = values.broadcastContent;
      }

      if (!isAdd) {
        data.isActive = editDetailData?.isActive ?? true;
      }

      if (!isAdd && id) {
        data.id = Number(id); // 编辑添加 id
      }

      if (isSelecteSecurity) {
        data.timeInterval = handleTotalDuration(
          values.securityTime,
          values.securityTimeType
        );
      }

      if (
        selectModalType.includes(CameraAiMonitorType.Animal) ||
        selectModalType.includes(CameraAiMonitorType.Costume)
      ) {
        data.monitorTypes = data.monitorTypes.concat(costumeAnimalType);
      }

      if (
        selectModalType.includes(CameraAiMonitorType.Smoke) ||
        selectModalType.includes(CameraAiMonitorType.Fight)
      ) {
        data.singleNoticeTime = handleTotalDuration(
          values.singleTime,
          values.singleTimeType
        );
      }

      setSubmitLoadin(true);
      isAdd
        ? MonitorSettingCreate(data)
            .then(() => {
              message.success(`创建成功`);
              navigate("/monitor");
            })
            .catch((err) => {
              message.error(getErrorMessage((err as Error).message));
            })
            .finally(() => setSubmitLoadin(false))
        : MonitorSettingUpdate(data)
            .then(() => {
              message.success(`编辑成功`);
              navigate("/monitor");
            })
            .catch((err) => {
              message.error(getErrorMessage((err as Error).message));
            })
            .finally(() => setSubmitLoadin(false));
    });
  };

  // 切换用户的通知类型
  const onChangeUserNotificationType = (
    itemType: CameraAiNotificationType,
    userId: string,
    isChecked: boolean
  ) => {
    const newList = clone(selectUserData);

    for (let i = 0; i < newList.length; i++) {
      const userItem = newList[i];

      // 找到这个notifyType，对recipientIds中的 userID 勾选：新增 取消勾选：删除
      if (userItem.notifyType === itemType) {
        if (!isChecked) {
          // 取消勾选，从 recipientIds 中删除 userId
          const deleteIndex = userItem.recipientIds.findIndex(
            (x) => x === userId
          );
          userItem.recipientIds.splice(deleteIndex, 1);
          userItem.recipients.splice(deleteIndex, 1);
        } else {
          // 新增勾选，向 recipientIds 中添加 userId
          userItem.recipientIds.push(userId);
          userItem.recipients.push({ staffId: userId });
        }
      }
    }

    // 检查是否找到了对应的 notifyType，如果没找到则添加新项
    const foundItemIndex = newList.findIndex(
      (item) => item.notifyType === itemType
    );
    if (foundItemIndex === -1) {
      newList.push({
        recipientIds: [userId],
        recipients: [{ staffId: userId }],
        notifyType: itemType,
      });
    }

    setSelectUserData(newList);
  };

  const initGetUserList = () => {
    GetUserList({ PageSize: 2147483647, PageIndex: 1, Status: 1 })
      .then((res) => {
        setUserData(res.userProfiles);
      })
      .catch(() => {
        setUserData([]);
      });
  };

  const filterOption = (
    input: string,
    option?: {
      label?: string;
      value: number | string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useUpdateEffect(() => {
    form.setFieldValue("repeatEveryWeek", selectWeekday);
    form.validateFields(["repeatEveryWeek"]);
  }, [form, selectWeekday]);

  useEffect(() => {
    initGetUserList();

    GetEquipmentPage({ PageSize: 2147483647, PageIndex: 1, IsBind: true })
      .then((res) => {
        const newEquipmentList = res.equipments.map((item) => {
          return { label: item.equipmentName ?? "", value: item.id };
        });

        setDeviceList(newEquipmentList);
      })
      .catch(() => {
        setDeviceList([]);
      });
  }, []);

  useEffect(() => {
    if (isAdd) return; // 新增不请求 detail
    setDetailLoading(true);
    GetMonitorSettingDetail({ settingId: Number(id) })
      .then((res) => {
        serEditDetailData(res);

        setIsSelectSecurity(
          res.monitorTypes.includes(CameraAiMonitorType.Security)
        );

        setSelectModalType(res.monitorTypes);

        setCostumeAnimalType(
          res.monitorTypes.filter(
            (type) =>
              type === CameraAiMonitorType.Cat ||
              type === CameraAiMonitorType.Dog ||
              type === CameraAiMonitorType.Bird ||
              type === CameraAiMonitorType.FluorescentClothing ||
              type === CameraAiMonitorType.Gloves ||
              type === CameraAiMonitorType.SafetyShoes
          )
        );
      })
      .catch(() => {
        message.error("獲取詳情數據失敗");
        navigate("/monitor");
      })
      .finally(() => setDetailLoading(false));
  }, [isAdd, id]);

  useEffect(() => {
    // 未设 initvalue 的自动更新值
    setSelectUserValue(isAdd ? [] : editDetailUser);
    setSelectUserData(
      isAdd ? initUserData : editDetailData?.monitorNotifications ?? []
    );
    setCronList(isAdd ? initCronList : editCronList);
  }, [isAdd, editDetailData, editDetailUser]);

  useEffect(() => {
    let filterType: CameraAiMonitorType[] = [...costumeAnimalType];

    if (!selectModalType.includes(CameraAiMonitorType.Animal)) {
      filterType = filterType.filter(
        (type) =>
          type !== CameraAiMonitorType.Cat &&
          type !== CameraAiMonitorType.Dog &&
          type !== CameraAiMonitorType.Bird
      );
    }

    if (!selectModalType.includes(CameraAiMonitorType.Costume)) {
      filterType = filterType.filter(
        (type) =>
          type !== CameraAiMonitorType.FluorescentClothing &&
          type !== CameraAiMonitorType.Gloves &&
          type !== CameraAiMonitorType.SafetyShoes
      );
    }

    setCostumeAnimalType(filterType);

    form.setFieldsValue({ costumeAnimalType: filterType });
  }, [selectModalType]);

  return {
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
    isSelecteSecurity,
    selectModalType,
    costumeAnimalOption,
    costumeAnimalType,
    setCronList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    navigate,
    onChangeUserNotificationType,
    handleUnitConversion,
    secondsToTime,
    filterOption,
    setIsSelectSecurity,
    setSelectModalType,
    setCostumeAnimalType,
  };
};
