import { useBoolean, useDebounce, useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
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
import { GetEquipmentTypePage } from "@/services/api/equipment/type";
import {
  IEquipmentList,
  IEquipmentPageRequest,
  IRegionDto,
} from "@/services/dtos/equipment/list";
import { IPageDto } from "@/services/dtos/public";

import { IBondOrNot, IOnlineOrNot, IOptionDto } from "./props";

export const useAction = () => {
  const { t, language, myPermissions } = useAuth();

  const initialEquipmentData = {
    equipmentCode: "",
    equipmentName: "",
    equipmentTypeId: null,
    ipAddress: "",
    brand: "",
    username: "",
    password: "",
  };

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

  const [isAddOrEdit, setIsAddOrEdit] = useState<boolean>(false); // true:添加 false:編輯

  const [clickEditId, setClickEditId] = useState<number>(0);

  const [editLoding, setEditLoading] = useState<boolean>(false);

  const [searchKey, setSearchKey] = useState<string>("");

  const debouncedValue = useDebounce(searchKey, { wait: 500 });

  const [isSearchOnline, setIsSearchOnline] = useState<
    IOnlineOrNot | undefined
  >(undefined);

  const [isSearchBind, setIsSearchBind] = useState<IBondOrNot | undefined>(
    undefined
  );

  const [equipmentTypesOption, setEquipmentTypesOption] = useState<
    IOptionDto[]
  >([]);

  const [regionData, setRegionData] = useState<IRegionDto[]>([]);

  const [regionLoading, setRegionLoading] = useState<boolean>(false);

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const initGetEquipmentList = (
    PageIndex = pageDto.PageIndex,
    PageSize = pageDto.PageSize
  ) => {
    const data: IEquipmentPageRequest = {
      PageIndex,
      PageSize,
      Keyword: searchKey ? searchKey : undefined,
    };

    if (isSearchOnline !== undefined && isSearchOnline !== IOnlineOrNot.All) {
      data.IsOnline = Boolean(isSearchOnline);
    }
    if (isSearchBind !== undefined && isSearchBind !== IBondOrNot.All) {
      data.IsBind = Boolean(isSearchBind);
    }

    loadingAction.setTrue();
    GetEquipmentPage(data)
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
        form.setFieldsValue(res);
      })
      .catch((err) => {
        form.setFieldsValue(initialEquipmentData);
        message.error(`获取信息失败：${err}`);
      })
      .finally(() => {
        setEditLoading(false);
      });
    setClickEditId(id);
  };

  const handleUpdate = () => {
    setConfirmLoading(true);
    PostUpdateEquipment({
      equipment: { ...form.getFieldsValue(), id: clickEditId },
    })
      .then(() => {
        setIsAddOrUpdateOpen(false);
        initGetEquipmentList();
        form.setFieldsValue(initialEquipmentData);
      })
      .catch((err) => message.error(`更新失敗：${err}`))
      .finally(() => setConfirmLoading(false));
  };

  const handleCreate = () => {
    setConfirmLoading(true);
    PostCreateEquipment({
      equipment: form.getFieldsValue(),
    })
      .then(() => {
        setIsAddOrUpdateOpen(false);
        initGetEquipmentList();
        form.setFieldsValue(initialEquipmentData);
      })
      .catch((err) => message.error(`新增失敗：${err}`))
      .finally(() => setConfirmLoading(false));
  };

  const onAddOrUpdateSubmit = (isAdd: boolean) => {
    form.validateFields();

    const fieldValues = form.getFieldsValue();

    const hasEmptyFields = Object.entries(fieldValues)
      .filter(([key]) => key !== "brand")
      .some(([, value]) => !value);

    if (hasEmptyFields) {
      return;
    }

    isAdd ? handleCreate() : handleUpdate();
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
    GetRegionPage({
      IsFilter: true,
    })
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

  const onChangePage = (page: number, pageSize: number) => {
    setPageDto({ PageIndex: page, PageSize: pageSize });
    initGetEquipmentList(page, pageSize);
  };

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
    initGetEquipmentList();
  }, []);

  useUpdateEffect(() => {
    initGetEquipmentList(1);
    setPageDto((prev) => ({ ...prev, PageIndex: 1 }));
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
    searchKey,
    setSearchKey,
    isSearchOnline,
    setIsSearchOnline,
    isSearchBind,
    setIsSearchBind,
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
    language,
    onOpenBind,
    regionLoading,
    regionData,
    onConfirmBind,
    confirmLoading,
    pageDto,
    onConfirmUnBind,
    myPermissions,
    initialEquipmentData,
    onChangePage,
  };
};
