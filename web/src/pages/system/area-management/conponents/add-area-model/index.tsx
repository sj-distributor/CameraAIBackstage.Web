import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Input } from "antd";

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
    setIsValueExist,
    isValueExist,
    isLoading,
    language,
    source,
  } = useAction(operateModalParams, initGetRegionList);

  const renderRequiredLabel = (translationKey: string) => {
    return (
      <div
        className={`mr-2 mt-[0.4rem] whitespace-nowrap flex justify-end ${
          language === "en" ? "w-[9.5rem]" : "w-[4.2rem]"
        }`}
      >
        <div className="text-red-500 mr-1 mt-[0.1rem]">*</div>
        {t(translationKey, source)}
      </div>
    );
  };

  return (
    <CustomModal
      title={
        <div className="text-[1.25rem] font-semibold tracking-tight leading-[1.875rem]">
          {t(
            operateModalParams.isEdit ? KEYS.EDIT_AREA : KEYS.ADD_AREA,
            source
          )}
        </div>
      }
      onCancle={() => {
        setOperateModalParams({ ...operateModalParams, isOpen: false });
        setIsValueExist(false);
      }}
      onConfirm={() => {
        if (
          regionDataItem?.regionAddress?.trim() === "" ||
          !regionDataItem?.locationId?.trim() ||
          (operateModalParams.isEdit
            ? regionDataItem?.areaName?.trim() === ""
            : regionDataItem?.areaNames?.some((name) => name.trim() === ""))
        ) {
          setIsValueExist(true);

          return;
        }

        handleCreateOrUpdateRegionItem();
        setOperateModalParams({ ...operateModalParams, isOpen: false });
        setIsValueExist(false);
      }}
      open={operateModalParams.isOpen}
      className="customDeviceModal"
      modalWidth="42.5rem"
      destroyOnClose={true}
      forceRender={true}
      confirmLoading={isLoading}
    >
      <>
        <div className={`flex ${!isValueExist ? "mb-[1.5rem]" : ""}`}>
          {renderRequiredLabel(t(KEYS.WAREHOUSE_ID, source))}
          <Input
            placeholder={t(KEYS.PLEASE_INPUT, source)}
            className="w-[24.9375rem] h-[2.0625rem]"
            onChange={(e) =>
              handleUpdateDataChange("locationId", e.target.value)
            }
            value={regionDataItem.locationId}
            status={isValueExist ? "error" : undefined}
          />
        </div>
        {isValueExist && (
          <div className="ml-[4.7rem] text-red-500 mb-[0.8rem]">
            {t(KEYS.REQUIRED_FIELDS, source)}
          </div>
        )}
        <div className={`flex ${!isValueExist ? "mb-[1.5rem]" : ""}`}>
          {renderRequiredLabel(KEYS.AREA_ADDRESS)}
          <Input
            placeholder={t(KEYS.PLEASE_INPUT, source)}
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
            {t(KEYS.REQUIRED_FIELDS, source)}
          </div>
        )}
        <div className="flex ml-6 mb-[1.5rem]">
          <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
            {t(KEYS.PRINCIPAL, source)}
          </div>
          <Input
            placeholder={t(KEYS.PLEASE_SELECT, source)}
            className="!w-[24.9375rem] h-[2.0625rem]"
            value={regionDataItem.principal}
            onChange={(e) =>
              handleUpdateDataChange("principal", e.target.value)
            }
          />
        </div>
        {operateModalParams.isEdit ? (
          <>
            <div className="flex">
              {renderRequiredLabel(KEYS.MODAL_AREA_NAME)}
              <Input
                placeholder={t(KEYS.ZONE_NAME, source)}
                className="w-[24.9375rem] h-[2.0625rem]"
                onChange={(e) =>
                  handleUpdateDataChange("areaName", e.target.value)
                }
                value={regionDataItem.areaName}
                status={isValueExist ? "error" : undefined}
              />
            </div>
            {isValueExist && (
              <div className="ml-[4.7rem] text-red-500">
                {t(KEYS.REQUIRED_FIELDS, source)}
              </div>
            )}
          </>
        ) : (
          <div className="flex">
            {renderRequiredLabel(KEYS.MODAL_AREA_NAME)}
            <div>
              {regionDataItem?.areaNames?.map((field, index) => (
                <div
                  className={`${index !== 0 ? "mt-[1.5rem]" : ""} ${
                    index !== 0 && isValueExist ? "mt-[0.8rem]" : ""
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
                          "areaNames",
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
                          areaNames: [...regionDataItem.areaNames!, ""],
                        });
                        setIsValueExist(false);
                      }}
                    />
                  </div>
                  {isValueExist && (
                    <div className=" text-red-500">
                      {t(KEYS.REQUIRED_FIELDS, source)}
                    </div>
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
