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
    imageInformation,
    fileList,
    handleChange,
    setIsOpenModal,
    handleCancel,
    handlePreview,
  } = useAction();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <img src={upload} />
      <div className="text-[#9696A7] text-[.75rem]">點擊上傳</div>
    </button>
  );

  return (
    <div>
      <div className="p-[1.5rem] bg-white">
        <div className="text-[1.125rem] font-semibold">人像管理</div>
        <div className="flex justify-between items-center m-[1.5rem_0_1rem]">
          <div>
            <Input
              className="w-[17.5rem]"
              placeholder="搜索用戶名、部門、崗位、組別"
              suffix={<img src={search} />}
            />
          </div>
          <Button
            className="flex justify-center items-center w-[5.5rem] h-[2.75rem]"
            type="primary"
            onClick={() => setIsOpenModal(true)}
          >
            <img src={add} className="mr-[.375rem]" />
            新增
          </Button>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 xl:grid-cols-3 xl:grid-rows-3 gap-[1rem]">
          {portraitData.map((item, index) => {
            return (
              <div
                key={index}
                className="shadow-[0rem_.125rem_.1875rem_.0625rem_rgb(0,0,0,0.07)] rounded-[1rem]"
              >
                <div className="p-[1rem] flex">
                  <div className="mr-[1rem]">
                    {item.portraitUrl ? (
                      item.portraitUrl
                    ) : (
                      <img src={avatar} width={64} height={64} />
                    )}
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[.75rem]">
                    <div className="col-span-2 font-semibold text-[1.25rem]">
                      {item.name}
                    </div>
                    <div>部門：{item.department}</div>
                    <div>組別：{item.group}</div>
                    <div>崗位：{item.post}</div>
                    <div>電話：{item.phone}</div>
                  </div>
                </div>
                <div className="p-[1rem_1.5rem] flex justify-end items-center bg-[#F6F8FC]">
                  <div className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#F04E4E] border border-solid border-[#F04E4E] cursor-pointer mr-[1rem]">
                    <img src={trash} className="mr-[.5rem]" />
                    刪除
                  </div>
                  <div
                    onClick={() => setIsOpenModal(true)}
                    className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#2853E3] border border-solid border-[#2853E3] cursor-pointer"
                  >
                    <img src={edit} className="mr-[.5rem]" />
                    編輯
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center bg-[#F6F8FC] p-[1rem_0_1rem_1rem]">
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
          <div className="text-[1.25rem] font-semibold flex justify-between items-center mb-[1.5rem]">
            <div>新增人像</div>
            <CloseOutlined
              className="text-[1rem] cursor-pointer"
              onClick={() => setIsOpenModal(false)}
            />
          </div>
        }
        open={isOpenModal}
        onCancle={() => setIsOpenModal(false)}
        onConfirm={() => setIsOpenModal(false)}
        modalWidth={680}
      >
        <div className="relative p-[2rem_0_.5rem_1rem]">
          <div className="absolute w-[42.5rem] h-[.125rem] bg-[#F3F3F6] top-0 left-[-1.5rem]" />
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
              <Input placeholder="請輸入" className="w-[25rem]" />
            </Form.Item>

            <div className="ml-[1.5rem]">
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
                <Input placeholder="請輸入" className="w-[25rem]" />
              </Form.Item>
              <Form.Item label="崗位" name="post">
                <Input placeholder="請輸入" className="w-[25rem]" />
              </Form.Item>
              <Form.Item label="電話" name="phone">
                <Input placeholder="例如:188-6666-6666" className="w-[25rem]" />
              </Form.Item>
            </div>

            <Form.Item
              className="ml-[.8125rem]"
              label="頭像"
              name="portrait"
              rules={[
                { required: true, message: "Please upload your portrait!" },
              ]}
            >
              <div>
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
                  <div className="text-[.625rem] text-[#9696A7]">
                    <div className="font-semibold">上傳人像小竅門：</div>
                    <div>建議圖片比例為1:1，文件大小小于2MB，</div>
                    <div>保持視覺元素居中</div>
                  </div>
                </div>
                <Modal
                  open={imageInformation.previewOpen}
                  title={imageInformation.previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    style={{ width: "100%" }}
                    src={imageInformation.previewImage}
                  />
                </Modal>
              </div>
            </Form.Item>
          </Form>
        </div>
      </CustomModal>
    </div>
  );
};
