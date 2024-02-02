import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IBondOrNot, IOnlineOrNot, IOptionDto } from "./props";
import {
  IEquipmentCreateOrUpdateDto,
  IEquipmentList,
  IPageDto,
  IRegionDto,
} from "@/services/dtos/equipment/list";
import {
  GetEquipmentInfoById,
  GetEquipmentPage,
  GetRegionPage,
  PostCreateEquipment,
  PostDeleteEquipment,
  PostEquipmentBind,
  PostEquipmentUnBind,
  PostUpdateEquipment,
} from "@/services/api/equipment/list";
import { App, Form } from "antd";
import { GetEquipmentTypePage } from "@/services/api/equipment/type";
import { useBoolean, useDebounce, useUpdateEffect } from "ahooks";

export const useAction = () => {
  const { t, language } = useAuth();

  const [form] = Form.useForm();

  const { message } = App.useApp();

  const source = { ns: "equipmentList" };

  const [data, setData] = useState<IEquipmentList[]>([]);

  const [dataTotalCount, setDataTotalCount] = useState<number>(0);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [loading, loadingAction] = useBoolean(false);

  const [isUnbindOpen, setIsUnbindOpen] = useState<boolean>(false);

  const [isBindingOpen, setIsBindingOpen] = useState<boolean>(false);

  const [bindId, setBindId] = useState<number>(0);

  const [bindAreaId, setBindAreaId] = useState<number | null>(null);

  const [isDeleteDeviceOpen, setIsDeleteDeviceOpen] = useState<boolean>(false);

  const [isDeleteId, setIsDeleteId] = useState<number | null>(null);

  const [isAddOrUpdateOpen, setIsAddOrUpdateOpen] = useState<boolean>(false);

  const [isAddOrEdit, setIsAddOrEdit] = useState<boolean>(false); //true:添加 false:編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const [editLoding, setEditLoading] = useState<boolean>(false);

  const [searchKey, setSearchKey] = useState<string>("");

  const debouncedValue = useDebounce(searchKey, { wait: 800 });

  const [isSearchOnline, setIsSearchOnline] = useState<
    IOnlineOrNot | undefined
  >(undefined);

  const [isSearchBind, setIsSearchBind] = useState<IBondOrNot | undefined>(
    undefined
  );

  const [equipmentId, setEquipmentId] = useState<string>("");

  const [equipmentType, setEquipmentType] = useState<string>("");

  const [equipmentName, setEquipmentName] = useState<string>("");

  const [equipmentTypeId, setEquipmentTypeId] = useState<number | null>(null);

  const [equipmentTypesOption, setEquipmentTypesOption] = useState<
    IOptionDto[]
  >([]);

  const [regionData, setRegionData] = useState<IRegionDto[]>([]);

  const [regionLoading, setRegionLoading] = useState<boolean>(false);

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const initGetEquipmentList = () => {
    loadingAction.setTrue();
    GetEquipmentPage({
      PageIndex: pageDto.PageIndex,
      PageSize: pageDto.PageSize,
      Keyword: searchKey,
      IsOnline: Boolean(isSearchOnline),
      IsBind: Boolean(isSearchBind),
    })
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

  const onGetEquipmentInformationById = async (id: number) => {
    setEditLoading(true);
    await GetEquipmentInfoById({ EquipmentId: id })
      .then((res) => {
        setEquipmentId(res.equipmentCode ?? "");
        setEquipmentName(res.equipmentName ?? "");
        setEquipmentType(res.equipmentType);
        setEquipmentTypeId(res.equipmentTypeId ?? null);
        form.setFieldsValue({
          deviceId: res.equipmentCode,
          deviceName: res.equipmentName,
          deviceType: res.equipmentType,
        });
      })
      .catch((err) => {
        setEquipmentId("");
        setEquipmentName("");
        setEquipmentType("");
        setEquipmentTypeId(null);
        form.setFieldsValue({
          deviceId: "",
          deviceName: "",
          deviceType: "",
        });
        message.error(`获取信息失败：${err}`);
      })
      .finally(() => {
        setEditLoading(false);
      });
    setClickEditId(id);
  };

  const handleUpdate = () => {
    const data: IEquipmentCreateOrUpdateDto = {
      equipmentCode: equipmentId,
      equipmentName: equipmentName,
      equipmentTypeId: equipmentTypeId,
      id: clickEditId,
    };
    setConfirmLoading(true);
    PostUpdateEquipment({
      equipment: data,
    })
      .then(() => {
        setIsAddOrUpdateOpen(false);
        initGetEquipmentList();
        setIsBindingOpen(false);
        setEquipmentId("");
        setEquipmentName("");
        setEquipmentType("");
        setEquipmentTypeId(null);
        form.setFieldsValue({
          deviceId: "",
          deviceName: "",
          deviceType: "",
        });
      })
      .catch((err) => message.error(`更新失敗：${err}`))
      .finally(() => setConfirmLoading(false));
  };

  const handleCreate = () => {
    setConfirmLoading(true);
    PostCreateEquipment({
      equipment: {
        equipmentCode: equipmentId,
        equipmentName: equipmentName,
        equipmentTypeId: equipmentTypeId,
      },
    })
      .then(() => {
        setIsAddOrUpdateOpen(false);
        initGetEquipmentList();
        setEquipmentId("");
        setEquipmentName("");
        setEquipmentType("");
        setEquipmentTypeId(null);
        form.setFieldsValue({
          deviceId: "",
          deviceName: "",
          deviceType: "",
        });
      })
      .catch((err) => message.error(`新增失敗：${err}`))
      .finally(() => setConfirmLoading(false));
  };

  const onAddOrUpdateSubmit = (isAdd: boolean) => {
    form.validateFields(["deviceId"]);
    form.validateFields(["deviceName"]);
    form.validateFields(["deviceType"]);

    if (equipmentId && equipmentName && equipmentType) {
      isAdd ? handleCreate() : handleUpdate();
    }
  };

  const onDelete = () => {
    if (isDeleteId === null) return;
    setConfirmLoading(true);
    PostDeleteEquipment({ EquipmentId: isDeleteId })
      .then(() => {
        initGetEquipmentList();
        setIsDeleteDeviceOpen(false);
      })
      .catch((error) => message.error(`刪除失敗：${error}`))
      .finally(() => setConfirmLoading(false));
  };

  const onOpenBind = () => {
    setRegionLoading(true);
    GetRegionPage()
      .then((res) => {
        const newList = res.regions.map((item) => {
          return { ...item, radio: false };
        });
        setRegionData(newList);
      })
      .catch((err) => {
        message.error(`获取数据失败：${err}`);
        setRegionData([]);
      })
      .finally(() => {
        setRegionLoading(false);
      });
  };

  const onConfirmBind = () => {
    if (bindAreaId === null) {
      message.warning("请至少选一个设备");
      return;
    }
    setConfirmLoading(true);
    PostEquipmentBind({
      binding: {
        equipmentId: bindId,
        areaId: bindAreaId,
      },
    })
      .then(() => {
        initGetEquipmentList();
        setIsBindingOpen(false);
      })
      .catch((err) => message.error(`绑定失败：${err}`))
      .finally(() => setConfirmLoading(false));
  };

  const onConfirmUnBind = () => {
    setConfirmLoading(true);
    PostEquipmentUnBind({
      binding: {
        equipmentId: bindId,
      },
    })
      .then(() => {
        initGetEquipmentList();
        setIsUnbindOpen(false);
      })
      .catch((err) => message.error(`解绑失败：${err}`))
      .finally(() => setConfirmLoading(false));
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

  useUpdateEffect(() => {
    initGetEquipmentList();
  }, [debouncedValue, isSearchOnline, isSearchBind]);

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
    setBindId,
    setIsDeleteId,
    data,
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
    onAddOrUpdateSubmit,
    form,
    equipmentTypesOption,
    dataTotalCount,
    loading,
    bindAreaId,
    setBindAreaId,
    onDelete,
    isAddOrEdit,
    setIsAddOrEdit,
    onGetEquipmentInformationById,
    editLoding,
    setEquipmentTypeId,
    language,
    onOpenBind,
    regionLoading,
    regionData,
    onConfirmBind,
    confirmLoading,
    pageDto,
    onConfirmUnBind,
  };
};
