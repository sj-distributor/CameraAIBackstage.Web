import { useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { clone, isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import KEYS from "../../../../i18n/language/keys/monitor-configuration-keys";
import { ICronListDto, IOptionsNumberDto, TimeType } from "./props";
import {
  CameraAiNotificationType,
  DayOfWeek,
  IMonitorNotificationsDto,
  IMonitorSettingsDto,
  IUserProfiles,
} from "@/services/dtos/monitor";
import {
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

  const editDetailData: IMonitorSettingsDto = isAdd
    ? undefined
    : useLocation().state.data;

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
    { title: KEYS.THURSDAY, value: DayOfWeek.Tuesday, isActive: false },
    { title: KEYS.WEDNESDAY, value: DayOfWeek.Wednesday, isActive: false },
    { title: KEYS.THURSDAY, value: DayOfWeek.Thursday, isActive: false },
    { title: KEYS.FRIDAY, value: DayOfWeek.Friday, isActive: false },
    { title: KEYS.SATURDAY, value: DayOfWeek.Saturday, isActive: false },
    { title: KEYS.SUNDAY, value: DayOfWeek.Sunday, isActive: false },
  ];

  const [cronList, setCronList] = useState<ICronListDto[]>(
    isAdd
      ? initCronList
      : initCronList.map((x) => {
          if (editDetailData.weekDays.includes(x.value)) {
            x.isActive = true;
          }
          return x;
        })
  );

  const selectWeekday: DayOfWeek[] = useMemo(() => {
    if (isAdd) {
      return cronList.filter((x) => x.isActive).map((x) => x.value);
    } else {
      return editDetailData.weekDays;
    }
  }, [cronList]);

  const [userData, setUserData] = useState<IUserProfiles[]>([]); //接受数据

  const initUserData = [
    { notifyType: CameraAiNotificationType.Email, recipientIds: [] },
    { notifyType: CameraAiNotificationType.PhoneCall, recipientIds: [] },
    { notifyType: CameraAiNotificationType.Sms, recipientIds: [] },
    { notifyType: CameraAiNotificationType.WorkWechat, recipientIds: [] },
  ];

  const [selectUserData, setSelectUserData] = useState<
    IMonitorNotificationsDto[]
  >(isAdd ? initUserData : editDetailData.monitorNotifications); //接口

  const editDetailUser = useMemo(() => {
    if (!editDetailData || !editDetailData.monitorNotifications) {
      return [];
    }

    const editUser = editDetailData.monitorNotifications.reduce<number[]>(
      (acc, item) => {
        if (!isEmpty(item.recipientIds)) {
          acc.push(...item.recipientIds);
        }
        return acc;
      },
      []
    );

    return userData.reduce<IOptionsNumberDto[]>((acc, item) => {
      if (editUser.includes(item.id)) {
        acc.push({
          label: item.name,
          value: item.id,
        });
      }
      return acc;
    }, []);
  }, [editDetailData, userData]);

  const [selectUserValue, setSelectUserValue] = useState<IOptionsNumberDto[]>(
    isAdd ? [] : editDetailUser
  );

  const userDisplayList: IOptionsNumberDto[] = useMemo(() => {
    return userData
      ? userData.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      : [];
  }, [userData]); //显示

  const [monitorTypeId, setMonitorTypeId] = useState<number | null>(
    isAdd ? Number(id) : editDetailData.monitorTypeId
  );

  const [monitorType, setMonitorType] = useState<IOptionsNumberDto[]>([]);

  const [deviceList, setDeviceList] = useState<IOptionsNumberDto[]>([]);

  const [selectDeviceId, setSelectDeviceId] = useState<number[] | undefined>(
    isAdd ? undefined : editDetailData.equipmentIds
  ); // 选择设备 id

  const [timeSetting, setTimeSetting] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(
    isAdd
      ? null
      : [dayjs(editDetailData.startTime), dayjs(editDetailData.endTime)]
  );

  const [duration, setDuration] = useState<string>(
    isAdd ? "" : editDetailData.duration.toString()
  ); // 持续时长

  const [durationTimeType, setDurationTimeType] = useState<TimeType | null>(
    null
  ); // 持续时长类型

  const totalDuration = useMemo(() => {
    let count: number = 0;
    switch (durationTimeType) {
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
  }, [durationTimeType, duration]);

  const [title, setTitle] = useState<string>(isAdd ? "" : editDetailData.title);

  const [notificationContent, setNotificationContent] = useState<string>(
    isAdd ? "" : editDetailData.notificationContent
  );

  const [broadcastContent, setBroadcastContent] = useState<string>(
    isAdd ? "" : editDetailData.broadcastContent ?? ""
  );

  const onDeleteNoticeUserItem = (index: number) => {
    const newSelectUserList = clone(selectUserValue);

    newSelectUserList.splice(index, 1);
    setSelectUserValue(selectUserValue);
  };

  const onChangeNoticeUserList = (option: IOptionsNumberDto[]) => {
    const idList = option.map((idItem) => idItem.value);

    const filterList = userData.reduce<IOptionsNumberDto[]>((acc, item) => {
      if (idList.includes(item.id)) {
        const newValue: IOptionsNumberDto = {
          label: item.name,
          value: item.id,
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
    );

    if (!monitorTypeId) return;
    const data: IMonitorSettingsDto = {
      title: title,
      duration: totalDuration,
      notificationContent: notificationContent,
      monitorTypeId: monitorTypeId,
      weekDays: selectWeekday,
      monitorNotifications: filterSelectUserData,
      equipmentIds: selectDeviceId ?? [],
      startTime:
        timeSetting && timeSetting[0] !== null ? timeSetting[0].valueOf() : 0,
      endTime:
        timeSetting && timeSetting[1] !== null ? timeSetting[1].valueOf() : 0,
      timeZone: "America/Los_Angeles",
    };
    if (broadcastContent) {
      data.broadcastContent = broadcastContent;
    }

    if (!isAdd && id) {
      data.id = Number(id);
    }

    console.log("data", data);

    // isAdd
    //   ? MonitorSettingCreate(data)
    //       .then(() => {
    //         message.success(`创建成功`);
    //         navigate("/monitor");
    //       })
    //       .catch((err) => {
    //         message.error(`创建失败：${err}`);
    //       })
    //   : MonitorSettingUpdate(data)
    //       .then(() => {
    //         message.success(`编辑成功`);
    //         navigate("/monitor");
    //       })
    //       .catch((err) => {
    //         message.error(`编辑失败：${err}`);
    //       });
  };

  const onChangeUserType = (
    itemType: CameraAiNotificationType,
    userId: number,
    isChecked: boolean
  ) => {
    const newList = clone(selectUserData);
    newList.map((userItem) => {
      if (userItem.notifyType === itemType) {
        if (!isChecked) {
          const deleteIndex = userItem.recipientIds.findIndex(
            (x) => x === userId
          );
          userItem.recipientIds.splice(deleteIndex, 1);
        } else {
          userItem.recipientIds.push(userId);
        }
      }
    });
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
    if (!isAdd) {
      setSelectUserValue(editDetailUser);
    }
  }, [editDetailUser, isAdd]);

  return {
    cronList,
    setCronList,
    userDisplayList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    navigate,
    setDuration,
    duration,
    durationTimeType,
    setDurationTimeType,
    monitorTypeId,
    setMonitorTypeId,
    deviceList,
    selectDeviceId,
    setSelectDeviceId,
    timeSetting,
    setTimeSetting,
    form,
    type,
    KEYS,
    t,
    source,
    selectUserValue,
    notifyType,
    selectUserData,
    onChangeUserType,
    title,
    setTitle,
    monitorType,
    notificationContent,
    setNotificationContent,
    broadcastContent,
    setBroadcastContent,
  };
};
