import { Breadcrumb, Button, Checkbox, Col, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";

import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { useAction } from "./hook";
import {
  backGroundRolePermission,
  BackGroundRolePermissionEnum,
  frontRolePermission,
  FrontRolePermissionEnum,
} from "./props";

export const NewOrUpdatePermissions = () => {
  const {
    navigate,
    t,
    source,
    language,
    rolePermissionByRoleIdData,
    onChangeRoleData,
    findCheckboxIdValue,
    onCreateRole,
    onUpdateRole,
    isCreate,
    setRoleFrontPermissions,
    setRoleBackgroundPermissions,
    roleFrontPermissions,
    roleBackgroundPermissions,
  } = useAction();

  const { role } = rolePermissionByRoleIdData;

  const isEnglish = language === "en";

  const getFrontSpanValue = (key: string) => {
    switch (key) {
      case FrontRolePermissionEnum.CanCreateCameraAiTeam:
        return isEnglish ? 10 : 18;

      case FrontRolePermissionEnum.CanExportCameraAiRealtimeVideo:
      case FrontRolePermissionEnum.CanExportCameraAiPlaybackVideo:
        return isEnglish ? 19 : 20;

      case FrontRolePermissionEnum.CanViewCameraAiDoorDetection:
        return isEnglish ? 24 : 24;

      case FrontRolePermissionEnum.CanMarkCameraAiWarning:
        return isEnglish ? 9 : 13;
      default:
        return isEnglish ? 5 : 3;
    }
  };

  const getBackgroundSpanValue = (key: string) => {
    if (isEnglish) {
      switch (key) {
        case BackGroundRolePermissionEnum.CanViewCameraAiUserAccountPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiTeam:
        case BackGroundRolePermissionEnum.CanViewCameraAiLicensePlateManagementPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiPortraitManagementPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiMonitorManagementPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiEquipmentTypePage:
        case BackGroundRolePermissionEnum.CanViewCameraAiRoleUserPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiEquipmentPage:
        case BackGroundRolePermissionEnum.CanViewCameraAiAreaManagementPage:
        case BackGroundRolePermissionEnum.CanDeleteRoles:
          return 5;
        case BackGroundRolePermissionEnum.CanEnableCameraAiUserAccount:
        case BackGroundRolePermissionEnum.CanUpdatePermissionsOfRole:
        case BackGroundRolePermissionEnum.CanBindCameraAiEquipment:
        case BackGroundRolePermissionEnum.CanDisableCameraAiMonitor:
          return 3;
        case BackGroundRolePermissionEnum.CanDeleteCameraAiEquipmentType:
        case BackGroundRolePermissionEnum.CanDeleteCameraAiPortrait:
        case BackGroundRolePermissionEnum.CanViewDetailCameraAiLicensePlate:
        case BackGroundRolePermissionEnum.CanDeleteCameraAiArea:
          return 8;
        case BackGroundRolePermissionEnum.CanUpdateCameraAiTeam:
          return 18;
        case BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount:
          return 20;

        default:
          return 4;
      }
    } else {
      switch (key) {
        case BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount:
        case BackGroundRolePermissionEnum.CanBatchAddEquipments:
          return 4;
        case BackGroundRolePermissionEnum.CanDeleteCameraAiMonitor:
          return 8;
        case BackGroundRolePermissionEnum.CanDeleteRoles:
          return 12;

        case BackGroundRolePermissionEnum.CanUpdateCameraAiTeam:
          return 20;
        case BackGroundRolePermissionEnum.CanDeleteCameraAiPortrait:
        case BackGroundRolePermissionEnum.CanViewDetailCameraAiLicensePlate:
        case BackGroundRolePermissionEnum.CanDeleteCameraAiEquipmentType:
        case BackGroundRolePermissionEnum.CanDeleteCameraAiArea:
          return 15;
        default:
          return 3;
      }
    }
  };

  return (
    <div className="h-[20rem] bg-white rounded-b-md">
      <Breadcrumb
        items={[
          {
            title: (
              <div onClick={() => navigate("/user/permissions")}>
                {t(KEYS.ROLE_LIST, source)}
              </div>
            ),
          },
          {
            title: t(KEYS.ADD_ROLE, source),
          },
        ]}
        className="text-[1.125rem] font-semibold ml-[1.5rem] pt-[1.5rem] "
      />
      <div className="bg-white w-full h-[calc(100vh-13.5rem)] overflow-auto no-scrollbar">
        <div className="ml-[17rem] mt-[1rem]">
          <span className="font-medium">
            {t(KEYS.ROLE_INFORMATION, source)}
          </span>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[10.9rem] border-2 mt-[1rem]">
            <div
              className={`flex pt-[2rem] ${
                isEnglish ? "pl-[6.7rem]" : "pl-[5.3rem]"
              }`}
            >
              <div className="mt-[.1rem] mr-1 text-[#F04E4E] text-[1rem]">
                *
              </div>
              <div>{t(KEYS.ROLE_NAME, source)}</div>
              <Input
                value={role.name}
                placeholder={t(KEYS.PLEASE_ENTER, source)}
                className="h-[2rem] w-[48rem] ml-[.5625rem]"
                onChange={(e) => {
                  onChangeRoleData("role", e.target.value, "name");
                }}
              />
            </div>
            <div className="flex mb-[2rem] pl-[5.3rem] mt-[1.5rem]">
              <div className="mt-[.1rem] mr-1 text-[#F04E4E] text-[1rem]">
                *
              </div>
              <div>{t(KEYS.ROLE_DESCRIBE, source)}</div>
              <div className="max-h-[5rem]">
                <TextArea
                  value={role.description}
                  placeholder={t(KEYS.PLEASE_ENTER, source)}
                  className="h-[2.06rem] w-[48rem] ml-[.5625rem] overflow-auto max-h-[100%]"
                  onChange={(e) => {
                    onChangeRoleData("role", e.target.value, "description");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">
            {t(KEYS.FRONT_DESK_FUNCTION_PERMISSIONS, source)}
          </div>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[18.4rem] pr-[15.75rem] border-2 mt-[1rem] mb-[1rem]">
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[1rem]">
              <div className="flex justify-row mb-[1rem]">
                <span
                  className={`${
                    isEnglish ? "w-[14rem]" : "w-[8.5rem]"
                  } font-medium`}
                >
                  {t(KEYS.VISIBLE_PAGES, source)}
                </span>
                <span className="font-medium">
                  {t(KEYS.FUNCTION_PERMISSIONS, source)}
                </span>
              </div>
              <Checkbox.Group
                value={roleFrontPermissions}
                onChange={(checkedValue) =>
                  setRoleFrontPermissions(checkedValue)
                }
              >
                <Row gutter={[12, 12]}>
                  {Object.entries(frontRolePermission).map(
                    ([key, value], index) => {
                      return (
                        <Col span={getFrontSpanValue(key)} key={index}>
                          <Checkbox
                            // disabled={disabled(key)}
                            value={findCheckboxIdValue(key)}
                          >
                            {t(value, source)}
                          </Checkbox>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">
            {t(KEYS.BACKGROUND_FUNCTION_PERMISSIONS, source)}
          </div>
          <div
            className={`border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl pr-[15.75rem] border-2 my-[1rem] ${
              isEnglish ? "h-[27rem]" : "h-[26rem]"
            }`}
          >
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[2rem]">
              <div className="flex justify-row mb-[1.2rem]">
                <span
                  className={`${
                    isEnglish ? "w-[14rem]" : "w-[8.5rem]"
                  } font-medium`}
                >
                  {t(KEYS.VISIBLE_PAGES, source)}
                </span>
                <span className="font-medium">
                  {t(KEYS.FUNCTION_PERMISSIONS, source)}
                </span>
              </div>
              <Checkbox.Group
                value={roleBackgroundPermissions}
                onChange={(checkedValue) =>
                  setRoleBackgroundPermissions(checkedValue)
                }
              >
                <Row gutter={[12, 12]}>
                  {Object.entries(backGroundRolePermission).map(
                    ([key, value], index) => {
                      return (
                        <Col span={getBackgroundSpanValue(key)} key={index}>
                          <Checkbox
                            // disabled={disabled(key)}
                            value={findCheckboxIdValue(key)}
                          >
                            {t(value, source)}
                          </Checkbox>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Checkbox.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[6rem] bg-white flex justify-center pt-[1rem] shadow-[0_4px_25px_-0_rgba(68,68,71,0.15)]">
        <Button
          className="w-[5rem] h-[2.5rem] mr-[3rem]"
          onClick={() => navigate("/user/permissions")}
        >
          {t(KEYS.CANCEL, source)}
        </Button>
        <Button
          type="primary"
          className="w-[5rem] h-[2.5rem] mr-[1rem] bg-[#2853E3]"
          onClick={() => {
            isCreate ? onCreateRole() : onUpdateRole();
          }}
        >
          {t(KEYS.CONFIRM, source)}
        </Button>
      </div>
    </div>
  );
};
