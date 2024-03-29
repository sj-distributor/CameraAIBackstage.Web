import { useDebounce, useRequest } from "ahooks";
import { message, TimeRangePickerProps } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { RangeValue } from "rc-picker/lib/interface.d";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";
import {
  GetRegisteredVehicleList,
  GetVehicleMonitorRecords,
  PostDeleteRegisterCar,
  PostEditRegisterCar,
  PostRegisteringVehicles,
} from "@/services/api/license-plate-management";
import {
  CameraAiMonitorRecordStatus,
  CameraAiMonitorType,
  IGetRegisteredVehicleListRequest,
  IGetRegisteredVehicleListResponse,
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
  IPostEditRegisterCarRequest,
  IPostRegisteringCarRequest,
  IRegisteredVehicleListItem,
} from "@/services/dtos/license-plate-management";

import { ConfirmData, ILicensePlateManagementTableProps } from "./props";

dayjs.extend(utc);

export const useAction = (props: ILicensePlateManagementTableProps) => {
  const { isRegisteredVehicle } = props;

  const { t, language } = useAuth();

  const [registerForm] = useForm();

  const [confirmData, setConfirmData] = useState<ConfirmData>(
    ConfirmData.DeleteRegisterCar
  );

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);

  const [isShowLicensePlateOpen, setIsShowLicensePlateOpen] =
    useState<boolean>(false);

  const [licensePlateImageUrl, setLicensePlateImageUrl] = useState<string>("");

  const source = { ns: "licensePlateManagement" };

  const [registerCarNumber, setRegisterCarNumber] = useState<string>("");

  const [vehicleMonitorRecordsRequest, setVehicleMonitorRecordsRequest] =
    useState<IGetVehicleMonitorRecordsRequest>({ PageIndex: 1, PageSize: 20 });

  const [registeredVehicleRequest, setRegisteredVehicleRequest] =
    useState<IGetRegisteredVehicleListRequest>({ PageIndex: 1, PageSize: 20 });

  const [registeringCarRequest, setRegisteringCarRequest] = useState<
    IPostRegisteringCarRequest | IRegisteredVehicleListItem
  >({
    recordId: "",
    recordStatus: undefined,
    exceptionReason: undefined,
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

  const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>();

  const [plateNumberKeyword, setPlateNumberKeyword] = useState<string>("");

  const [isEditKeyword, setEditKeyword] = useState<boolean>(false);

  const [deleteRegisterCarId, setDeleteRegisterCarId] = useState<string>("");

  const rangePresets: TimeRangePickerProps["presets"] = [
    {
      label: t(KEYS.LAST_WEEK, source),
      value: [dayjs().subtract(7, "d"), dayjs()],
    },
    {
      label: t(KEYS.LAST_MONTH, source),
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    {
      label: t(KEYS.LAST_THREE_MONTHS, source),
      value: [dayjs().subtract(3, "month"), dayjs()],
    },
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
    if (isRegisteredVehicle) {
      setRegisteredVehicleRequest((prev) => ({
        ...prev,
        PlateNumber: key ? key : undefined,
      }));
      handelGetRegisteredVehicleList({
        ...registeredVehicleRequest,
        PlateNumber: key,
      });
    } else {
      setVehicleMonitorRecordsRequest((prev) => ({
        ...prev,
        PlateNumber: key ? key : undefined,
      }));
      handelGetVehicleMonitorRecords({
        ...vehicleMonitorRecordsRequest,
        PlateNumber: key,
      });
    }
  };

  const handelRegisterOrEditCar = () => {
    registerForm
      .validateFields()
      .then(() => {
        if (isRegisteredVehicle) {
          const {
            id,
            type,
            faceName,
            plateNumber,
            registeredRecordStatus,
            createdTime,
          } = registeringCarRequest as IRegisteredVehicleListItem;

          const data: IPostEditRegisterCarRequest = {
            recordRegister: {
              id,
              type,
              faceName,
              plateNumber,
              registeredRecordStatus,
              createdTime,
            },
          };

          handelEditRegisterCar(data);
        } else {
          const { recordId, recordStatus } =
            registeringCarRequest as IPostRegisteringCarRequest;

          const data: IPostRegisteringCarRequest = {
            recordId,
            recordStatus,
          };

          handelRegisteringCar(data);
        }
      })
      .catch(() => {});
  };

  const handelConfirmOperate = () => {
    switch (confirmData) {
      case ConfirmData.DeleteRegisterCar:
        deleteRegisterCarId && handelDeleteRegisterCar(deleteRegisterCarId);
        break;
      case ConfirmData.EditRegisterCar:
        handelRegisterOrEditCar();
        break;
      default:
        break;
    }
  };

  const filterKeyword = useDebounce(plateNumberKeyword, { wait: 500 });

  // 已登記list
  const {
    run: handelGetRegisteredVehicleList,
    loading: isGetRegisteredVehicleList,
  } = useRequest(GetRegisteredVehicleList, {
    manual: true,
    onSuccess: (res) => {
      res && setRegisteredVehicleData(res);
    },
    onError(error) {
      message.error((error as unknown as { code: number; msg: string }).msg);
      setRegisteredVehicleData({ count: 0, registers: [] });
    },
  });

  // 車牌紀錄list
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

  // 登記車牌
  const { run: handelRegisteringCar, loading: isRegisteringCar } = useRequest(
    PostRegisteringVehicles,
    {
      manual: true,
      onSuccess: () => {
        message.success(t(KEYS.REGISTERING_CAR_OK, source));
        handelGetVehicleMonitorRecords(vehicleMonitorRecordsRequest);
        setIsRegisterOpen(false);
      },
      onError(error) {
        message.error((error as unknown as { code: number; msg: string }).msg);
      },
    }
  );

  // 編輯已登記車牌
  const { run: handelEditRegisterCar, loading: isEditRegisterCar } = useRequest(
    PostEditRegisterCar,
    {
      manual: true,
      onSuccess: () => {
        message.success(t(KEYS.REGISTERING_CAR_OK, source));
        setIsRegisterOpen(false);
      },
      onError(error) {
        message.error((error as unknown as { code: number; msg: string }).msg);
      },
    }
  );

  const { run: handelDeleteRegisterCar, loading: isDeleteRegisterCar } =
    useRequest(PostDeleteRegisterCar, {
      manual: true,
      onSuccess: () => {
        message.success("刪除成功");
        setIsOpenConfirmModal(false);
        handelGetRegisteredVehicleList(registeredVehicleRequest);
      },
      onError(error) {
        message.error((error as unknown as { code: number; msg: string }).msg);
      },
    });

  useEffect(() => {
    !isRegisteredVehicle &&
      handelGetVehicleMonitorRecords(vehicleMonitorRecordsRequest);
  }, [
    vehicleMonitorRecordsRequest.EndTime,
    vehicleMonitorRecordsRequest.StartTime,
    vehicleMonitorRecordsRequest.EquipmentCodes,
    vehicleMonitorRecordsRequest.EquipmentName,
    vehicleMonitorRecordsRequest.monitorType,
    vehicleMonitorRecordsRequest.PageIndex,
    vehicleMonitorRecordsRequest.PageSize,
    vehicleMonitorRecordsRequest.Status,
    isRegisteredVehicle,
  ]);

  useEffect(() => {
    isRegisteredVehicle &&
      handelGetRegisteredVehicleList(registeredVehicleRequest);
  }, [
    registeredVehicleRequest.EndTime,
    registeredVehicleRequest.StartTime,
    registeredVehicleRequest.PageIndex,
    registeredVehicleRequest.PageSize,
    registeredVehicleRequest.RegisterType,
    registeredVehicleRequest.Status,
    isRegisteredVehicle,
  ]);

  useEffect(() => {
    isRegisteredVehicle
      ? setVehicleMonitorRecordsRequest({ PageIndex: 1, PageSize: 20 })
      : setRegisteredVehicleRequest({ PageIndex: 1, PageSize: 20 });
    setDateRange(undefined);
  }, [isRegisteredVehicle]);

  useEffect(() => {
    isEditKeyword && handelSetPlateNumberKeyword(filterKeyword);
  }, [filterKeyword]);

  useEffect(() => {
    setEditKeyword(true);
  }, []);

  return {
    t,
    registerForm,
    language,
    plateNumberKeyword,
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
    isOpenConfirmModal,
    confirmData,
    isEditRegisterCar,
    isDeleteRegisterCar,
    setDeleteRegisterCarId,
    setConfirmData,
    setLicensePlateImageUrl,
    onRangeChange,
    setVehicleMonitorRecordsRequest,
    setRegisteredVehicleRequest,
    setPlateNumberKeyword,
    setIsOpenConfirmModal,
    setIsShowLicensePlateOpen,
    setIsRegisterOpen,
    setIsAddDeviceOpen,
    setRegisterCarNumber,
    setRegisteringCarRequest,
    handelRegisteringCar,
    handelConfirmOperate,
    handelRegisterOrEditCar,
  };
};
