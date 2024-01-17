import { Dayjs } from "dayjs";
import { clone } from "ramda";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISelectUserDto, TimeType } from "./props";

export const useAction = () => {
  const navigate = useNavigate();

  const [cronList, setCronList] = useState([
    { title: "週一", value: false },
    { title: "週二", value: false },
    { title: "週三", value: false },
    { title: "週四", value: false },
    { title: "週五", value: false },
    { title: "週六", value: false },
    { title: "週日", value: false },
  ]);

  const selectWeekday = useMemo(() => {
    return cronList.filter((x) => x.value);
  }, [cronList]);

  const [userList, setUserList] = useState<{ label: string; value: string }[]>([
    { label: "Ted.F", value: "Ted.F" },
    { label: "Ivan.W", value: "Ivan.W" },
    { label: "Winnie.X", value: "Winnie.X" },
    { label: "Koki.K", value: "Koki.K" },
  ]);

  const [exceptionTypeList, setExceptionTypeList] = useState<
    { label: string; value: number }[]
  >([
    { label: "識別人員", value: 1 },
    { label: "識別車輛", value: 2 },
  ]);

  const [selectExceptionId, setSelectExceptionId] = useState<number | null>(
    null
  );

  const [deviceList, setDeviceList] = useState<
    { label: string; value: number }[]
  >([
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
  };
};
