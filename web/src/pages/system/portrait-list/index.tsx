import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Pagination, Select, Upload } from "antd";
import { Trans } from "react-i18next";

import edit from "@/assets/portrait/edit.svg";
import trash from "@/assets/portrait/trash.svg";
import upload from "@/assets/portrait/upload.svg";
import add from "@/assets/public/add.svg";
import avatar from "@/assets/public/avatar.png";
import down from "@/assets/public/down-arrow.png";
import search from "@/assets/public/search.png";
import { CustomModal } from "@/components/custom-modal";
import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/portrait-list-keys";

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

  const { t } = useAuth();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <img src={upload} />
      <div className="text-[#9696A7] text-[.75rem]">
        {t(KEYS.CLICK_UPLOAD, { ns: "portraitList" })}
      </div>
    </button>
  );

  return (
    <div>
      <div className="p-[1.5rem] bg-white">
        <div className="text-[1.125rem] font-semibold">
          {t(KEYS.PORTRAIT_LIST, { ns: "portraitList" })}
        </div>
        <div className="flex justify-between items-center m-[1.5rem_0_1rem]">
          <div>
            <Input
              className="w-[17.5rem]"
              placeholder={t(KEYS.SEARCH, { ns: "portraitList" })}
              suffix={<img src={search} />}
            />
          </div>
          <Button
            className="flex justify-center items-center w-[5.5rem] h-[2.75rem]"
            type="primary"
            onClick={() => setIsOpenModal(true)}
          >
            <img src={add} className="mr-[.375rem]" />
            {t(KEYS.ADD, { ns: "portraitList" })}
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
                    <div>
                      {t(KEYS.DEPARTMENT, { ns: "portraitList" })} :{" "}
                      {item.department}
                    </div>
                    <div>
                      {t(KEYS.GROUP, { ns: "portraitList" })} : {item.group}
                    </div>
                    <div>
                      {t(KEYS.JOB, { ns: "portraitList" })} : {item.job}
                    </div>
                    <div>
                      {t(KEYS.PHONE_NUMBER, { ns: "portraitList" })} :{" "}
                      {item.phone}
                    </div>
                  </div>
                </div>
                <div className="p-[1rem_1.5rem] flex justify-end items-center bg-[#F6F8FC]">
                  <div className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#F04E4E] border border-solid border-[#F04E4E] cursor-pointer mr-[1rem]">
                    <img src={trash} className="mr-[.5rem]" />
                    {t(KEYS.DELETE, { ns: "portraitList" })}
                  </div>
                  <div
                    onClick={() => setIsOpenModal(true)}
                    className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#2853E3] border border-solid border-[#2853E3] cursor-pointer"
                  >
                    <img src={edit} className="mr-[.5rem]" />
                    {t(KEYS.EDIT, { ns: "portraitList" })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center bg-[#F6F8FC] p-[1rem_0_1rem_1rem]">
        <div>
          <Trans
            i18nKey={KEYS.PAGINATION}
            ns="portraitList"
            values={{ count: 200 }}
            components={{ span: <span className="text-[#2853E3]" /> }}
          />
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          showQuickJumper
          showSizeChanger
        />
      </div>

      <CustomModal
        className="customDeviceModal"
        title={
          <div className="text-[1.25rem] font-semibold flex justify-between items-center">
            <div>{t(KEYS.ADD_PORTRAIT, { ns: "portraitList" })}</div>
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
        <div className="pl-[.8125rem]">
          <Form
            name="basic"
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            colon={false}
          >
            <Form.Item
              label={t(KEYS.USER_NAME, { ns: "portraitList" })}
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
                className="w-[25rem]"
              />
            </Form.Item>

            <div className="ml-[1.5rem]">
              <Form.Item
                label={t(KEYS.DEPARTMENT, { ns: "portraitList" })}
                name="department"
              >
                <Select
                  suffixIcon={<img src={down} />}
                  style={{ width: 400 }}
                  placeholder={t(KEYS.PLEASE_SELECT, { ns: "portraitList" })}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={t(KEYS.GROUP, { ns: "portraitList" })}
                name="group"
              >
                <Input
                  placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
                  className="w-[25rem]"
                />
              </Form.Item>
              <Form.Item
                label={t(KEYS.JOB, { ns: "portraitList" })}
                name="post"
              >
                <Input
                  placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
                  className="w-[25rem]"
                />
              </Form.Item>
              <Form.Item
                label={t(KEYS.PHONE_NUMBER, { ns: "portraitList" })}
                name="phone"
              >
                <Input
                  placeholder={t(KEYS.EXAMPLE, { ns: "portraitList" })}
                  className="w-[25rem]"
                />
              </Form.Item>
            </div>

            <Form.Item
              className="ml-[.8125rem] mb-0"
              label={t(KEYS.PORTRAIT, { ns: "portraitList" })}
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
                    maxCount={1}
                    accept=".jpg, .png"
                  >
                    {fileList.length === 0 && uploadButton}
                  </Upload>
                  <div className="text-[.625rem] text-[#9696A7] w-[11.875rem]">
                    <div className="font-semibold">
                      {t(KEYS.UPLOAD_TIP_TITLE, { ns: "portraitList" })}
                    </div>
                    <div>
                      {t(KEYS.UPLOAD_TIP_CONTENT, { ns: "portraitList" })}
                    </div>
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
