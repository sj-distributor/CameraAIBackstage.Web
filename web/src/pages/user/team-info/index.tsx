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

import { useAction } from "./hook";

export const TeamInfo = () => {
  const {
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
          團隊信息
        </span>
      </div>

      <div className="w-full flex flex-col items-center overflow-scroll h-[calc(100vh-15rem)] no-scrollbar min-w-[34rem]">
        <div className="w-[80%] max-w-[71.25rem] mt-[2.5rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">基礎信息</div>
          <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]">
            <Form className="pl-[4rem]">
              <Form.Item label="團隊logo" colon={false}>
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
                      disabled={uploadLoading}
                    >
                      {uploadLoading ? (
                        <Spin />
                      ) : (
                        <Image src={teamInfo.avatarUrl} preview={false} />
                      )}

                      {isEmpty(teamInfo.avatarUrl) && (
                        <div className="text-[1.125rem] text-[#606278]">
                          <PlusOutlined />
                          <div className="text-[.85rem]">點擊上傳</div>
                        </div>
                      )}

                      {showReUpload && !uploadLoading && (
                        <div className="absolute bg-[rgba(0,0,0,0.3)] w-[6.4rem] h-[1.55rem] bottom-[0.61rem] rounded-b-[0.5rem] cursor-pointer z-10 flex justify-center items-center">
                          <div className="text-white text-[0.75rem]">
                            重新上传
                          </div>
                        </div>
                      )}
                    </Upload>
                  </div>

                  <div className="mt-[4rem] text-[#9696A7] text-[.63rem]">
                    <div className="font-semibold mb-[.2rem]">
                      优质图标的小窍门：
                    </div>
                    <div>
                      建议图片比例为1:1，文件大小小于2MB，保持视觉元素居中
                    </div>
                  </div>
                </div>
              </Form.Item>
              <Form.Item label="團隊名稱" colon={false}>
                <Input
                  className="w-[80%]"
                  value={teamInfo.name}
                  onChange={(e) => updateTeamInfo("name", e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="w-[80%] max-w-[71.25rem] mt-[2rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">团队管理</div>
          <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]">
            <Form className="pl-[4rem]">
              <Form.Item label="团队所有者" colon={false}>
                {tempTeamLeader.name}
              </Form.Item>
              {currentAccount.id === Number(currentTeam.leaderId) && (
                <Form.Item label="移交团队" colon={false}>
                  <Button
                    type="primary"
                    onClick={() => setOpenSelectMember(true)}
                  >
                    移交团队
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
            取消
          </Button>
        </ConfigProvider>

        <Button
          className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
          type="primary"
          loading={submitLoading}
          onClick={handleUpdateTeamInfo}
        >
          確定
        </Button>
      </div>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>选择团队成员</div>
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
            message.warning("请选择一位团队成员");

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
              placeholder="搜索团队成员"
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
        title={<div>请确认</div>}
        footer={
          <div>
            <Button onClick={() => setConfirmCancel(false)}>取消</Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => {
                setConfirmCancel(false);

                resetTeamInfo();
              }}
            >
              确定
            </Button>
          </div>
        }
      >
        <div>将会失去编辑内容，确认是否取消？</div>
      </CustomModal>
    </div>
  );
};
