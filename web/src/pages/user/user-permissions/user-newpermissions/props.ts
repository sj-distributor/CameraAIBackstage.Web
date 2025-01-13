import KEYS from "@/i18n/language/keys/user-permissions-keys";

export enum FrontRolePermissionEnum {
  CanViewCameraAiHomePage = "CanViewCameraAiHomePage",
  CanSwitchCameraAiBackEnd = "CanSwitchCameraAiBackEnd",
  CanViewCameraAiLiveMonitorPage = "CanViewCameraAiLiveMonitorPage",
  CanExportCameraAiRealtimeVideo = "CanExportCameraAiRealtimeVideo",
  CanViewCameraAiVideoPlaybackPage = "CanViewCameraAiVideoPlaybackPage",
  CanExportCameraAiPlaybackVideo = "CanExportCameraAiPlaybackVideo",
  CanViewCameraAiWarningListPage = "CanViewCameraAiWarningListPage",
  CanExportExcelCameraAiWarning = "CanExportExcelCameraAiWarning",
  CanViewDetailCameraAiWarning = "CanViewDetailCameraAiWarning",
  CanMarkCameraAiWarning = "CanMarkCameraAiWarning",
  CanViewCameraAiFeedbackListPage = "CanViewCameraAiFeedbackListPage",
  CanExportExcelCameraAiFeedback = "CanExportExcelCameraAiFeedback",
  CanViewDetailCameraAiFeedback = "CanViewDetailCameraAiFeedback",
  CanCreateCameraAiTeam = "CanCreateCameraAiTeam",
}

export const frontRolePermission = {
  [FrontRolePermissionEnum.CanViewCameraAiHomePage]: KEYS.DASHBOARD,
  [FrontRolePermissionEnum.CanSwitchCameraAiBackEnd]: KEYS.SWITCH_BACKGROUND,
  [FrontRolePermissionEnum.CanCreateCameraAiTeam]: KEYS.CREATE_TEAM,
  [FrontRolePermissionEnum.CanViewCameraAiLiveMonitorPage]:
    KEYS.REAL_TIME_MONITORING,
  [FrontRolePermissionEnum.CanExportCameraAiRealtimeVideo]: KEYS.EXPORT,
  [FrontRolePermissionEnum.CanViewCameraAiVideoPlaybackPage]:
    KEYS.VIDEO_PLAYBACK,
  [FrontRolePermissionEnum.CanExportCameraAiPlaybackVideo]: KEYS.EXPORT,
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
  CanViewDetailCameraAiUsers = "CanViewDetailCameraAiUsers",
  CanUpdateCameraAiUserAccount = "CanUpdateCameraAiUserAccount",
  CanDeleteCameraAiUserAccount = "CanDeleteCameraAiUserAccount",
  CanViewCameraAiRoleUserPage = "CanViewCameraAiRoleUserPage",
  CanGrantPermissionsIntoRole = "CanGrantPermissionsIntoRole",
  CanCreateRoleUser = "CanCreateRoleUser",
  CanUpdatePermissionsOfRole = "CanUpdatePermissionsOfRole",
  CanDeleteRoles = "CanDeleteRoles",
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
  CanViewCameraAiTeam = "CanViewCameraAiTeam",
  CanEditTeamInfo = "CanEditTeamInfo", // 要跟接口確定後改
}

export const backGroundRolePermission = {
  // 用戶列表
  [BackGroundRolePermissionEnum.CanViewCameraAiUserAccountPage]: KEYS.ROLE_LIST,
  [BackGroundRolePermissionEnum.CanAddCameraAiUserAccount]: KEYS.ADD_USER,
  [BackGroundRolePermissionEnum.CanBatchDeleteCameraAiUserAccount]:
    KEYS.DELETE_USERS_IN_BATCHES,
  [BackGroundRolePermissionEnum.CanEnableCameraAiUserAccount]: KEYS.ENABLE,
  [BackGroundRolePermissionEnum.CanDisableCameraAiUserAccount]: KEYS.DISABLE,
  [BackGroundRolePermissionEnum.CanViewDetailCameraAiUsers]: KEYS.DETAILS,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount]: KEYS.REMOVE,
  // 角色權限
  [BackGroundRolePermissionEnum.CanViewCameraAiRoleUserPage]:
    KEYS.ROLE_PERMISSION,
  [BackGroundRolePermissionEnum.CanGrantPermissionsIntoRole]: KEYS.ADD_ROLE,
  [BackGroundRolePermissionEnum.CanCreateRoleUser]: KEYS.ALLOT,
  [BackGroundRolePermissionEnum.CanUpdatePermissionsOfRole]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteRoles]: KEYS.DELETE,
  // 團隊信息
  [BackGroundRolePermissionEnum.CanViewCameraAiTeam]: KEYS.TEAM_INFO,
  [BackGroundRolePermissionEnum.CanEditTeamInfo]: KEYS.LOGO_NAME,
  // 設備列表
  [BackGroundRolePermissionEnum.CanViewCameraAiEquipmentPage]: KEYS.DEVICE_LIST,
  [BackGroundRolePermissionEnum.CanAddCameraAiEquipment]: KEYS.ADD_DEVICE,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiEquipment]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanBindCameraAiEquipment]: KEYS.BINGDING,
  [BackGroundRolePermissionEnum.CanUnBindCameraAiEquipment]:
    KEYS.REMOVE_BINDING,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiEquipment]: KEYS.DELETE,
  // 設備類型
  [BackGroundRolePermissionEnum.CanViewCameraAiEquipmentTypePage]:
    KEYS.DEVICE_TYPE,
  [BackGroundRolePermissionEnum.CanAddCameraAiEquipmentType]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiEquipmentType]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiEquipmentType]: KEYS.DELETE,
  // 監測管理
  [BackGroundRolePermissionEnum.CanViewCameraAiMonitorManagementPage]:
    KEYS.MONITORING_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanAddCameraAiMonitor]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanEnableCameraAiMonitor]: KEYS.ENABLE,
  [BackGroundRolePermissionEnum.CanDisableCameraAiMonitor]: KEYS.CLOSURE,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiMonitor]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiMonitor]: KEYS.DELETE,
  // 人像列表
  [BackGroundRolePermissionEnum.CanViewCameraAiPortraitManagementPage]:
    KEYS.LIST_OF_PORTRAITS,
  [BackGroundRolePermissionEnum.CanAddCameraAiPortrait]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiPortrait]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiPortrait]: KEYS.DELETE,
  // 車牌管理
  [BackGroundRolePermissionEnum.CanViewCameraAiLicensePlateManagementPage]:
    KEYS.LICENCE_PLATE_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanViewRegisteredCameraAiLicensePlate]:
    KEYS.REGISTERED_VEHICLE,
  [BackGroundRolePermissionEnum.CanRegisterCameraAiLicensePlate]: KEYS.REGISTER,
  [BackGroundRolePermissionEnum.CanViewDetailCameraAiLicensePlate]:
    KEYS.DETAILS,
  // 區域管理
  [BackGroundRolePermissionEnum.CanViewCameraAiAreaManagementPage]:
    KEYS.DISTRICT_MANAGEMENT,
  [BackGroundRolePermissionEnum.CanAddCameraAiArea]: KEYS.ADD,
  [BackGroundRolePermissionEnum.CanUpdateCameraAiArea]: KEYS.EDIT,
  [BackGroundRolePermissionEnum.CanDeleteCameraAiArea]: KEYS.DELETE,
};
