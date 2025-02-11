import { useMemoizedFn } from "ahooks";
import { useState } from "react";

import { KeysOf, ValuesOf } from "@/utils/type";

import {
  AccessTypeEnum,
  IAcccessListProps,
  IPaginationDtoProps,
} from "./props";

const mockListData: IAcccessListProps[] = [
  {
    id: "1",
    type: AccessTypeEnum.RollDoor,
    name: "A区",
    picture:
      "https://smartiestest.oss-cn-hongkong.aliyuncs.com/20241217/6be331e8-0b6a-4a65-aeb8-e14f70407c33.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=zhqP7kcVoYACfR7K6rmQkC3sQSk%3D",
    remark: "廣東省中山市東區中山六路12號",
    createTime: "2024-09-23 14:11:12",
  },
  {
    id: "2",
    type: AccessTypeEnum.SafeDoor,
    name: "B区",
    picture:
      "https://smartiestest.oss-cn-hongkong.aliyuncs.com/20241217/6be331e8-0b6a-4a65-aeb8-e14f70407c33.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=zhqP7kcVoYACfR7K6rmQkC3sQSk%3D",
    remark: "廣東省中山市東區中山六路12號",
    createTime: "2024-09-23 14:11:12",
  },
  {
    id: "3",
    type: AccessTypeEnum.RollDoor,
    name: "C区",
    picture:
      "https://smartiestest.oss-cn-hongkong.aliyuncs.com/20241217/6be331e8-0b6a-4a65-aeb8-e14f70407c33.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=zhqP7kcVoYACfR7K6rmQkC3sQSk%3D",
    remark: "廣東省中山市東區中山六路12號",
    createTime: "2024-09-23 14:11:12",
  },
];

const mockCamera = [
  {
    id: 1,
    regionAddress: "区域地址A",
    cameras: [
      {
        id: 10,
        equipmentName: "设备名称1",
      },
      {
        id: 11,
        equipmentName: "设备名称2",
      },
    ],
  },
  {
    id: 2,
    regionAddress: "区域地址B",
    cameras: [
      {
        id: 20,
        equipmentName: "设备名称3",
      },
      {
        id: 21,
        equipmentName: "设备名称4",
      },
    ],
  },
];

export const useAction = () => {
  const [addOrUpdateModal, setAddOrUpdateModal] = useState<boolean>(false);

  const [accessListData, setAccessListData] = useState<{
    count: number;
    data: IAcccessListProps[];
  }>({
    count: 100,
    data: mockListData,
  });

  const [paginationDto, setPaginationDto] = useState<IPaginationDtoProps>({
    PageIndex: 1,
    PageSize: 10,
    accessType: null,
  });

  const updatePaginationDto = useMemoizedFn(
    (k: KeysOf<IPaginationDtoProps>, v: ValuesOf<IPaginationDtoProps>) => {
      setPaginationDto((prev) => ({
        ...prev,
        [k]: v,
      }));
    }
  );

  return {
    paginationDto,
    accessListData,
    addOrUpdateModal,
    mockCamera,
    updatePaginationDto,
    setAddOrUpdateModal,
  };
};
