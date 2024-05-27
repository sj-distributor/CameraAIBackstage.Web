import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetAreaManagementPage,
  PostDeleteAreaId,
} from "@/services/api/area-management";
import { IAreaManagementPageResponse } from "@/services/dtos/area-management";

import { IModifyModalDto } from "./props";

export const useAction = () => {
  const { t, myPermissions } = useAuth();

  const source = { ns: "areaManagement" };

  const initialRegionDataItem = {
    regionAddress: "",
    areaNames: [""],
    principal: "",
    locationId: "",
  };

  const initialRegionListDto = { count: 0, regions: [] };

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [isRegionListLoading, setIsRegionListLoading] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [regionListDto, setRegionListDto] =
    useState<IAreaManagementPageResponse>(initialRegionListDto);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
    keyword?: string;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [operateModalParams, setOperateModalParams] = useState<IModifyModalDto>(
    {
      isOpen: false,
      isEdit: false,
      recordItem: initialRegionDataItem,
    }
  );

  const initGetRegionList = () => {
    setIsRegionListLoading(true);
    GetAreaManagementPage({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      Keyword: pageDto.keyword,
    })
      .then((res) => {
        if (res) setRegionListDto({ count: res.count, regions: res.regions });
      })
      .catch(() => {
        setRegionListDto(initialRegionListDto);
        message.error("獲取區域管理數據失敗");
      })
      .finally(() => setIsRegionListLoading(false));
  };

  const handleDeleteById = (areaId: number) => {
    PostDeleteAreaId({
      AreaId: areaId,
    })
      .then(() => {
        if (pageDto.pageIndex > 1 && regionListDto.regions.length === 1) {
          setPageDto((pre) => ({
            ...pre,
            pageIndex: pre.pageIndex - 1,
          }));
        } else {
          initGetRegionList();
        }
      })
      .catch(() => {
        message.error("刪除失敗");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    initGetRegionList();
  }, [pageDto]);

  return {
    pageDto,
    setPageDto,
    t,
    isRegionListLoading,
    setIsDeleteOpen,
    isDeleteOpen,
    initGetRegionList,
    handleDeleteById,
    setOperateModalParams,
    operateModalParams,
    isLoading,
    source,
    initialRegionDataItem,
    regionListDto,
    myPermissions,
  };
};
