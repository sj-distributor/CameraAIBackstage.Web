import { useUpdateEffect } from "ahooks";
import { Form } from "antd";
import { Dayjs } from "dayjs";
import { clone } from "ramda";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import KEYS from "../../../../i18n/language/keys/monitor-configuration-keys";
import {
  ICronListDto,
  IOptionsNumberDto,
  IOptionsStringDto,
  ISelectUserDto,
  TimeType,
} from "./props";

export const useAction = () => {
  const { t } = useAuth();

  const source = { ns: "monitorConfiguration" };

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const location = useLocation();

  const { type } = location.state;

  const [cronList, setCronList] = useState<ICronListDto[]>([
    { title: KEYS.MONDAY, value: false },
    { title: KEYS.THURSDAY, value: false },
    { title: KEYS.WEDNESDAY, value: false },
    { title: KEYS.THURSDAY, value: false },
    { title: KEYS.FRIDAY, value: false },
    { title: KEYS.SATURDAY, value: false },
    { title: KEYS.SUNDAY, value: false },
  ]);

  const selectWeekday = useMemo(() => {
    return cronList.filter((x) => x.value);
  }, [cronList]);

  const [userList, setUserList] = useState<IOptionsStringDto[]>([
    { label: "Ted.F", value: "Ted.F" },
    { label: "Ivan.W", value: "Ivan.W" },
    { label: "Winnie.X", value: "Winnie.X" },
    { label: "Koki.K", value: "Koki.K" },
  ]);

  const [exceptionTypeList, setExceptionTypeList] = useState<
    IOptionsNumberDto[]
  >([
    { label: "識別人員", value: 1 },
    { label: "識別車輛", value: 2 },
  ]);

  const [selectExceptionId, setSelectExceptionId] = useState<number | null>(
    null
  );

  const [deviceList, setDeviceList] = useState<IOptionsNumberDto[]>([
    { label: "設備 1", value: 1 },
    { label: "設備 2", value: 2 },
  ]);

  const [selectDeviceId, setSelectDeviceId] = useState<number | null>(null);

  const [timeSetting, setTimeSetting] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const [duration, setDuration] = useState<string>("");

  const [durationTimeType, setDurationTimeType] = useState<TimeType | null>(
    null
  );

  const [selectUserList, setSelectUserList] = useState<ISelectUserDto[]>([]);

  const onDeleteNoticeUserItem = (index: number) => {
    const newSelectUserList = clone(selectUserList);

    newSelectUserList.splice(index, 1);
    setSelectUserList(newSelectUserList);
  };

  const onChangeNoticeUserList = (value: string[]) => {
    const newSelectList = clone(selectUserList);

    newSelectList.forEach((user, index) => {
      if (!value.includes(user.name)) {
        newSelectList.splice(index, 1);
      }
    });

    value.forEach((item) => {
      if (!newSelectList.some((user) => user.name === item)) {
        newSelectList.push({
          name: item,
          notificationTool: [],
        });
      }
    });

    setSelectUserList(newSelectList);
  };

  const onSubmit = () => {
    navigate("/monitor");
  };

  useUpdateEffect(() => {
    form.setFieldValue("repeatEveryWeek", selectWeekday);
    form.validateFields(["repeatEveryWeek"]);
  }, [form, selectWeekday]);

  return {
    cronList,
    setCronList,
    userList,
    setUserList,
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
    selectWeekday,
    exceptionTypeList,
    setExceptionTypeList,
    selectExceptionId,
    setSelectExceptionId,
    deviceList,
    setDeviceList,
    selectDeviceId,
    setSelectDeviceId,
    timeSetting,
    setTimeSetting,
    form,
    type,
    KEYS,
    t,
    source,
  };
};
