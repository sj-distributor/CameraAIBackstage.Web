import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Spin,
  Upload,
} from "antd";
import { Trans } from "react-i18next";

import edit from "@/assets/portrait/edit.svg";
import trash from "@/assets/portrait/trash.svg";
import upload from "@/assets/portrait/upload.svg";
import add from "@/assets/public/add.svg";
import avatar from "@/assets/public/avatar.png";
import search from "@/assets/public/search.png";
import { CustomModal } from "@/components/custom-modal";
import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/portrait-list-keys";
import { BackGroundRolePermissionEnum } from "@/pages/user/user-permissions/user-newpermissions/props";
import { OperationTypeEnum } from "@/services/dtos/portrait";

import { useAction } from "./hook";

export const PortraitList = () => {
  const {
    portraitData,
    imageInformation,
    fileList,
    loading,
    portraitModal,
    pageData,
    handleCreateOrUpdatePortrait,
    handleDeletePortrait,
    initialPortraitDto,
    handleUploadChange,
    handleCancel,
    handleFilePreview,
    setPageData,
    setPortraitModal,
    setFileList,
  } = useAction();

  const { t, myPermissions } = useAuth();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <img src={upload} />
      <div className="text-[#9696A7] text-[.75rem]">
        {t(KEYS.CLICK_UPLOAD, { ns: "portraitList" })}
      </div>
    </button>
  );

  return (
    <div className="h-full grid grid-rows-[1fr,auto] ">
      <div className="p-[1.5rem] bg-white box-border">
        <div className="text-[1.125rem] font-semibold">
          {t(KEYS.PORTRAIT_LIST, { ns: "portraitList" })}
        </div>
        <div className="flex justify-between items-center m-[1.5rem_0_1rem]">
          <div>
            <Input
              className="w-[17.5rem] h-[2.5rem]"
              placeholder={t(KEYS.SEARCH, { ns: "portraitList" })}
              suffix={
                <SearchOutlined
                  style={{
                    color: "#666472",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                  }}
                />
              }
              onChange={(event) => {
                setPageData((pre) => ({ ...pre, keyword: event.target.value }));
              }}
            />
          </div>
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanAddCameraAiPortrait
          ) && (
            <Button
              className="flex justify-center items-center w-[5.5rem] h-[2.75rem]"
              type="primary"
              onClick={() => {
                setPortraitModal(() => ({
                  isOpen: true,
                  operationType: OperationTypeEnum.Add,
                  item: initialPortraitDto,
                }));

                setFileList([]);
              }}
            >
              <img src={add} className="mr-[.375rem]" />
              {t(KEYS.ADD, { ns: "portraitList" })}
            </Button>
          )}
        </div>
        {loading ? (
          <div className="grid mt-[12%]">
            <Spin />
          </div>
        ) : portraitData.portraits.length ? (
          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3 xl:grid-rows-3 gap-[1rem]">
            {portraitData.portraits.map((item, index) => {
              return (
                <div
                  key={index}
                  className="shadow-[0rem_.125rem_.1875rem_.0625rem_rgb(0,0,0,0.07)] rounded-[1rem]"
                >
                  <div className="p-[.875rem] flex">
                    <div className="mr-[1rem]">
                      {item.faces[0]?.imageUrl ? (
                        <img
                          src={item.faces[0]?.imageUrl}
                          width={64}
                          height={64}
                          className="rounded-[50%]"
                        />
                      ) : (
                        <img src={avatar} width={64} height={64} />
                      )}
                    </div>
                    <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[.5rem]">
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
                        {t(KEYS.POSITION, { ns: "portraitList" })} :{" "}
                        {item.position}
                      </div>
                      <div>
                        {t(KEYS.PHONE_NUMBER, { ns: "portraitList" })} :{" "}
                        {item.phone}
                      </div>
                    </div>
                  </div>
                  <div className="p-[.625rem_.75rem] flex justify-end items-center bg-[#F6F8FC] portrait">
                    {myPermissions.includes(
                      BackGroundRolePermissionEnum.CanDeleteCameraAiPortrait
                    ) && (
                      <Popconfirm
                        title={t(KEYS.DELETE_TIP, { ns: "portraitList" })}
                        description={t(KEYS.WHETHER_CONFIRM_DELETE, {
                          ns: "portraitList",
                        })}
                        onConfirm={() => handleDeletePortrait.run(item.id!)}
                        okText={t(KEYS.CONFIRM, { ns: "portraitList" })}
                        cancelText={t(KEYS.CANCEL, { ns: "portraitList" })}
                        rootClassName="portrait"
                      >
                        <div className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#F04E4E] border border-solid border-[#F04E4E] cursor-pointer mr-[1rem]">
                          <img src={trash} className="mr-[.5rem]" />
                          {t(KEYS.DELETE, { ns: "portraitList" })}
                        </div>
                      </Popconfirm>
                    )}
                    {myPermissions.includes(
                      BackGroundRolePermissionEnum.CanUpdateCameraAiPortrait
                    ) && (
                      <div
                        onClick={() => {
                          setPortraitModal({
                            isOpen: true,
                            operationType: OperationTypeEnum.Edit,
                            item,
                          });

                          setFileList(
                            item.faces
                              .map((item) => ({
                                name: "",
                                uid: item.faceId!,
                                url: item.imageUrl,
                              }))
                              .filter((x) => !!x.url)
                          );
                        }}
                        className="flex items-center justify-center w-[5.5rem] h-[2.75rem] rounded-[.5rem] text-[#2853E3] border border-solid border-[#2853E3] cursor-pointer"
                      >
                        <img src={edit} className="mr-[.5rem]" />
                        {t(KEYS.EDIT, { ns: "portraitList" })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty description="Not Data" className="mt-[12%]" />
        )}
      </div>
      <div className="flex justify-between items-center bg-[#F6F8FC] p-[1rem_0_1rem_1rem]">
        <div>
          <Trans
            i18nKey={KEYS.PAGINATION}
            ns="portraitList"
            values={{ count: portraitData.count }}
            components={{
              span: <span className="text-[#2853E3] font-light mx-1" />,
            }}
          />
        </div>
        <Pagination
          current={pageData.pageIndex}
          total={portraitData.count}
          showQuickJumper
          showSizeChanger
          pageSize={pageData.pageSize}
          pageSizeOptions={[9, 12, 15]}
          onChange={(page, pageSize) => {
            setPageData((pre) => ({ ...pre, pageIndex: page, pageSize }));
          }}
        />
      </div>

      <CustomModal
        className="customDeviceModal"
        title={
          <div className="text-[1.25rem] font-semibold flex justify-between items-center">
            <div>{t(KEYS.ADD_PORTRAIT, { ns: "portraitList" })}</div>
            <CloseOutlined
              className="text-[1rem] cursor-pointer"
              onClick={() =>
                setPortraitModal((pre) => ({ ...pre, isOpen: false }))
              }
            />
          </div>
        }
        open={portraitModal.isOpen}
        onCancle={() => setPortraitModal((pre) => ({ ...pre, isOpen: false }))}
        onConfirm={handleCreateOrUpdatePortrait.run}
        modalWidth={"42.5rem"}
      >
        <div className="pl-[.8125rem] text-right grid grid-cols-[max-content,auto] gap-[1.25rem_.625rem] items-center w-[28.25rem]">
          <div>{t(KEYS.USER_NAME, { ns: "portraitList" })}</div>
          <Input
            placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
            value={portraitModal.item.name}
            onChange={(event) => {
              setPortraitModal((pre) => ({
                ...pre,
                item: { ...pre.item, name: event.target.value },
              }));
            }}
          />

          <div>{t(KEYS.DEPARTMENT, { ns: "portraitList" })}</div>
          <Input
            placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
            value={portraitModal.item.department}
            onChange={(event) => {
              setPortraitModal((pre) => ({
                ...pre,
                item: { ...pre.item, department: event.target.value },
              }));
            }}
          />

          <div>{t(KEYS.GROUP, { ns: "portraitList" })}</div>
          <Input
            placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
            value={portraitModal.item.group}
            onChange={(event) => {
              setPortraitModal((pre) => ({
                ...pre,
                item: { ...pre.item, group: event.target.value },
              }));
            }}
          />

          <div>{t(KEYS.POSITION, { ns: "portraitList" })}</div>
          <Input
            placeholder={t(KEYS.PLEASE_ENTRY, { ns: "portraitList" })}
            value={portraitModal.item.position}
            onChange={(event) => {
              setPortraitModal((pre) => ({
                ...pre,
                item: { ...pre.item, position: event.target.value },
              }));
            }}
          />

          <div>{t(KEYS.PHONE_NUMBER, { ns: "portraitList" })}</div>
          <Input
            placeholder={t(KEYS.EXAMPLE, { ns: "portraitList" })}
            value={portraitModal.item.phone}
            onChange={(event) => {
              setPortraitModal((pre) => ({
                ...pre,
                item: { ...pre.item, phone: event.target.value },
              }));
            }}
          />

          <div className="self-start pt-[.375rem]">
            {t(KEYS.PORTRAIT, { ns: "portraitList" })}
          </div>
          <div className="flex items-end portraitUploadStyle">
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              fileList={fileList}
              onPreview={handleFilePreview}
              onChange={handleUploadChange}
              className="!w-auto"
              accept=".jpg, .png"
            >
              {fileList.length < 1 && uploadButton}
            </Upload>
            <div className="text-[.625rem] text-[#9696A7] w-[11.875rem] text-left">
              <div className="font-semibold">
                {t(KEYS.UPLOAD_TIP_TITLE, { ns: "portraitList" })}
              </div>
              <div>{t(KEYS.UPLOAD_TIP_CONTENT, { ns: "portraitList" })}</div>
            </div>
          </div>
          <Modal
            title={t(KEYS.PICTURE_PREVIEW, { ns: "portraitList" })}
            open={imageInformation.previewOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              style={{ width: "100%" }}
              src={imageInformation.previewImage}
            />
          </Modal>
        </div>
      </CustomModal>
    </div>
  );
};
