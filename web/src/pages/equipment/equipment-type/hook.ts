import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IPageDto } from "@/services/dtos/equipment/list";
import {
  GetEquipmentTypePage,
  PostCreateEquipmentType,
  PostUpdateEquipmentType,
} from "@/services/api/equipment/type";
import { IEquipmentTypeList } from "@/services/dtos/equipment/type";
import { useBoolean } from "ahooks";
import { Form, message } from "antd";

export const useAction = () => {
  const { t } = useAuth();
  const [form] = Form.useForm();

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isAddOrModifyOpen, setIsAddOrModifyOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });
  const [totalListCount, setTotalListCount] = useState<number>(0);

  const [data, setData] = useState<IEquipmentTypeList[]>([]);

  const [loading, loadingAction] = useBoolean(false);

  const [typeName, setTypeName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [isAddOrUpdate, setIsAddOrUpdate] = useState<boolean>(false); // true:添加，false：編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const initGetEquipmentTypeList = () => {
    loadingAction.setTrue();
    GetEquipmentTypePage(pageDto)
      .then((res) => {
        setData(res.equipmentTypes);
        setTotalListCount(res.count);
      })
      .finally(() => loadingAction.setFalse());
  };

  const onIsAddSubmit = (isAdd: boolean) => {
    form.validateFields(["typeName"]).then(() => {
      isAdd
        ? PostCreateEquipmentType({
            equipmentType: {
              name: typeName,
              description: description,
            },
          })
            .then(() => {
              initGetEquipmentTypeList();
              setIsAddOrModifyOpen(false);
            })
            .catch((err) => {
              message.error(`新增失敗:${err}`);
            })
        : PostUpdateEquipmentType({
            equipmentType: {
              name: typeName,
              description: description,
              id: clickEditId,
            },
          })
            .then(() => {
              initGetEquipmentTypeList();
              setIsAddOrModifyOpen(false);
            })
            .catch((err) => {
              message.error(`新增失敗:${err}`);
            });
    });
  };

  useEffect(() => {
    initGetEquipmentTypeList();
  }, [pageDto]);

  return {
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isAddOrModifyOpen,
    setIsAddOrModifyOpen,
    isDeleteIndex,
    setIsDeleteIndex,
    data,
    setData,
    t,
    setPageDto,
    loading,
    typeName,
    setTypeName,
    description,
    setDescription,
    totalListCount,
    onIsAddSubmit,
    form,
    isAddOrUpdate,
    setIsAddOrUpdate,
    clickEditId,
    setClickEditId,
  };
};
