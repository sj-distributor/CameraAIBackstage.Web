import { Dispatch, SetStateAction } from "react";

import { CameraAiMonitorRecordStatus } from "@/services/dtos/license-plate-management";

export interface ILicensePlateManagementTableProps {
  isRegisteredVehicle: boolean;
  setIsRegisteredVehicle: Dispatch<SetStateAction<boolean>>;
  setShowWarningDetails: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export interface ICameraAiMonitorRecordStatusOption {
  value: CameraAiMonitorRecordStatus;
  label: string;
}

export enum ConfirmData {
  DeleteRegisterCar,
  EditRegisterCar,
}
