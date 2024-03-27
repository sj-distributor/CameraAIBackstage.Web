import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  PostCreateRegion,
  PostUpdateRegion,
} from "@/services/api/area-management";
import { IRegionsDto } from "@/services/dtos/area-management";

import { IModifyModalDto } from "../../props";

export const useAction = (
  operateModalParams: IModifyModalDto,
  initGetRegionList: () => void
) => {
  const { t, language } = useAuth();

  const source = { ns: "areaManagement" };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isValueExist, setIsValueExist] = useState<boolean>(false);

  const [regionDataItem, setRegionDataItem] = useState<IRegionsDto>(
    operateModalParams.recordItem
  );

  const handleRemoveInput = (indexToRemove: number) => {
    const updatedRegionAreaNames = [...regionDataItem.areaNames!];

    updatedRegionAreaNames.splice(indexToRemove, 1);

    setRegionDataItem({
      ...regionDataItem,
      areaNames: updatedRegionAreaNames,
    });
  };

  const handleUpdateDataChange = (
    key: string,
    value: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedRegionAreaNames = [...regionDataItem.areaNames!];

      updatedRegionAreaNames[index] = value;

      setRegionDataItem({
        ...regionDataItem,
        areaNames: updatedRegionAreaNames,
      });
    } else {
      setRegionDataItem({
        ...regionDataItem,
        [key]: value,
      });
    }
  };

  const handleCreateOrUpdateRegionItem = () => {
    setIsLoading(true);
    (operateModalParams.isEdit ? PostUpdateRegion : PostCreateRegion)({
      regionAndArea: regionDataItem,
    })
      .then(() => initGetRegionList())
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setRegionDataItem(operateModalParams.recordItem);
  }, [operateModalParams?.recordItem]);

  return {
    regionDataItem,
    handleRemoveInput,
    t,
    handleCreateOrUpdateRegionItem,
    handleUpdateDataChange,
    setRegionDataItem,
    setIsValueExist,
    isValueExist,
    isLoading,
    source,
    language,
  };
};
