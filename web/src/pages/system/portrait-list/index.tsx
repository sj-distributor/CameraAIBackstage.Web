import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Pagination, Select, Upload } from "antd";

import { CustomModal } from "@/components/custom-modal";

import add from "../../../assets/portrait/add.svg";
import down from "../../../assets/portrait/down.svg";
import edit from "../../../assets/portrait/edit.svg";
import search from "../../../assets/portrait/search.svg";
import trash from "../../../assets/portrait/trash.svg";
import upload from "../../../assets/portrait/upload.svg";
import avatar from "../../../assets/public/avatar.png";
import { useAction } from "./hook";

export const PortraitList = () => {
  const {
    portraitData,
    isOpenModal,
    previewOpen,
    previewImage,
    previewTitle,
    fileList,
    handleChange,
    setIsOpenModal,
    handleCancel,
    handlePreview,
  } = useAction();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <img src={upload} />
      <div className="text-[#9696A7] text-[12px]">點擊上傳</div>
    </button>
  );

  return (
    <div>
      <div className="p-[24px] bg-white">
        <div className="text-[18px] font-semibold">人像管理</div>
        <div className="flex justify-between items-center m-[24px_0_16px]">
          <div>
            <Input
              className="w-[280px]"
              placeholder="搜索用戶名、部門、崗位、組別"
              suffix={<img src={search} />}
            />
          </div>
          <Button
            className="flex justify-center items-center w-[88px] h-[44px]"
            type="primary"
            onClick={() => setIsOpenModal(true)}
          >
            <img src={add} className="mr-[6px] w-[16px] h-[16px]" />
            新增
          </Button>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 xl:grid-cols-3 xl:grid-rows-3 gap-[16px]">
          {portraitData.map((item, index) => {
            return (
              <div
                key={index}
                className="shadow-[0px_2px_3px_1px_rgb(0,0,0,0.07)] rounded-[16px]"
              >
                <div className="p-[16px] flex">
                  <div className="mr-[16px]">
                    {item.portraitUrl ? (
                      item.portraitUrl
                    ) : (
                      <img src={avatar} width={64} height={64} />
                    )}
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[12px]">
                    <div className="col-span-2 font-semibold text-[20px]">
                      {item.name}
                    </div>
                    <div>部門：{item.department}</div>
                    <div>組別：{item.group}</div>
                    <div>崗位：{item.post}</div>
                    <div>電話：{item.phone}</div>
                  </div>
                </div>
                <div className="p-[16px_24px] flex justify-end items-center bg-[#F6F8FC]">
                  <div className="flex items-center justify-center w-[88px] h-[44px] rounded-[8px] text-[#F04E4E] border border-solid border-[#F04E4E] cursor-pointer mr-[16px]">
                    <img src={trash} className="mr-[8px]" />
                    刪除
                  </div>
                  <div
                    onClick={() => setIsOpenModal(true)}
                    className="flex items-center justify-center w-[88px] h-[44px] rounded-[8px] text-[#2853E3] border border-solid border-[#2853E3] cursor-pointer"
                  >
                    <img src={edit} className="mr-[8px]" />
                    編輯
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center bg-[#F6F8FC] p-[16px_0_16px_16px]">
        <div>
          共 <span className="text-[#2853E3]">200</span> 条
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          showQuickJumper
          showSizeChanger
        />
      </div>

      <CustomModal
        title={
          <div className="text-[20px] font-semibold flex justify-between items-center mb-[24px]">
            <div>新增人像</div>
            <CloseOutlined
              className="text-[16px] cursor-pointer"
              onClick={() => setIsOpenModal(false)}
            />
          </div>
        }
        open={isOpenModal}
        onCancle={() => setIsOpenModal(false)}
        onConfirm={() => setIsOpenModal(false)}
        modalWidth={680}
      >
        <div className="relative p-[32px_0_8px_16px]">
          <div className="absolute w-[680px] h-[2px] bg-[#F3F3F6] top-0 left-[-24px]" />
          <Form
            name="basic"
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            colon={false}
          >
            <Form.Item
              label="用戶名"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="請輸入" className="w-[400px]" />
            </Form.Item>

            <div className="ml-[24px]">
              <Form.Item label="部門" name="department">
                <Select
                  suffixIcon={<img src={down} />}
                  style={{ width: 400 }}
                  placeholder="請選擇"
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="組別" name="group">
                <Input placeholder="請輸入" className="w-[400px]" />
              </Form.Item>
              <Form.Item label="崗位" name="post">
                <Input placeholder="請輸入" className="w-[400px]" />
              </Form.Item>
              <Form.Item label="電話" name="phone">
                <Input placeholder="例如:188-6666-6666" className="w-[400px]" />
              </Form.Item>
            </div>

            <Form.Item
              className="ml-[13px]"
              label="頭像"
              name="portrait"
              rules={[
                { required: true, message: "Please upload your portrait!" },
              ]}
            >
              <div className="flex items-end portraitUploadStyle">
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  className="!w-auto"
                >
                  {fileList.length === 0 && uploadButton}
                </Upload>
                <div className="text-[10px] text-[#9696A7]">
                  <div className="font-semibold">上傳人像小竅門：</div>
                  <div>建議圖片比例為1:1，文件大小小於2MB，</div>
                  <div>保持視覺元素居中</div>
                </div>
              </div>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img style={{ width: "100%" }} src={previewImage} />
              </Modal>
            </Form.Item>
          </Form>
        </div>
      </CustomModal>
    </div>
  );
};
