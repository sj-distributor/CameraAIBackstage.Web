import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Input, Select } from "antd";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/area-management-keys";

import { IAddAreaModalProps } from "../../props";
import { useAction } from "./hook";

export const AddAreaModal = (props: IAddAreaModalProps) => {
  const { setOperateModalParams, initGetRegionList, operateModalParams } =
    props;

  const {
    regionDataItem,
    handleRemoveInput,
    t,
    handleCreateOrUpdateRegionItem,
    handleUpdateDataChange,
    setRegionDataItem,
    initialRegionDataItem,
    setIsValueExist,
    isValueExist,
  } = useAction(operateModalParams, initGetRegionList);

  return (
    <CustomModal
      title={
        <div className="text-[1.25rem] font-semibold tracking-tight leading-[1.875rem]">
          {operateModalParams.isEdit
            ? "编辑区域"
            : t(KEYS.ADD_AREA, { ns: "areaManagement" })}
        </div>
      }
      onCancle={() => {
        setOperateModalParams({
          isOpen: false,
          isEdit: false,
          recordItem: initialRegionDataItem,
        });
        setIsValueExist(false);
      }}
      onConfirm={() => {
        if (
          regionDataItem.regionAreaNames.some((name) => name.trim() === "") ||
          regionDataItem.regionAddress.trim() === ""
        ) {
          setIsValueExist(true);

          return;
        }
        handleCreateOrUpdateRegionItem();
        setOperateModalParams({
          isOpen: false,
          isEdit: false,
          recordItem: initialRegionDataItem,
        });
        setIsValueExist(false);
      }}
      open={operateModalParams.isOpen}
      className={"customDeviceModal"}
      modalWidth="42.5rem"
      destroyOnClose={true}
      forceRender={true}
    >
      <>
        <div className={`flex ${!isValueExist && "mb-[1.5rem]"}`}>
          <div className="text-red-500 mr-1 mt-[0.5rem]">*</div>
          <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
            {t(KEYS.AREA_ADDRESS, { ns: "areaManagement" })}
          </div>
          <Input
            placeholder={t(KEYS.PLEASE_INPUT, { ns: "areaManagement" })}
            className="w-[24.9375rem] h-[2.0625rem]"
            onChange={(e) =>
              handleUpdateDataChange("regionAddress", e.target.value)
            }
            value={regionDataItem.regionAddress}
            status={isValueExist ? "error" : undefined}
          />
        </div>
        {isValueExist && (
          <div className="ml-[4.7rem] text-red-500 mb-[0.8rem]">
            请输入区域地址
          </div>
        )}
        <div className="flex ml-6 mb-[1.5rem]">
          <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
            {t(KEYS.PRINCIPAL, { ns: "areaManagement" })}
          </div>
          <Select
            placeholder={t(KEYS.PLEASE_SELECT, { ns: "areaManagement" })}
            className="!w-[24.9375rem] h-[2.0625rem]"
            value={regionDataItem.principal}
            options={[
              {
                value: "tttt",
                label: "tttt",
              },
              {
                value: "cath",
                label: "cath",
              },
            ]}
            onChange={(value) => handleUpdateDataChange("principal", value)}
          />
        </div>
        {operateModalParams.isEdit ? (
          <div className="flex mb-[1.5rem]">
            <div className="text-red-500 mr-1 mt-[0.5rem]">*</div>
            <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
              {t(KEYS.MODAL_AREA_NAME, { ns: "areaManagement" })}
            </div>
            <Input
              placeholder={t(KEYS.ZONE_NAME, { ns: "areaManagement" })}
              className="w-[24.9375rem] h-[2.0625rem]"
              onChange={(e) =>
                handleUpdateDataChange("areaName", e.target.value)
              }
              value={regionDataItem.areaName}
              status={isValueExist ? "error" : undefined}
            />
            {isValueExist && <div className="text-red-500">请输入区域名称</div>}
          </div>
        ) : (
          <div className="flex">
            <div className="text-red-500 mr-1 mt-[0.5rem]">*</div>
            <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
              {t(KEYS.MODAL_AREA_NAME, { ns: "areaManagement" })}
            </div>
            <div>
              {regionDataItem?.regionAreaNames?.map((field, index) => (
                <div
                  className={` ${index !== 0 && "mt-[1.5rem]"} ${
                    index !== 0 && isValueExist && "mt-[0.8rem]"
                  }`}
                  key={index}
                >
                  <div className="text-[.875rem] mr-[.625rem]">
                    <Input
                      placeholder={t(KEYS.ZONE_NAME, {
                        ns: "areaManagement",
                      })}
                      className="w-[24.9375rem] h-[2.0625rem]"
                      value={field}
                      onChange={(e) =>
                        handleUpdateDataChange(
                          "regionAreaNames",
                          e.target.value,
                          index
                        )
                      }
                      status={isValueExist ? "error" : undefined}
                    />
                    {index !== 0 && (
                      <MinusCircleFilled
                        style={{ color: "#F04E4E", fontSize: "1.1rem" }}
                        className="ml-[.625rem]"
                        onClick={() => {
                          handleRemoveInput(index);
                          setIsValueExist(false);
                        }}
                      />
                    )}
                    <PlusCircleFilled
                      className="ml-[.625rem]"
                      style={{ color: "#2853E4", fontSize: "1.1rem" }}
                      onClick={() => {
                        setRegionDataItem({
                          ...regionDataItem,
                          regionAreaNames: [
                            ...regionDataItem.regionAreaNames,
                            "",
                          ],
                        });
                        setIsValueExist(false);
                      }}
                    />
                  </div>
                  {isValueExist && (
                    <div className=" text-red-500">请输入区域名称</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </CustomModal>
  );
};
