import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message, Upload } from "antd";
import { isEmpty } from "ramda";
import { useState } from "react";

import { CustomModal } from "@/components/custom-modal";

const teamMember = [
  {
    key: "1",
    name: "Carla Curtis",
  },
  {
    key: "2",
    name: "Kaylynn Lubin",
  },
  {
    key: "3",
    name: "Rayna Aminoff",
  },
  {
    key: "4",
    name: "Marley Dokidis",
  },
  {
    key: "5",
    name: "Carla Curtis",
  },
  {
    key: "6",
    name: "Kaylynn Lubin",
  },
  {
    key: "7",
    name: "Rayna Aminoff",
  },
  {
    key: "8",
    name: "Marley Dokidis",
  },
  {
    key: "9",
    name: "Carla Curtis",
  },
  {
    key: "10",
    name: "Kaylynn Lubin",
  },
  {
    key: "11",
    name: "Rayna Aminoff",
  },
  {
    key: "12",
    name: "Marley Dokidis",
  },
  {
    key: "13",
    name: "Carla Curtis",
  },
  {
    key: "14",
    name: "Kaylynn Lubin",
  },
  {
    key: "15",
    name: "Rayna Aminoff",
  },
  {
    key: "16",
    name: "Marley Dokidis",
  },
];

const teamInfo = {
  teamName: "SJ-CN TEAM",
  teamLogo:
    "https://smartiestest.oss-cn-hongkong.aliyuncs.com/20241217/6be331e8-0b6a-4a65-aeb8-e14f70407c33.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=zhqP7kcVoYACfR7K6rmQkC3sQSk%3D",
};

export const TeamInfo = () => {
  const [openSelectMember, setOpenSelectMember] = useState<boolean>(false);

  const [teamOwner, setTeamOwner] = useState<string>("");

  const [showReUpload, setShowReUpload] = useState<boolean>(false);

  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);

  const handleCancelModal = () => {
    setOpenSelectMember(false);

    setTeamOwner("");
  };

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
                      fileList={
                        teamInfo.teamLogo
                          ? [
                              {
                                uid: "-1",
                                name: "image",
                                status: "done",
                                url: teamInfo.teamLogo,
                              },
                            ]
                          : []
                      }
                    >
                      {isEmpty(teamInfo.teamLogo) && (
                        <div className="text-[1.125rem] text-[#606278]">
                          <PlusOutlined />
                          <div className="text-[.85rem]">點擊上傳</div>
                        </div>
                      )}
                    </Upload>

                    {showReUpload && (
                      <div className="absolute bg-[rgba(0,0,0,0.3)] w-[6.4rem] h-[1.55rem] bottom-[0.61rem] rounded-b-[0.5rem] cursor-pointer z-10 flex justify-center items-center">
                        <div className="text-white text-[0.75rem]">
                          重新上传
                        </div>
                      </div>
                    )}
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
                <Input className="w-[80%]" value={teamInfo.teamName} />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="w-[80%] max-w-[71.25rem] mt-[2rem]">
          <div className="text-[#323444] font-semibold mb-[1rem]">团队管理</div>
          <div className="border border-[#E7E8EE] border-solid rounded-2xl shadow-md pt-[2rem]">
            <Form className="pl-[4rem]">
              <Form.Item label="团队所有者" colon={false}>
                Henry
              </Form.Item>
              <Form.Item label="移交团队" colon={false}>
                <Button
                  type="primary"
                  onClick={() => setOpenSelectMember(true)}
                >
                  移交团队
                </Button>
              </Form.Item>
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
            // onClick={() => navigate("/user/list")}
          >
            取消
          </Button>
        </ConfigProvider>

        <Button
          className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
          type="primary"
          // onClick={onSubmit}
        >
          確定
        </Button>
      </div>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>选择团队成员</div>
            <CloseOutlined className="mr-[1rem]" onClick={handleCancelModal} />
          </div>
        }
        onCancle={handleCancelModal}
        onConfirm={() => {
          if (!teamOwner) {
            message.warning("请选择一位团队成员");

            return;
          }
          handleCancelModal();
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
            />
          </div>
          <div className="max-h-[24.56rem] overflow-y-scroll">
            {teamMember.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full h-[2.06rem] flex justify-between items-center cursor-pointer hover:bg-[#F0F4FF] hover:text-[#2853E3] ${
                    item.key === teamOwner && "bg-[#F0F4FF] text-[#2853E3]"
                  }`}
                  onClick={() => setTeamOwner(item.key)}
                >
                  <div className="ml-[1rem] w-[90%] truncate text-ellipsis">
                    {item.name}
                  </div>
                  {item.key === teamOwner && (
                    <CheckOutlined className="mr-[1rem] text-[#2853E3]" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      </CustomModal>

      <CustomModal
        open={confirmCancel}
        title={<div>请确认</div>}
        onCancle={() => setConfirmCancel(false)}
        onConfirm={() => setConfirmCancel(false)}
        footer={
          <div>
            <Button onClick={() => setConfirmCancel(false)}>取消</Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => setConfirmCancel(false)}
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
