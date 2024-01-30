import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IDeviceDataType, IOptionDto } from "./props";
import { IEquipmentList, IPageDto } from "@/services/dtos/equipment/list";
import {
  GetEquipmentPage,
  PostCreateEquipment,
  PostDeleteEquipment,
  PostUpdateEquipment,
} from "@/services/api/equipment/list";
import { Form, message } from "antd";
import { GetEquipmentTypePage } from "@/services/api/equipment/type";
import { useBoolean } from "ahooks";

export const useAction = () => {
  const { t } = useAuth();

  const [form] = Form.useForm();

  const source = { ns: "equipmentList" };

  const [data, setData] = useState<IEquipmentList[]>([]);

  const [dataTotalCount, setDataTotalCount] = useState<number>(0);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [loading, loadingAction] = useBoolean(false);

  const [deviceData, setDeviceData] = useState<IDeviceDataType[]>([
    {
      radio: true,
      areaId: "1",
      areaName: "",
      areaAddress: "",
      person: "",
    },
  ]);

  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isBindingOpen, setIsBindingOpen] = useState<boolean>(false);

  const [isAddOrUpdateOpen, setIsAddOrUpdateOpen] = useState<boolean>(false);

  const [isUnbindIndex, setIsUnbindIndex] = useState<number>(0);

  const [isDeleteId, setIsDeleteId] = useState<string>("");

  const [isAddOrEdit, setIsAddOrEdit] = useState<boolean>(false); //true:添加 false:編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const [checkedId, setCheckedId] = useState<string>("");

  const [isSearchOnline, setIsSearchOnline] = useState<boolean | undefined>(
    undefined
  );

  const [isSearchBind, setIsSearchBind] = useState<boolean | undefined>(
    undefined
  );

  const [searchKey, setSearchKey] = useState<string>("");

  const [equipmentId, setEquipmentId] = useState<string>("");

  const [equipmentType, setEquipmentType] = useState<number | undefined>(
    undefined
  );

  const [equipmentName, setEquipmentName] = useState<string>("");

  const [equipmentTypesOption, setEquipmentTypesOption] = useState<
    IOptionDto[]
  >([]);

  const onAddSubmit = (isAdd: boolean) => {
    form.validateFields(["deviceId"]);
    form.validateFields(["deviceName"]);
    form.validateFields(["deviceType"]);

    if (equipmentId && equipmentName && equipmentType) {
      isAdd
        ? PostCreateEquipment({
            equipment: {
              equipmentCode: equipmentId,
              equipmentName: equipmentName,
              equipmentTypeId: equipmentType,
            },
          })
            .then(() => {
              setIsAddOrUpdateOpen(false);
              initGetEquipmentList();
            })
            .catch((err) => message.error(`創建失敗：${err}`))
        : PostUpdateEquipment({
            equipment: {
              equipmentCode: equipmentId,
              equipmentName: equipmentName,
              equipmentTypeId: equipmentType,
              id: clickEditId,
            },
          })
            .then(() => {
              setIsAddOrUpdateOpen(false);
              initGetEquipmentList();
            })
            .catch((err) => message.error(`更新失敗：${err}`));
    }
  };

  const initGetEquipmentList = () => {
    loadingAction.setTrue();
    GetEquipmentPage(pageDto)
      .then((res) => {
        setData(res.equipments);
        setDataTotalCount(res.count);
      })
      .catch((error) => {
        message.error(error);
        setData([]);
        setDataTotalCount(0);
      })
      .finally(() => loadingAction.setFalse());
  };

  const onDelete = () => {
    PostDeleteEquipment(isDeleteId)
      .then(() => {
        initGetEquipmentList();
        setIsDeleteDeviceOpen(false);
      })
      .catch((error) => message.error(`刪除失敗：${error}`));
  };

  useEffect(() => {
    initGetEquipmentList();
  }, [pageDto]);

  useEffect(() => {
    GetEquipmentTypePage({ PageIndex: 1, PageSize: 2147483647 })
      .then((res) => {
        const list = res.equipmentTypes.map((item) => {
          return { label: item.name, value: item.id };
        });
        setEquipmentTypesOption(list);
      })
      .catch(() => {
        setEquipmentTypesOption([]);
      });
  }, []);

  return {
    source,
    isUnbindOpen,
    setIsUnbindOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isBindingOpen,
    setIsBindingOpen,
    isAddOrUpdateOpen,
    setIsAddOrUpdateOpen,
    isUnbindIndex,
    setIsUnbindIndex,
    setIsDeleteId,
    data,
    setData,
    deviceData,
    t,
    setPageDto,
    searchKey,
    setSearchKey,
    isSearchOnline,
    setIsSearchOnline,
    isSearchBind,
    setIsSearchBind,
    equipmentId,
    setEquipmentId,
    equipmentType,
    setEquipmentType,
    equipmentName,
    setEquipmentName,
    onAddSubmit,
    form,
    equipmentTypesOption,
    dataTotalCount,
    loading,
    checkedId,
    setCheckedId,
    onDelete,
    isAddOrEdit,
    setIsAddOrEdit,
    setClickEditId,
  };
};
