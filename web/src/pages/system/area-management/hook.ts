import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetAreaManagementPage,
  GetAreaManagementRegion,
  PostDeleteAreaId,
} from "@/services/api/area-management";
import { IRegionsDto } from "@/services/dtos/area-management";

export const useAction = () => {
  const { t } = useAuth();

  const initialRegionDataItem = {
    id: 0,
    areaId: 0,
    areaName: "",
    regionAddress: "",
    regionAreaNames: [""],
    principal: "",
    createdTime: "",
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isRegionListLoading, setIsRegionListLoading] =
    useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");

  const [record, setRecord] = useState<IRegionsDto>(initialRegionDataItem);

  const [searchIconValue, setSearchIconValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [regionListCount, setRegionListCount] = useState<number>(0);

  const [regionDataList, setRegionDataList] = useState<IRegionsDto[]>([]);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const initGetRegionList = () => {
    setIsRegionListLoading(true);
    GetAreaManagementPage({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      Keyword: searchIconValue,
    })
      .then((res) => {
        setRegionDataList(res.regions);
        setRegionListCount(res.count);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsRegionListLoading(false));
  };

  const initGetRegionItem = () => {
    setIsLoading(true);
    GetAreaManagementRegion({
      RegionId: record.id,
      AreaId: record.areaId,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
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

  const [inputFields, setInputFields] = useState<{ id: number }[]>([{ id: 1 }]);

  const handleAddInput = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1 }]);
  };

  const handleRemoveInput = (id: number) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  console.log(record);

  useEffect(() => {
    initGetRegionList();
  }, [searchIconValue, pageDto.pageSize, pageDto.pageIndex]);

  useEffect(() => {
    initGetRegionItem();
  }, []);

  return {
    isModalOpen,
    setIsModalOpen,
    isDeleteIndex,
    setIsDeleteIndex,
    searchValue,
    isLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    setIsLoading,
    handleAddInput,
    handleRemoveInput,
    inputFields,
    t,
    isRegionListLoading,
    regionListCount,
    regionDataList,
    setSearchIconValue,
    setRecord,
    record,
    setIsEdit,
    isEdit,
    initialRegionDataItem,
    handleDeleteById,
  };
};
