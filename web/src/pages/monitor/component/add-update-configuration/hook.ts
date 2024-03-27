import { useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import { clone, isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import KEYS from "../../../../i18n/language/keys/monitor-configuration-keys";
import {
  ICronListDto,
  IOptionsNumberDto,
  IOptionsStringDto,
  TimeType,
} from "./props";
import {
  CameraAiNotificationType,
  DayOfWeek,
  IMonitorNotificationsDto,
  IMonitorSettingsDto,
  IUserProfiles,
} from "@/services/dtos/monitor";
import {
  GetMonitorSettingDetail,
  GetMonitorType,
  GetUserList,
  MonitorSettingCreate,
  MonitorSettingUpdate,
} from "@/services/api/monitor";
import { GetEquipmentPage } from "@/services/api/equipment/list";

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
    timeZone: "America/Los_Angeles",
    title: "",
    duration: null,
    notificationContent: "", //通知内容
    broadcastContent: "", //广播内容
    monitorTypeId: isAdd ? (id ? Number(id) : null) : null, //预警类型 id
    startTime: null,
    endTime: null,
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
    {
      title: t(KEYS.TELEPHONE, source),
      type: CameraAiNotificationType.PhoneCall,
    },
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

  const [monitorType, setMonitorType] = useState<IOptionsNumberDto[]>([]);

  const [deviceList, setDeviceList] = useState<IOptionsNumberDto[]>([]);

  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  const [submitLoading, setSubmitLoadin] = useState<boolean>(false);

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

  const onDeleteNoticeUserItem = (index: number) => {
    const newSelectUserList = clone(selectUserValue);

    newSelectUserList.splice(index, 1);
    setSelectUserValue(selectUserValue);
  };

  const onChangeNoticeUserList = (option: IOptionsStringDto[]) => {
    const idList = option.map((idItem) => idItem.value);

    // 构造一个 lable value 的 option
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

  const onSubmit = () => {
    const filterSelectUserData = selectUserData.filter(
      (x) => !isEmpty(x.recipientIds)
    ); // 去除空的recipientIds的 userdata

    form.validateFields().then(async (values) => {
      const data: IMonitorSettingsDto = {
        title: values.title,
        duration: handleTotalDuration(values.time, values.timeType),
        notificationContent: values.content,
        monitorTypeId: values.exceptionType,
        weekDays: values.repeatEveryWeek,
        monitorNotifications: filterSelectUserData,
        equipmentIds: values.deviceSelect,
        startTime: Math.round(values.timeSetting[0] / 1000),
        endTime: Math.round(values.timeSetting[1] / 1000),
        timeZone: "America/Los_Angeles",
      };
      if ((isAdd && !!values.broadcastContent) || !isAdd) {
        data.broadcastContent = values.broadcastContent;
      }

      if (!isAdd && id) {
        data.id = Number(id); // 编辑添加 id
      }
      if (!isAdd && !data.id) {
        message.error("id 丢失，请重新打开");
      }
      setSubmitLoadin(true);
      isAdd
        ? MonitorSettingCreate(data)
            .then(() => {
              message.success(`创建成功`);
              navigate("/monitor");
            })
            .catch((err) => {
              message.error(`创建失败：${err}`);
            })
            .finally(() => setSubmitLoadin(false))
        : MonitorSettingUpdate(data)
            .then(() => {
              message.success(`编辑成功`);
              navigate("/monitor");
            })
            .catch((err) => {
              message.error(`编辑失败：${err}`);
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
    GetUserList({ PageSize: 2147483647, PageIndex: 1 })
      .then((res) => {
        setUserData(res.userProfiles);
      })
      .catch(() => {
        setUserData([]);
      });
  };

  useUpdateEffect(() => {
    form.setFieldValue("repeatEveryWeek", selectWeekday);
    form.validateFields(["repeatEveryWeek"]);
  }, [form, selectWeekday]);

  useEffect(() => {
    initGetUserList();

    GetMonitorType()
      .then((res) => {
        const typeList = res.map((item) => {
          return { label: item.name, value: item.id };
        });
        setMonitorType(typeList);
      })
      .catch(() => {
        setMonitorType([]);
      });

    GetEquipmentPage({ PageSize: 2147483647, PageIndex: 1 })
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
    if (isAdd) return; //新增不请求 detail
    setDetailLoading(true);
    GetMonitorSettingDetail({ settingId: Number(id) })
      .then((res) => {
        serEditDetailData(res);
      })
      .catch((err) => {
        message.error(err);
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
  }, [isAdd, editDetailData]);

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
    monitorType,
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
  };
};
