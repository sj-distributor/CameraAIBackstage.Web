import { useRequest, useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import dayjs from "dayjs";
import { Moment } from "moment";
import { clone, isEmpty } from "ramda";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { GetEquipmentPage } from "@/services/api/equipment/list";
import {
  GetEquipmentPreviews,
  GetMonitorSettingDetail,
  GetNoticeUsers,
  MonitorSettingCreate,
  MonitorSettingUpdate,
} from "@/services/api/monitor";
import { IEquipmentList } from "@/services/dtos/equipment/list";
import {
  CameraAiMonitorType,
  CameraAiNotificationType,
  DayOfWeek,
  IEnterpriseWeChatGroup,
  IMetadataProps,
  IMonitorNotificationsDto,
  IMonitorSettingsDto,
  INoticeUsersProps,
  IWeChatGroupDto,
} from "@/services/dtos/monitor";
import { getErrorMessage } from "@/utils/error-message";

import KEYS from "../../../../i18n/language/keys/monitor-configuration-keys";
import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";
import { ICronListDto, IOptionsStringDto, TimeType } from "./props";

export const useAction = () => {
  const { t, currentTeam } = useAuth();

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
    notificationContent: "", // 通知内容
    broadcastContent: "", // 广播内容
    monitorTypes: isAdd ? (id ? [Number(id)] : null) : null,
    startTime: null,
    endTime: null,
    timeInterval: null,
    settingWechatWebhooks: [],
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

  const [userData, setUserData] = useState<INoticeUsersProps[]>([]); // 接受数据

  const [selectUserData, setSelectUserData] = useState<
    IMonitorNotificationsDto[]
  >(isAdd ? initUserData : editDetailData?.monitorNotifications ?? []); // 接口

  const [deviceList, setDeviceList] = useState<IEquipmentList[]>([]);

  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  const [submitLoading, setSubmitLoadin] = useState<boolean>(false);

  const [selectModalType, setSelectModalType] = useState<CameraAiMonitorType[]>(
    []
  );

  const [costumeAnimalType, setCostumeAnimalType] = useState<
    CameraAiMonitorType[]
  >([]);

  const [settingWechatWebhooks, setEnterpriseWeChatGroup] =
    useState<IEnterpriseWeChatGroup>({ groupName: "", webhook: "" });

  const [weChatGroupList, setWeChatGroupList] = useState<
    IEnterpriseWeChatGroup[]
  >([]);

  const [weChatGroupDto, setWeChatGroupDto] = useState<{
    open: boolean;
    activeIndex: number | null;
  }>({ open: false, activeIndex: null });

  const updateEnterpriseWeChatGroup = (data: Partial<IEnterpriseWeChatGroup>) =>
    setEnterpriseWeChatGroup((prev) => ({
      ...prev,
      ...data,
    }));

  const updateWeChatGroupDto = (data: Partial<IWeChatGroupDto>) =>
    setWeChatGroupDto((prev) => ({
      ...prev,
      ...data,
    }));

  const [isPlot, setIsPlot] = useState<boolean>(false);

  const [previewImg, setPreviewImg] = useState<string>("");

  const [equipmentName, setEquipmentName] = useState<string>("");

  const coordinatesRef = useRef<IMetadataProps[]>();

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
      if (editUser.includes(item.id)) {
        acc.push({
          label: item.userProfileName,
          value: item.id,
        });
      }

      return acc;
    }, []);
  }, [editDetailData, userData]);

  // 构造一个显示的 user option
  const userOptions: IOptionsStringDto[] = useMemo(() => {
    return userData
      ? userData.map((item) => {
          return {
            label: item.userProfileName,
            value: item.id,
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

  const onDeleteNoticeUserItem = (id: string) => {
    // 复制选择的用户列表
    const newSelectUserList = clone(selectUserValue);

    // 在 newSelectUserList 中找到要删除的项并删除
    const filteredUserList = newSelectUserList.filter(
      (user) => user.value !== id
    );

    // 更新选择的用户列表状态
    setSelectUserValue(filteredUserList);

    // 在选择的用户数据列表中找到要删除的项并删除
    const updatedUserData = selectUserData.map((item) => {
      // 在 recipientIds 数组中找到要删除的 id 并删除
      item.recipientIds = item.recipientIds.filter((id) => id !== id);

      // 在 recipients 数组中找到要删除的 id 并删除
      item.recipients = item.recipients.filter(
        (recipient) => recipient.teamUserId !== id
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
      if (idList.includes(item.id)) {
        const newValue: IOptionsStringDto = {
          label: item.userProfileName,
          value: item.id,
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

  const handleAddWeChatGroup = () => {
    if (
      !settingWechatWebhooks.groupName.trim() ||
      !settingWechatWebhooks.webhook.trim()
    )
      return;

    const newGroups = [...weChatGroupList, settingWechatWebhooks];

    setWeChatGroupList(newGroups);

    form.setFieldValue("settingWechatWebhooks", newGroups);

    updateEnterpriseWeChatGroup({
      groupName: "",
      webhook: "",
    });

    updateWeChatGroupDto({
      open: false,
      activeIndex: null,
    });
  };

  const handleDeleteWeChatGroup = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.stopPropagation();

    const newGroups = weChatGroupList?.filter((_, i) => i !== index) ?? [];

    setWeChatGroupList(newGroups);

    form.setFieldValue("settingWechatWebhooks", newGroups);

    updateWeChatGroupDto({
      activeIndex: null,
    });
  };

  const onSubmit = () => {
    const filterSelectUserData = selectUserData.filter(
      (x) => !isEmpty(x.recipientIds)
    ); // 去除空的recipientIds的 userdata

    form.validateFields().then(async (values) => {
      const data: IMonitorSettingsDto = {
        title: values.title,
        notificationContent: values.content,
        monitorTypes: values.exceptionType,
        weekDays: values.repeatEveryWeek,
        monitorNotifications: filterSelectUserData,
        equipmentIds: values.deviceSelect,
        startTime: timeToSeconds(values.timeSetting[0]),
        endTime: timeToSeconds(values.timeSetting[1]),
        timeZone: "Pacific Standard Time",
        isActive: true,
        teamId: currentTeam.id,
        singleNoticeTime: handleTotalDuration(
          values.singleTime,
          values.singleTimeType
        ),

        settingWechatWebhooks: values.settingWechatWebhooks, // 企業微信群組
      };

      // console.log(data);

      // return;

      if (
        [
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
        ].some((type) => selectModalType.includes(type))
      ) {
        data.duration = handleTotalDuration(values.time, values.timeType);
      }

      if ((isAdd && !!values.broadcastContent) || !isAdd) {
        data.broadcastContent = values.broadcastContent;
      }

      if (!isAdd) {
        data.isActive = editDetailData?.isActive ?? true;
      }

      if (!isAdd && id) {
        data.id = Number(id); // 编辑添加 id
      }

      if (selectModalType.includes(CameraAiMonitorType.Security)) {
        data.timeInterval = handleTotalDuration(
          values.securityTime,
          values.securityTimeType
        );
      }

      if (
        selectModalType.includes(CameraAiMonitorType.Animal) ||
        selectModalType.includes(CameraAiMonitorType.Costume)
      ) {
        data.monitorTypes = (data?.monitorTypes ?? []).concat(
          costumeAnimalType
        );
      }

      if (selectModalType.includes(CameraAiMonitorType.TouchGoods)) {
        if (!data.metadatas) {
          data.metadatas = [];
        }

        data.metadatas = coordinatesRef?.current ?? [];
      }

      console.log(data);

      // return;

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
    name: string,
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
          userItem.recipients.push({ teamUserId: userId, name: name });
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
        recipients: [{ teamUserId: userId, name: name }],
        notifyType: itemType,
      });
    }

    setSelectUserData(newList);
  };

  const initGetUserList = () => {
    GetNoticeUsers({
      KeyWord: "",
      TeamId: currentTeam.id,
    })
      .then((res) => {
        setUserData(res);
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

    GetEquipmentPage({
      PageSize: 2147483647,
      PageIndex: 1,
      IsBind: true,
      TeamId: currentTeam.id,
    })
      .then((res) => {
        setDeviceList(res.equipments ?? []);
      })
      .catch(() => {
        setDeviceList([]);
      });
  }, []);

  useEffect(() => {
    if (isAdd) {
      setSelectModalType(editDetailData?.monitorTypes ?? []);

      return;
    }
    setDetailLoading(true);
    GetMonitorSettingDetail({ settingId: Number(id) })
      .then((res) => {
        serEditDetailData(res);

        setSelectModalType(res.monitorTypes ?? []);

        setCostumeAnimalType(
          (res?.monitorTypes ?? []).filter(
            (type) =>
              type === CameraAiMonitorType.Cat ||
              type === CameraAiMonitorType.Dog ||
              type === CameraAiMonitorType.Bird ||
              type === CameraAiMonitorType.FluorescentClothing ||
              type === CameraAiMonitorType.Gloves ||
              type === CameraAiMonitorType.SafetyShoes
          )
        );

        coordinatesRef.current = res.metadatas ?? [];

        if (res.monitorTypes?.includes(CameraAiMonitorType.TouchGoods)) {
          getPreviewImg(res.equipmentIds[0].toString());
        }
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

  const getVideoByEquipmentId = (id: string | string[]) => {
    const formattedValue = selectModalType.includes(
      CameraAiMonitorType.TouchGoods
    )
      ? [id]
      : id;

    form.setFieldValue("deviceSelect", formattedValue);

    if (
      selectModalType.includes(CameraAiMonitorType.TouchGoods) ||
      editDetailData?.monitorTypes?.includes(CameraAiMonitorType.TouchGoods)
    ) {
      getPreviewImg(Array.isArray(id) ? id : [id]);
    }
  };

  const { loading: previewImgLoading, run: getPreviewImg } = useRequest(
    (id) => GetEquipmentPreviews({ EquipmentIds: id }),
    {
      manual: true,
      onSuccess: (res) => {
        setPreviewImg(res?.[0].previewImg ?? "");
      },
      onError: () => {
        setPreviewImg("");

        message.error("获取设备画面失败");
      },
    }
  );

  useUpdateEffect(() => {
    setWeChatGroupList(editDetailData?.settingWechatWebhooks ?? []);
  }, [editDetailData?.settingWechatWebhooks]);

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
    settingWechatWebhooks,
    updateWeChatGroupDto,
    handleAddWeChatGroup,
    handleDeleteWeChatGroup,
    updateEnterpriseWeChatGroup,
  };
};
