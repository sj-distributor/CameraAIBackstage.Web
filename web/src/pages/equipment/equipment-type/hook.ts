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
import { Form } from "antd";

export const useAction = () => {
  const { t } = useAuth();
  const [form] = Form.useForm();

  const [isAddTypeOpen, setIsAddTypeOpen] = useState<boolean>(false);

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);

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
      // isAdd
      //   ?
      PostCreateEquipmentType({
        equipmentType: {
          name: typeName,
          description: description,
        },
      }).then(() => {
        initGetEquipmentTypeList();
        setIsAddTypeOpen(false);
      });
      // : PostUpdateEquipmentType({
      //     equipmentType: {
      //       name: typeName,
      //       description: description,
      //     },
      //   }).then(() => {
      //     initGetEquipmentTypeList();
      //     setIsAddTypeOpen(false);
      //   });
    });
  };

  useEffect(() => {
    initGetEquipmentTypeList();
  }, []);

  return {
    isAddTypeOpen,
    setIsAddTypeOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isModifyOpen,
    setIsModifyOpen,
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
  };
};
