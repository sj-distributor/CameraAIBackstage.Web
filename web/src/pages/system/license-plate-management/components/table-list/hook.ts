import { useDebounce, useRequest } from "ahooks";
import { message, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { RangeValue } from "rc-picker/lib/interface.d";
import { useEffect, useState } from "react";

import {
  GetRegisteredVehicleList,
  GetVehicleMonitorRecords,
  PostRegisteringVehicles,
} from "@/services/api/license-plate-management";
import {
  CameraAiMonitorRecordStatus,
  IGetRegisteredVehicleListRequest,
  IGetRegisteredVehicleListResponse,
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
  IPostRegisteringCarRequest,
} from "@/services/dtos/license-plate-management";

import { IDeviceDataType } from "../../props";
import { ILicensePlateManagementTableProps } from "./props";

dayjs.extend(utc);

export const useAction = (props: ILicensePlateManagementTableProps) => {
  const { isRegisteredVehicle } = props;

  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isShowLicensePlateOpen, setIsShowLicensePlateOpen] =
    useState<boolean>(false);

  const [licensePlateImageUrl, setLicensePlateImageUrl] = useState<string>("");

  const source = { ns: "licensePlateManagement" };

  const [registerCarNumber, setRegisterCarNumber] = useState<string>("");

  const [vehicleMonitorRecordsRequest, setVehicleMonitorRecordsRequest] =
    useState<IGetVehicleMonitorRecordsRequest>({ PageIndex: 1, PageSize: 20 });

  const [registeredVehicleRequest, setRegisteredVehicleRequest] =
    useState<IGetRegisteredVehicleListRequest>({ PageIndex: 1, PageSize: 20 });

  const [registeringCarRequest, setRegisteringCarRequest] =
    useState<IPostRegisteringCarRequest>({
      recordId: "",
      recordStatus: CameraAiMonitorRecordStatus.Unmarked,
    });

  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState<boolean>(false);

  const [vehicleMonitorRecordsData, setVehicleMonitorRecordsData] =
    useState<IGetVehicleMonitorRecordsResponse>({
      count: 0,
      records: [],
    });

  const [registeredVehicleData, setRegisteredVehicleData] =
    useState<IGetRegisteredVehicleListResponse>({
      count: 0,
      registers: [],
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

  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>();

  const [plateNumberKeyword, setPlateNumberKeyword] = useState<string>("");

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "最近一週", value: [dayjs().subtract(7, "d"), dayjs()] },
    {
      label: "最近一個月",
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    { label: "最近三個月", value: [dayjs().subtract(3, "month"), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);

      const startTime = dates[0]
        ? dates[0].utc().format("YYYY-MM-DDTHH:mm:ss")
        : undefined;

      const endTime = dates[1]
        ? dates[1].utc().format("YYYY-MM-DDTHH:mm:ss")
        : undefined;

      isRegisteredVehicle
        ? setRegisteredVehicleRequest((prev) => ({
            ...prev,
            StartTime: startTime,
            EndTime: endTime,
          }))
        : setVehicleMonitorRecordsRequest((prev) => ({
            ...prev,
            StartTime: startTime,
            EndTime: endTime,
          }));
    } else {
      isRegisteredVehicle
        ? setRegisteredVehicleRequest((prev) => ({
            ...prev,
            StartTime: undefined,
            EndTime: undefined,
          }))
        : setVehicleMonitorRecordsRequest((prev) => ({
            ...prev,
            StartTime: undefined,
            EndTime: undefined,
          }));

      setDateRange(undefined);
    }
  };

  const handelSetPlateNumberKeyword = (key: string) => {
    isRegisteredVehicle
      ? setRegisteredVehicleRequest((prev) => ({
          ...prev,
          PlateNumber: key,
        }))
      : setVehicleMonitorRecordsRequest((prev) => ({
          ...prev,
          PlateNumber: key,
        }));
  };

  const filterKeyword = useDebounce(plateNumberKeyword, { wait: 500 });

  const {
    run: handelGetRegisteredVehicleList,
    loading: isGetRegisteredVehicleList,
  } = useRequest(GetRegisteredVehicleList, {
    manual: true,
    onSuccess: (res) => {
      res && setRegisteredVehicleData(res);
    },
    onError(error) {
      message.error(error.message);
      setRegisteredVehicleData({ count: 0, registers: [] });
    },
  });

  const { run: handelGetVehicleMonitorRecords, loading: isGetMonitorRecords } =
    useRequest(GetVehicleMonitorRecords, {
      manual: true,
      onSuccess: (res) => {
        res && setVehicleMonitorRecordsData(res);
      },
      onError(error) {
        message.error((error as unknown as { code: number; msg: string }).msg);
        setVehicleMonitorRecordsData({ count: 0, records: [] });
      },
    });

  const { run: handelRegisteringCar, loading: isRegisteringCar } = useRequest(
    PostRegisteringVehicles,
    {
      manual: true,
      onSuccess: () => {
        message.success("車輛登記成功");
      },
      onError(error) {
        message.error((error as unknown as { code: number; msg: string }).msg);
      },
    }
  );

  useEffect(() => {
    !isRegisteredVehicle &&
      handelGetVehicleMonitorRecords(vehicleMonitorRecordsRequest);
  }, [vehicleMonitorRecordsRequest, isRegisteredVehicle]);

  useEffect(() => {
    isRegisteredVehicle &&
      handelGetRegisteredVehicleList(registeredVehicleRequest);
  }, [registeredVehicleRequest, isRegisteredVehicle]);

  useEffect(() => {
    isRegisteredVehicle
      ? setVehicleMonitorRecordsRequest({ PageIndex: 1, PageSize: 20 })
      : setRegisteredVehicleRequest({ PageIndex: 1, PageSize: 20 });
    setDateRange(undefined);
  }, [isRegisteredVehicle]);

  useEffect(() => {
    handelSetPlateNumberKeyword(filterKeyword);
  }, [filterKeyword]);

  return {
    plateNumberKeyword,
    isUnbindOpen,
    isShowLicensePlateOpen,
    isRegisterOpen,
    isAddDeviceOpen,
    vehicleMonitorRecordsData,
    source,
    isGetMonitorRecords,
    dateRange,
    rangePresets,
    licensePlateImageUrl,
    registeredVehicleData,
    isGetRegisteredVehicleList,
    registeredVehicleRequest,
    vehicleMonitorRecordsRequest,
    registerCarNumber,
    isRegisteringCar,
    registeringCarRequest,
    setLicensePlateImageUrl,
    onRangeChange,
    setVehicleMonitorRecordsRequest,
    setRegisteredVehicleRequest,
    setPlateNumberKeyword,
    setIsUnbindOpen,
    setIsShowLicensePlateOpen,
    setIsRegisterOpen,
    setIsAddDeviceOpen,
    setRegisterCarNumber,
    setRegisteringCarRequest,
    handelRegisteringCar,
  };
};
