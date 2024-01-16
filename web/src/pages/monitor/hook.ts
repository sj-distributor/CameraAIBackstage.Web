import { clone } from "ramda";
import { useState } from "react";

import { IMonitorDataType } from "./props";

export const useAction = () => {
  const [data, setData] = useState<IMonitorDataType[]>([
    {
      title: "1",
      condition: true,
      warningType: "123",
      notificationObject: "1231",
      operate: "",
    },
    {
      title: "2",
      condition: false,
      warningType: "123323",
      notificationObject: "23232",
      operate: "",
    },
  ]);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const onChangeStatus = (index: number, value: boolean) => {
    const newList = clone(data);

    newList[index].condition = value;
    setData(newList);
  };

  return {
    data,
    setData,
    isDeleteOpen,
    setIsDeleteOpen,
    isDeleteIndex,
    setIsDeleteIndex,
    onChangeStatus,
    isUnbindOpen,
    setIsUnbindOpen,
  };
};
