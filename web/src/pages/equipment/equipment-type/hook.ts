import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IPageDto } from "@/services/dtos/equipment/list";
import {
  GetEquipmentTypeInfoById,
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

  const source = { ns: "equipmentType" };

  const [data, setData] = useState<IEquipmentTypeList[]>([]);

  const [totalListCount, setTotalListCount] = useState<number>(0);

  const [loading, loadingAction] = useBoolean(false);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [isAddOrModifyOpen, setIsAddOrModifyOpen] = useState<boolean>(false);

  const [typeName, setTypeName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [isAddOrUpdate, setIsAddOrUpdate] = useState<boolean>(false); // true:添加，false：編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

  const initGetEquipmentTypeList = () => {
    loadingAction.setTrue();
    GetEquipmentTypePage(pageDto)
      .then((res) => {
        setData(res.equipmentTypes);
        setTotalListCount(res.count);
      })
      .catch((err) => {
        message.error(err);
        setData([]);
        setTotalListCount(0);
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

  const onGetEquipmentInformationById = (id: number) => {
    setIsEditLoading(true);
    GetEquipmentTypeInfoById({ EquipmentTypeId: id })
      .then((res) => {
        setTypeName(res.name);
        setDescription(res.description);
      })
      .catch((err) => {
        setTypeName("");
        setDescription("");
        message.error(`获取信息失败：${err}`);
      })
      .finally(() => setIsEditLoading(false));
    setClickEditId(id);
  };

  useEffect(() => {
    initGetEquipmentTypeList();
  }, [pageDto]);

  return {
    source,
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
    onGetEquipmentInformationById,
    isEditLoading,
  };
};
