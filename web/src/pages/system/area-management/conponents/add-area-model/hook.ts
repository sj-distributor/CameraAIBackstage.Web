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
  const { t } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isValueExist, setIsValueExist] = useState<boolean>(false);

  const initialRegionDataItem = {
    id: 0,
    areaId: 0,
    areaName: "",
    regionAddress: "",
    regionAreaNames: [""],
    principal: "",
    createdTime: "",
  };

  const [regionDataItem, setRegionDataItem] = useState<IRegionsDto>(
    operateModalParams?.recordItem ?? initialRegionDataItem
  );

  const handleRemoveInput = (indexToRemove: number) => {
    const updatedRegionAreaNames = [...regionDataItem.regionAreaNames];

    updatedRegionAreaNames.splice(indexToRemove, 1);

    setRegionDataItem({
      ...regionDataItem,
      regionAreaNames: updatedRegionAreaNames,
    });
  };

  const handleUpdateDataChange = (
    key: string,
    value: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedRegionAreaNames = [...regionDataItem.regionAreaNames];

      updatedRegionAreaNames[index] = value;

      setRegionDataItem({
        ...regionDataItem,
        regionAreaNames: updatedRegionAreaNames,
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
      regionAndArea: operateModalParams.isEdit
        ? regionDataItem
        : {
            regionAddress: regionDataItem?.regionAddress,
            regionAreaNames: regionDataItem?.regionAreaNames,
            principal: regionDataItem?.principal,
          },
    })
      .then(() => initGetRegionList())
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setRegionDataItem(operateModalParams?.recordItem ?? initialRegionDataItem);
  }, [operateModalParams?.recordItem]);

  return {
    regionDataItem,
    handleRemoveInput,
    t,
    handleCreateOrUpdateRegionItem,
    handleUpdateDataChange,
    setRegionDataItem,
    initialRegionDataItem,
    setIsValueExist,
    isValueExist,
    isLoading,
  };
};