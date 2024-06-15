import { useBoolean } from "ahooks";
import { App, Form } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetEquipmentTypeInfoById,
  GetEquipmentTypePage,
  PostCreateEquipmentType,
  PostDeleteEquipmentType,
  PostUpdateEquipmentType,
} from "@/services/api/equipment/type";
import {
  CameraAiEquipmentTypeLabel,
  IEquipmentTypeList,
} from "@/services/dtos/equipment/type";
import { IPageDto } from "@/services/dtos/public";

export const useAction = () => {
  const { t, language, myPermissions } = useAuth();

  const [form] = Form.useForm();

  const { message } = App.useApp();

  const source = { ns: "equipmentType" };

  const [data, setData] = useState<IEquipmentTypeList[]>([]);

  const [totalListCount, setTotalListCount] = useState<number>(0);

  const [loading, loadingAction] = useBoolean(false);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [isAddOrModifyOpen, setIsAddOrModifyOpen] = useState<boolean>(false);

  const [isAddOrUpdate, setIsAddOrUpdate] = useState<boolean>(false); // true:添加，false：編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isDeleteId, setIsDeleteId] = useState<number | null>(null);

  const [typeName, setTypeName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [typeLabel, setTypeLabel] = useState<CameraAiEquipmentTypeLabel>(
    CameraAiEquipmentTypeLabel.Camera
  );

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const initGetEquipmentTypeList = () => {
    loadingAction.setTrue();
    GetEquipmentTypePage(pageDto)
      .then((res) => {
        setData(res.equipmentTypes);
        setTotalListCount(res.count);
      })
      .catch((err) => {
        message.error((err as Error).message);
        setData([]);
        setTotalListCount(0);
      })
      .finally(() => loadingAction.setFalse());
  };

  const onGetEquipmentTypeInfoById = (id: number) => {
    setIsEditLoading(true);
    GetEquipmentTypeInfoById({ EquipmentTypeId: id })
      .then((res) => {
        setTypeName(res.name);
        setDescription(res.description);
        form.setFieldsValue({
          typeName: res.name,
          description: res.description,
        });
      })
      .catch((err) => {
        setTypeName("");
        setDescription("");
        message.error(`获取信息失败：${(err as Error).message}`);
      })
      .finally(() => setIsEditLoading(false));
    setClickEditId(id);
  };

  const handleCreate = () => {
    PostCreateEquipmentType({
      equipmentType: {
        name: typeName,
        description: description,
        label: typeLabel ?? CameraAiEquipmentTypeLabel.Camera,
      },
    })
      .then(() => {
        setIsAddOrModifyOpen(false);
        form.setFieldsValue({
          typeName: "",
          description: "",
        });
        setTypeName("");
        setDescription("");
        setTypeLabel(CameraAiEquipmentTypeLabel.Camera);
        initGetEquipmentTypeList();
      })
      .catch((err) => {
        message.error(`新增失敗:${(err as Error).message}`);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleUpdate = () => {
    PostUpdateEquipmentType({
      equipmentType: {
        name: typeName,
        description: description,
        id: clickEditId,
        label: typeLabel,
      },
    })
      .then(() => {
        setIsAddOrModifyOpen(false);
        form.setFieldsValue({
          typeName: "",
          description: "",
        });
        setTypeName("");
        setDescription("");
        setTypeLabel(CameraAiEquipmentTypeLabel.Camera);
        initGetEquipmentTypeList();
      })
      .catch((err) => {
        message.error(`新增失敗:${(err as Error).message}`);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const onAddOrUpdateSubmit = (isAdd: boolean) => {
    form.validateFields(["typeName"]).then(() => {
      setConfirmLoading(true);
      isAdd ? handleCreate() : handleUpdate();
    });
  };

  const onDelete = () => {
    if (isDeleteId === null) return;
    setConfirmLoading(true);
    PostDeleteEquipmentType({ EquipmentTypeId: isDeleteId })
      .then(() => {
        initGetEquipmentTypeList();
      })
      .catch((err) => {
        message.error(`删除失败：${(err as Error).message}`);
      })
      .finally(() => setConfirmLoading(false));
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
    onAddOrUpdateSubmit,
    form,
    isAddOrUpdate,
    setIsAddOrUpdate,
    clickEditId,
    onGetEquipmentTypeInfoById,
    isEditLoading,
    setIsDeleteId,
    onDelete,
    confirmLoading,
    language,
    pageDto,
    myPermissions,
    typeLabel,
    setTypeLabel,
  };
};
