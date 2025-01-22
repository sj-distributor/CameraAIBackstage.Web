import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Empty,
  Form,
  Image,
  Input,
  message,
  Spin,
  Upload,
} from "antd";
import { isEmpty } from "ramda";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/team-info-keys";

import { BackGroundRolePermissionEnum } from "../user-permissions/user-newpermissions/props";
import { useAction } from "./hook";

export const TeamInfo = () => {
  const {
    t,
    teamInfo,
    currentTeam,
    currentAccount,
    openSelectMember,
    showReUpload,
    confirmCancel,
    tempTeamLeader,
    keyWord,
    filteredTeamUsers,
    uploadLoading,
    submitLoading,
    getTeamUsersLoading,
    myPermissions,
    updateTeamInfo,
    onUpload,
    handleUpdateTeamInfo,
    setOpenSelectMember,
    setShowReUpload,
    setConfirmCancel,
    setTempTeamLeader,
    resetTeamInfo,
    setKeyWord,
  } = useAction();

  return (
    <div className="bg-white relative overflow-hidden no-scrollbar h-screen">
      <div className="text-[1.125rem] font-semibold ml-[1.5rem] mt-[2rem]">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.TEAM_INFO, { ns: "teamInfo" })}
        </span>
      </div>

      <div className="w-full flex flex-col items-center overflow-scroll h-[calc(100vh-15rem)] no-scrollbar min-w-[34rem]">
        <div className="w-[80%] max-w-[71.25rem] mt-[2.5rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">
            {t(KEYS.BASIC_INFO, { ns: "teamInfo" })}
          </div>
          <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]">
            <Form className="pl-[4rem]">
              <Form.Item
                label={t(KEYS.TEAM_LOGO, { ns: "teamInfo" })}
                colon={false}
              >
                <div className="flex relative">
                  <div
                    onMouseEnter={() => setShowReUpload(true)}
                    onMouseLeave={() => setShowReUpload(false)}
                  >
                    <Upload
                      name="image"
                      listType="picture-card"
                      accept="image/png, image/jpeg"
                      className="!w-[7rem] teamLogo"
                      maxCount={1}
                      showUploadList={{
                        showPreviewIcon: false,
                        showRemoveIcon: false,
                      }}
                      onPreview={() => false}
                      beforeUpload={() => false}
                      onChange={(e) => onUpload(e.fileList)}
                      fileList={[]}
                      disabled={
                        uploadLoading ||
                        !myPermissions.includes(
                          BackGroundRolePermissionEnum.CanUpdateCameraAiTeam
                        )
                      }
                    >
                      {uploadLoading ? (
                        <Spin />
                      ) : (
                        <Image src={teamInfo.avatarUrl} preview={false} />
                      )}

                      {isEmpty(teamInfo.avatarUrl) && (
                        <div className="text-[1.125rem] text-[#606278]">
                          <PlusOutlined />
                          <div className="text-[.85rem]">
                            {t(KEYS.CLICK_UPLOAD, { ns: "teamInfo" })}
                          </div>
                        </div>
                      )}

                      {showReUpload && !uploadLoading && (
                        <div className="absolute bg-[rgba(0,0,0,0.3)] w-[6.4rem] h-[1.55rem] bottom-[0.61rem] rounded-b-[0.5rem] cursor-pointer z-10 flex justify-center items-center">
                          <div className="text-white text-[0.75rem]">
                            {t(KEYS.RE_UPLOAD, { ns: "teamInfo" })}
                          </div>
                        </div>
                      )}
                    </Upload>
                  </div>

                  <div className="mt-[4rem] text-[#9696A7] text-[.63rem]">
                    <div className="font-semibold mb-[.2rem]">
                      {t(KEYS.UPLOAD_TIPONE, { ns: "teamInfo" })}
                    </div>
                    <div>{t(KEYS.UPLOAD_TIPTWO, { ns: "teamInfo" })}</div>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                label={t(KEYS.TEAM_NAME, { ns: "teamInfo" })}
                colon={false}
              >
                <Input
                  className="w-[80%]"
                  value={teamInfo.name}
                  disabled={
                    !myPermissions.includes(
                      BackGroundRolePermissionEnum.CanUpdateCameraAiTeam
                    )
                  }
                  onChange={(e) => updateTeamInfo("name", e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="w-[80%] max-w-[71.25rem] mt-[2rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">
            {t(KEYS.TEAM_MANAGEMENT, { ns: "teamInfo" })}
          </div>
          <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]">
            <Form className="pl-[4rem]">
              <Form.Item
                label={t(KEYS.TEAM_LEADER, { ns: "teamInfo" })}
                colon={false}
              >
                {getTeamUsersLoading ? <Spin /> : tempTeamLeader.name}
              </Form.Item>
              {currentAccount.id === Number(currentTeam.leaderId) && (
                <Form.Item
                  label={t(KEYS.HANDOVER_TEAM, { ns: "teamInfo" })}
                  colon={false}
                >
                  <Button
                    type="primary"
                    onClick={() => setOpenSelectMember(true)}
                  >
                    {t(KEYS.HANDOVER_TEAM, { ns: "teamInfo" })}
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
        </div>
      </div>

      <div className="h-[5rem] absolute bottom-0 bg-white w-[calc(100%+3rem)] z-1000 flex justify-center items-center shadow-[0_1.875rem_1.25rem_1.25rem_rgba(0,0,0,0.3)]">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBorderColor: "#2853E3",
                defaultColor: "#2853E3",
              },
            },
          }}
        >
          <Button
            className="w-[6rem] h-[2.75rem]"
            onClick={() => {
              setConfirmCancel(true);
            }}
          >
            {t(KEYS.CANCEL, { ns: "teamInfo" })}
          </Button>
        </ConfigProvider>

        <Button
          className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
          type="primary"
          loading={submitLoading}
          onClick={handleUpdateTeamInfo}
        >
          {t(KEYS.CONFIRM, { ns: "teamInfo" })}
        </Button>
      </div>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>{t(KEYS.SELECT_TEAM_USER, { ns: "teamInfo" })}</div>
            <CloseOutlined
              className="mr-[1rem]"
              onClick={() => {
                setKeyWord("");

                setOpenSelectMember(false);

                setTempTeamLeader({
                  id: Number(teamInfo.leaderId),
                  name: teamInfo.leaderName ?? "",
                });
              }}
            />
          </div>
        }
        onCancle={() => {
          setKeyWord("");

          setOpenSelectMember(false);

          setTempTeamLeader({
            id: Number(teamInfo.leaderId),
            name: teamInfo.leaderName ?? "",
          });
        }}
        onConfirm={() => {
          if (!tempTeamLeader) {
            message.warning(
              `${t(KEYS.SELECT_TEAM_USER_TIPS, { ns: "teamInfo" })}`
            );

            return;
          }
          setKeyWord("");

          setOpenSelectMember(false);

          updateTeamInfo("leaderId", tempTeamLeader.id);

          updateTeamInfo("leaderName", tempTeamLeader.name);
        }}
        open={openSelectMember}
        destroyOnClose={true}
        className={"customDeviceModal"}
        modalWidth="42.5rem"
      >
        <>
          <div>
            <Input
              placeholder={t(KEYS.SEARCH_TEAM_USER, { ns: "teamInfo" })}
              className="w-[60%] mb-[1rem]"
              suffix={<SearchOutlined />}
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
          <div className="min-h-[8rem] max-h-[24.56rem] overflow-y-scroll">
            {isEmpty(filteredTeamUsers) ? (
              <Empty />
            ) : (
              filteredTeamUsers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full h-[2.06rem] flex justify-between items-center cursor-pointer hover:bg-[#F0F4FF] hover:text-[#2853E3] ${
                      item.id === tempTeamLeader.id &&
                      "bg-[#F0F4FF] text-[#2853E3]"
                    }`}
                    onClick={() =>
                      setTempTeamLeader({ id: item.id, name: item.name })
                    }
                  >
                    <div className="ml-[1rem] w-[90%] truncate text-ellipsis">
                      {item.name}
                    </div>
                    {item.id === tempTeamLeader.id && (
                      <CheckOutlined className="mr-[1rem] text-[#2853E3]" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      </CustomModal>

      <CustomModal
        open={confirmCancel}
        title={<div>{t(KEYS.PLEASE_CONFIRM, { ns: "teamInfo" })}</div>}
        footer={
          <div>
            <Button onClick={() => setConfirmCancel(false)}>
              {t(KEYS.CANCEL, { ns: "teamInfo" })}
            </Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => {
                setConfirmCancel(false);

                resetTeamInfo();
              }}
            >
              {t(KEYS.CONFIRM, { ns: "teamInfo" })}
            </Button>
          </div>
        }
      >
        <div>{t(KEYS.LOSS_EDIT_CONTENT, { ns: "teamInfo" })}</div>
      </CustomModal>
    </div>
  );
};
