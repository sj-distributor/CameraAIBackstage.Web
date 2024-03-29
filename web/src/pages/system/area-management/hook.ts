import { useDebounce } from "ahooks";
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

  const [searchValue, setSearchValue] = useState<string>("");

  const filterKeyword = useDebounce(searchValue, { wait: 500 });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [regionListDto, setRegionListDto] =
    useState<IAreaManagementPageResponse>(initialRegionListDto);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
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
      Keyword: filterKeyword,
    })
      .then((res) => {
        if (res) setRegionListDto({ count: res.count, regions: res.regions });
      })
      .catch((err) => {
        setRegionListDto(initialRegionListDto);
        message.error(err);
      })
      .finally(() => setIsRegionListLoading(false));
  };

  const handleDeleteById = (areaId: number) => {
    PostDeleteAreaId({
      AreaId: areaId,
    })
      .then(() => initGetRegionList())
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    initGetRegionList();
  }, [filterKeyword, pageDto.pageSize, pageDto.pageIndex]);

  return {
    searchValue,
    pageDto,
    setSearchValue,
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
