import { useState } from "react";

import { IAreaManagementData } from "./props";

export const useAction = () => {
  const data: IAreaManagementData[] = [
    {
      areaId: 1,
      areaName: "Jim Green",
      areaAddress: "Janny创建了角色经理",
      person: "Jim Green",
    },
    {
      areaId: 2,
      areaName: "Jim Green",
      areaAddress: "Janny创建了角色经理",
      person: "Jim Green",
    },
    {
      areaId: 3,
      areaName: "Jim Green",
      areaAddress: "Janny创建了角色经理",
      person: "Jim Green",
    },
    {
      areaId: 4,
      areaName: "Jim Green",
      areaAddress: "Janny创建了角色经理",
      person: "Jim Green",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [inputFields, setInputFields] = useState([{ id: 1 }]);

  const handleAddInput = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1 }]);
  };

  const handleRemoveInput = (id: number) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  return {
    data,
    isModalOpen,
    setIsModalOpen,
    isDeleteIndex,
    setIsDeleteIndex,
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    setIsTableLoading,
    handleAddInput,
    handleRemoveInput,
    inputFields,
  };
};
