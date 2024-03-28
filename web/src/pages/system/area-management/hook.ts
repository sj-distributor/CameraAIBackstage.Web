import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetAreaManagementPage,
  PostDeleteAreaId,
} from "@/services/api/area-management";
import {
  IAreaManagementPageResponse,
  IRegionsDto,
} from "@/services/dtos/area-management";

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

  const [searchIconValue, setSearchIconValue] = useState<string>("");

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
      Keyword: searchIconValue,
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
    if (searchValue === "") setSearchIconValue("");
  }, [searchValue]);

  useEffect(() => {
    initGetRegionList();
  }, [searchIconValue, pageDto.pageSize, pageDto.pageIndex]);

  return {
    searchValue,
    pageDto,
    setSearchValue,
    setPageDto,
    t,
    isRegionListLoading,
    setSearchIconValue,
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
