import { Form, message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { GetAreaManagementRegion } from "@/services/api/area-management";
import { IRegionsDto } from "@/services/dtos/area-management";

export const useAction = (record: IRegionsDto) => {
  const { t } = useAuth();

  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [areaAddressValue, setAreaAddressValue] = useState<string>("");

  const [regionDataItem, setRegionDataItem] = useState<IRegionsDto>({
    id: 0,
    areaId: 0,
    areaName: "",
    regionAddress: "",
    regionAreaNames: [""],
    principal: "",
    createdTime: "",
  });

  const initGetRegionItem = () => {
    setIsLoading(true);
    GetAreaManagementRegion({
      RegionId: record.id,
      AreaId: record.areaId,
    })
      .then((res) => {
        const updatedRegionDataItem = {
          ...res,
          regionAreaNames: res.regionAreaNames || [""],
        };

        setRegionDataItem(updatedRegionDataItem);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRemoveInput = (indexToRemove: number) => {
    const updatedRegionAreaNames = [...regionDataItem.regionAreaNames];

    updatedRegionAreaNames.splice(indexToRemove, 1);

    setRegionDataItem({
      ...regionDataItem,
      regionAreaNames: updatedRegionAreaNames,
    });
  };

  const handleAddInput = () => {
    setRegionDataItem({
      ...regionDataItem,
      regionAreaNames: [...regionDataItem.regionAreaNames, ""],
    });
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedRegionAreaNames = [...regionDataItem.regionAreaNames];

    updatedRegionAreaNames[index] = value;

    setRegionDataItem({
      ...regionDataItem,
      regionAreaNames: updatedRegionAreaNames,
    });
  };

  useEffect(() => {
    initGetRegionItem();
  }, []);

  useEffect(() => {
    regionDataItem.areaId !== 0 && form.setFieldsValue(regionDataItem);
  }, [regionDataItem]);

  return {
    t,
    regionDataItem,
    form,
    setAreaAddressValue,
    handleRemoveInput,
    handleAddInput,
    handleInputChange,
    isLoading,
  };
};
