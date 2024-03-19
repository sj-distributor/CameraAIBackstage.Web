import { useRequest } from "ahooks";
import { TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

import { GetVehicleMonitorRecords } from "@/services/api/license-plate-management";
import {
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
} from "@/services/dtos/license-plate-management";

import { IDeviceDataType } from "../../props";

dayjs.extend(utc);

export const useAction = () => {
  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isShowLicensePlateOpen, setIsShowLicensePlateOpen] =
    useState<boolean>(false);

  const [licensePlateImageUrl, setLicensePlateImageUrl] = useState<string>("");

  const source = { ns: "licensePlateManagement" };

  const [vehicleMonitorRecordsRequest, setVehicleMonitorRecordsRequest] =
    useState<IGetVehicleMonitorRecordsRequest>({ PageIndex: 1, PageSize: 20 });

  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState<boolean>(false);

  const [isUnbindIndex, setIsUnbindIndex] = useState<number>(0);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [vehicleMonitorRecordsData, setVehicleMonitorRecordsData] =
    useState<IGetVehicleMonitorRecordsResponse>({
      count: 0,
      records: [],
    });

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

  const [dateRange, setDateRange] = useState<(Dayjs | null)[]>([null, null]);

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "最近一週", value: [dayjs().subtract(7, "d"), dayjs()] },
    {
      label: "最近一個月",
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    { label: "最近三個月", value: [dayjs().subtract(3, "month"), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      setDateRange([dates[0], dates[1]]);
      setVehicleMonitorRecordsRequest((prev) => ({
        ...prev,
        StartTime: dates[0]
          ? dates[0].utc().format("YYYY-MM-DDTHH:mm:ss")
          : undefined,
        EndTime: dates[1]
          ? dates[1].utc().format("YYYY-MM-DDTHH:mm:ss")
          : undefined,
      }));
    } else {
      setVehicleMonitorRecordsRequest((prev) => ({
        ...prev,
        StartTime: undefined,
        EndTime: undefined,
      }));
      setDateRange([null, null]);
    }
  };

  const { run: handelGetVehicleMonitorRecords, loading: isGetMonitorRecords } =
    useRequest(GetVehicleMonitorRecords, {
      manual: true,
      onSuccess: (res) => {
        res && setVehicleMonitorRecordsData(res);
      },
      onError(error) {
        console.log(error);
      },
    });

  useEffect(() => {
    handelGetVehicleMonitorRecords(vehicleMonitorRecordsRequest);
  }, [vehicleMonitorRecordsRequest]);

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
    vehicleMonitorRecordsData,
    setVehicleMonitorRecordsData,
    deviceData,
    setDeviceData,
    source,
    isGetMonitorRecords,
    licensePlateImageUrl,
    setLicensePlateImageUrl,
    dateRange,
    rangePresets,
    onRangeChange,
    setVehicleMonitorRecordsRequest,
  };
};
