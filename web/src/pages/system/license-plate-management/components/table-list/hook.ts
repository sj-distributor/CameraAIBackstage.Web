import { useState } from "react";

import { IDataType, IDeviceDataType } from "../../props";

export const useAction = () => {
  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isShowLicensePlateOpen, setIsShowLicensePlateOpen] =
    useState<boolean>(false);

  const source = { ns: "licensePlateManagement" };

  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState<boolean>(false);

  const [isUnbindIndex, setIsUnbindIndex] = useState<number>(0);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [data, setData] = useState<IDataType[]>([
    {
      deviceId: "1",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: false,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "2",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: false,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "3",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: false,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "4",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "5",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "6",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "7",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "8",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "9",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "10",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
    {
      deviceId: "11",
      isOnline: false,
      deviceType: "",
      equipmentName: "",
      whetherToBind: true,
      operate: "2023-09-26  12:30",
    },
  ]);

  const [deviceData, setDeviceData] = useState<IDeviceDataType[]>([
    {
      radio: true,
      areaId: "1",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "2",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "3",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "4",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "5",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "6",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "7",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "8",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "9",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "10",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "11",
      areaName: "",
      areaAddress: "",
      person: "",
    },
    {
      radio: true,
      areaId: "12",
      areaName: "",
      areaAddress: "",
      person: "",
    },
  ]);

  return {
    isUnbindOpen,
    setIsUnbindOpen,
    isShowLicensePlateOpen,
    setIsShowLicensePlateOpen,
    isRegisterOpen,
    setIsRegisterOpen,
    isAddDeviceOpen,
    setIsAddDeviceOpen,
    isUnbindIndex,
    setIsUnbindIndex,
    isDeleteIndex,
    setIsDeleteIndex,
    data,
    setData,
    deviceData,
    setDeviceData,
    source,
  };
};
