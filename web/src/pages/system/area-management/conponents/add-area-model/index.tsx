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
      }}
      onConfirm={() => {
        handleCreateOrUpdateRegionItem();
        setOperateModalParams({
          isOpen: false,
          isEdit: false,
          recordItem: initialRegionDataItem,
        });
      }}
      open={operateModalParams.isOpen}
      className={"customDeviceModal"}
      modalWidth="42.5rem"
      destroyOnClose={true}
      forceRender={true}
    >
      <>
        <div className="flex mb-[1.5rem]">
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
          />
        </div>
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
            />
          </div>
        ) : (
          <div className="flex mb-[1.5rem]">
            <div className="text-red-500 mr-1 mt-[0.5rem]">*</div>
            <div className="mr-2 mt-[0.4rem] whitespace-nowrap">
              {t(KEYS.MODAL_AREA_NAME, { ns: "areaManagement" })}
            </div>
            <div>
              {regionDataItem?.regionAreaNames?.map((field, index) => (
                <div className="flex mb-[1.25rem]" key={index}>
                  <div className="text-[.875rem] mr-[.625rem]">
                    <Input
                      placeholder={t(KEYS.ZONE_NAME, { ns: "areaManagement" })}
                      className="w-[24.9375rem] h-[2.0625rem]"
                      value={field}
                      onChange={(e) =>
                        handleUpdateDataChange(
                          "regionAreaNames",
                          e.target.value,
                          index
                        )
                      }
                    />
                  </div>
                  {index !== 0 && (
                    <MinusCircleFilled
                      style={{ color: "#F04E4E", fontSize: "1.1rem" }}
                      className="mr-[.625rem]"
                      onClick={() => handleRemoveInput(index)}
                    />
                  )}
                  <PlusCircleFilled
                    style={{ color: "#2853E4", fontSize: "1.1rem" }}
                    onClick={() =>
                      setRegionDataItem({
                        ...regionDataItem,
                        regionAreaNames: [
                          ...regionDataItem.regionAreaNames,
                          "",
                        ],
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </CustomModal>
  );
};
