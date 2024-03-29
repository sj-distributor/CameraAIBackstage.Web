import KEYS from "@/i18n/language/keys/user-permissions-keys";

export enum FrontRolePermissionEnum {
  CanViewCameraAiHomePage = "CanViewCameraAiHomePage",
  CanSwitchCameraAiBackEnd = "CanSwitchCameraAiBackEnd",
  CanViewCameraAiLiveMonitorPage = "CanViewCameraAiLiveMonitorPage",
  CanExportExcelCameraAiLiveMonitor = "CanExportExcelCameraAiLiveMonitor", // mock字段未出
  CanViewCameraAiVideoPlaybackPage = "CanViewCameraAiVideoPlaybackPage",
  CanExportVideoCameraAi = "CanExportVideoCameraAi",
  CanViewCameraAiWarningListPage = "CanViewCameraAiWarningListPage",
  CanExportExcelCameraAiWarning = "CanExportExcelCameraAiWarning",
  CanViewDetailCameraAiWarning = "CanViewDetailCameraAiWarning",
  CanMarkCameraAiWarning = "CanMarkCameraAiWarning",
  CanViewCameraAiFeedbackListPage = "CanViewCameraAiFeedbackListPage",
  CanExportExcelCameraAiFeedback = "CanExportExcelCameraAiFeedback",
  CanViewDetailCameraAiFeedback = "CanViewDetailCameraAiFeedback",
}

export const frontRolePermission = {
  [FrontRolePermissionEnum.CanViewCameraAiHomePage]: KEYS.DASHBOARD,
  [FrontRolePermissionEnum.CanSwitchCameraAiBackEnd]: KEYS.SWITCH_BACKGROUND,
  [FrontRolePermissionEnum.CanViewCameraAiLiveMonitorPage]:
    KEYS.REAL_TIME_MONITORING,
  [FrontRolePermissionEnum.CanExportExcelCameraAiLiveMonitor]: KEYS.EXPORT, // mock字段未出
  [FrontRolePermissionEnum.CanViewCameraAiVideoPlaybackPage]:
    KEYS.VIDEO_PLAYBACK,
  [FrontRolePermissionEnum.CanExportVideoCameraAi]: KEYS.EXPORT,
  [FrontRolePermissionEnum.CanViewCameraAiWarningListPage]: KEYS.WARNING_LIST,
  [FrontRolePermissionEnum.CanExportExcelCameraAiWarning]: KEYS.EXPORT,
  [FrontRolePermissionEnum.CanViewDetailCameraAiWarning]: KEYS.VIEW_DETAILS,
  [FrontRolePermissionEnum.CanMarkCameraAiWarning]: KEYS.LABELED,
  [FrontRolePermissionEnum.CanViewCameraAiFeedbackListPage]: KEYS.FEEDBACK_LIST,
  [FrontRolePermissionEnum.CanExportExcelCameraAiFeedback]: KEYS.EXPORT,
  [FrontRolePermissionEnum.CanViewDetailCameraAiFeedback]: KEYS.VIEW_DETAILS,
};

export enum BackGroundRolePermissionEnum {
  CanViewCameraAiUserAccountPage = "CanViewCameraAiUserAccountPage",
  CanAddCameraAiUserAccount = "CanAddCameraAiUserAccount",
  CanBatchDeleteCameraAiUserAccount = "CanBatchDeleteCameraAiUserAccount",
  CanEnableCameraAiUserAccount = "CanEnableCameraAiUserAccount",
  CanDisableCameraAiUserAccount = "CanDisableCameraAiUserAccount",
  CanUpdateCameraAiUserAccount = "CanUpdateCameraAiUserAccount",
  CanDeleteCameraAiUserAccount = "CanDeleteCameraAiUserAccount",
  CanViewCameraAiRoleUserPage = "CanViewCameraAiRoleUserPage",
  CanAddCameraAiRole = "CanAddCameraAiRole",
  CanGrantCameraAiRole = "CanGrantCameraAiRole",
  CanUpdateCameraAiRole = "CanUpdateCameraAiRole",
  CanDeleteCameraAiRole = "CanDeleteCameraAiRole",
  CanViewCameraAiEquipmentPage = "CanViewCameraAiEquipmentPage",
  CanAddCameraAiEquipment = "CanAddCameraAiEquipment",
  CanUpdateCameraAiEquipment = "CanUpdateCameraAiEquipment",
  CanBindCameraAiEquipment = "CanBindCameraAiEquipment",
  CanUnBindCameraAiEquipment = "CanUnBindCameraAiEquipment",
  CanDeleteCameraAiEquipment = "CanDeleteCameraAiEquipment",
  CanViewCameraAiEquipmentTypePage = "CanViewCameraAiEquipmentTypePage",
  CanAddCameraAiEquipmentType = "CanAddCameraAiEquipmentType",
  CanUpdateCameraAiEquipmentType = "CanUpdateCameraAiEquipmentType",
  CanDeleteCameraAiEquipmentType = "CanDeleteCameraAiEquipmentType",
  CanViewCameraAiMonitorManagementPage = "CanViewCameraAiMonitorManagementPage",
  CanAddCameraAiMonitor = "CanAddCameraAiMonitor",
  CanEnableCameraAiMonitor = "CanEnableCameraAiMonitor",
  CanDisableCameraAiMonitor = "CanDisableCameraAiMonitor",
  CanUpdateCameraAiMonitor = "CanUpdateCameraAiMonitor",
  CanDeleteCameraAiMonitor = "CanDeleteCameraAiMonitor",
  CanViewCameraAiPortraitManagementPage = "CanViewCameraAiPortraitManagementPage",
  CanAddCameraAiPortrait = "CanAddCameraAiPortrait",
  CanUpdateCameraAiPortrait = "CanUpdateCameraAiPortrait",
  CanDeleteCameraAiPortrait = "CanDeleteCameraAiPortrait",
  CanViewCameraAiLicensePlateManagementPage = "CanViewCameraAiLicensePlateManagementPage",
  CanViewRegisteredCameraAiLicensePlate = "CanViewRegisteredCameraAiLicensePlate",
  CanRegisterCameraAiLicensePlate = "CanRegisterCameraAiLicensePlate",
  CanViewDetailCameraAiLicensePlate = "CanViewDetailCameraAiLicensePlate",
  CanViewCameraAiAreaManagementPage = "CanViewCameraAiAreaManagementPage",
  CanAddCameraAiArea = "CanAddCameraAiArea",
  CanUpdateCameraAiArea = "CanUpdateCameraAiArea",
  CanDeleteCameraAiArea = "CanDeleteCameraAiArea",
}

