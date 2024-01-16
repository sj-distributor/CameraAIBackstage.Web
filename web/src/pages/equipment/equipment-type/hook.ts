import { useState } from "react";

import { IDeviceTypeDataType } from "./props";

export const useAction = () => {
  const [isAddTypeOpen, setIsAddTypeOpen] = useState<boolean>(false);

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [data, setData] = useState<IDeviceTypeDataType[]>([
    {
      deviceTypeId: "11232131",
      deviceType: " 攝像頭",
      deviceInformation: "用於人面識別和車輛識別",
      operate: "",
    },
  ]);

  return {
    isAddTypeOpen,
    setIsAddTypeOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isModifyOpen,
    setIsModifyOpen,
    isDeleteIndex,
    setIsDeleteIndex,
    data,
    setData,
  };
};