export const backGroundRolePermission = {
  [BackGroundRolePermissionEnum.CanViewCameraAiUserAccountPage]: KEYS.ROLE_LIST,
  [BackGroundRolePermissionEnum.CanAddCameraAiUserAccount]: KEYS.ADD_USER,
  [BackGroundRolePermissionEnum.CanBatchDeleteCameraAiUserAccount]:
    KEYS.DELETE_USERS_IN_BATCHES,
  [BackGroundRolePermissionEnum.CanEnableCameraAiUserAccount]: KEYS.ENABLE,
  [BackGroundRolePermissionEnum.CanDisableCameraAiUserAccount]: KEYS.DISABLE,
  // [BackGroundRolePermissionEnum.CanUpdateCameraAiUserAccount]:
  //   KEYS.RESET_PASSWORDS, // 目前不显示
  [BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount]: KEYS.REMOVE,
  [BackGroundRolePermissionEnum.CanViewCameraAiRoleUserPage]:
    KEYS.ROLE_PERMISSION,
  [BackGroundRolePermissionEnum.CanAddCameraAiRole]: KEYS.ADD_ROLE,
  [BackGroundRolePermissionEnum.CanGrantCameraAiRole]: KEYS.ALLOT,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiRole]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiRole]: KEYS.DELETE,
  [BackGroundRolePermissionEnum.CanViewCameraAiEquipmentPage]: KEYS.DEVICE_LIST,
  [BackGroundRolePermissionEnum.CanAddCameraAiEquipment]: KEYS.ADD_DEVICE,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiEquipment]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanBindCameraAiEquipment]: KEYS.BINGDING,
  [BackGroundRolePermissionEnum.CanUnBindCameraAiEquipment]:
    KEYS.REMOVE_BINDING,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiEquipment]: KEYS.DELETE,
  [BackGroundRolePermissionEnum.CanViewCameraAiEquipmentTypePage]:
    KEYS.DEVICE_TYPE,
  [BackGroundRolePermissionEnum.CanAddCameraAiEquipmentType]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiEquipmentType]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiEquipmentType]: KEYS.DELETE,
  [BackGroundRolePermissionEnum.CanViewCameraAiMonitorManagementPage]:
    KEYS.MONITORING_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanAddCameraAiMonitor]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanEnableCameraAiMonitor]: KEYS.ENABLE,
  [BackGroundRolePermissionEnum.CanDisableCameraAiMonitor]: KEYS.CLOSURE,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiMonitor]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiMonitor]: KEYS.DELETE,
  [BackGroundRolePermissionEnum.CanViewCameraAiPortraitManagementPage]:
    KEYS.LIST_OF_PORTRAITS,
  [BackGroundRolePermissionEnum.CanAddCameraAiPortrait]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiPortrait]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiPortrait]: KEYS.DELETE,
  [BackGroundRolePermissionEnum.CanViewCameraAiLicensePlateManagementPage]:
    KEYS.LICENCE_PLATE_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanViewRegisteredCameraAiLicensePlate]:
    KEYS.REGISTERED_VEHICLE,
  [BackGroundRolePermissionEnum.CanRegisterCameraAiLicensePlate]: KEYS.REGISTER,
  [BackGroundRolePermissionEnum.CanViewDetailCameraAiLicensePlate]:
    KEYS.DETAILS,
  [BackGroundRolePermissionEnum.CanViewCameraAiAreaManagementPage]:
    KEYS.DISTRICT_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanAddCameraAiArea]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiArea]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiArea]: KEYS.DELETE,
};
