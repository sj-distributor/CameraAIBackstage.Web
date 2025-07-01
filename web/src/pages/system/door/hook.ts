import { useDebounce, useRequest, useUpdateEffect } from "ahooks";
import { message } from "antd";
import { useRef, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  AddDoorApi,
  DeleteDoorApi,
  GetDoorListApi,
  GetRegionCameraList,
  UpdateDoorApi,
} from "@/services/api/door";
import { GetEquipmentPreviews } from "@/services/api/monitor";
import {
  IAddDoorParams,
  IGetDoorListProps,
  IRegionItem,
} from "@/services/dtos/access-management";

import { IDoorsModal, IPaginationDtoProps } from "./props";

const initAddOrUpdateParams: IAddDoorParams = {
  doorId: undefined,
  doorName: "",
  doorType: undefined,
  locationId: "",
  equipmentCode: "",
  remark: "",
  previewUrl: "",
  orientation: [],
};

export const useAction = () => {
  const { currentTeam, myPermissions } = useAuth();

  const [isPlot, setIsPlot] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const coordinatesRef = useRef<
    {
      xCoordinate: number;
      yCoordinate: number;
    }[]
  >([]);

  const [addOrUpdateModal, setAddOrUpdateModal] = useState<IDoorsModal>({
    type: "add",
    open: false,
  });

  const [cameras, setCameras] = useState<IRegionItem[]>([]);

  const [previewImg, setPreviewImg] = useState<string>("");

  const [paginationDto, setPaginationDto] = useState<IPaginationDtoProps>({
    PageIndex: 1,
    PageSize: 10,
    Keyword: "",
    DoorType: undefined,
    TeamId: currentTeam.id,
  });

  const [doorsList, setDoorsList] = useState<IGetDoorListProps>({
    count: 100,
    doors: [],
  });

  const [addOrUpdateParams, setAddOrUpdateParams] = useState<IAddDoorParams>(
    initAddOrUpdateParams
  );

  const [equipmentName, setEquipmentName] = useState<string>("");

  const updatePaginationDto = (data: Partial<IPaginationDtoProps>) => {
    setPaginationDto((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleChangeParams = (data: Partial<IAddDoorParams>) => {
    setAddOrUpdateParams((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateDoorsModal = (data: Partial<IDoorsModal>) => {
    setAddOrUpdateModal((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const getRegionCamera = () => {
    GetRegionCameraList({ TeamId: currentTeam.id })
      .then((res) => {
        setCameras(res?.regionCameras ?? []);
      })
      .catch(() => {
        setCameras([]);

        message.error("獲取設備失敗");
      });
  };

  const { loading: getImgLoading, run: getImgByEquipmentId } = useRequest(
    (id: string | number) => GetEquipmentPreviews({ EquipmentIds: [id] }),
    {
      manual: true,
      onSuccess: (res) => {
        setPreviewImg(res?.[0].previewImg ?? "");

        // setPreviewImg(
        //   "https://smartiestest.oss-cn-hongkong.aliyuncs.com/20250310/633fd663-e868-447c-a254-9f77ba6309e8.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=ESQlwFVy%2FjvafymSNluUKT%2F%2FhkA%3D"
        // );

        handleChangeParams({
          previewUrl: res?.previewImg ?? "",
        });
      },
      onError: () => {
        setPreviewImg("");

        message.error("获取设备画面失败");
      },
    }
  );

  const { loading: deleteLoading, run: deleteDoors } = useRequest(
    (id: string) => DeleteDoorApi({ doorId: id }),
    {
      manual: true,
      onSuccess: () => {
        message.success("刪除成功");

        getDoorsList();

        updateDoorsModal({ open: false });
      },
      onError: () => {
        message.error("刪除失敗");
      },
    }
  );

  const { loading: doorsLoading, run: handleAddOrUpdate } = useRequest(
    (orientation: number[][]) =>
      addOrUpdateModal.type === "add"
        ? AddDoorApi({
            ...addOrUpdateParams,
            orientation: orientation,
            previewUrl: previewImg,
            teamId: currentTeam.id,
          })
        : UpdateDoorApi({
            ...addOrUpdateParams,
            orientation: orientation,
            previewUrl: previewImg,
            teamId: currentTeam.id,
          }),
    {
      manual: true,
      onSuccess: () => {
        message.success(
          `${addOrUpdateModal.type === "add" ? "新增" : "編輯"}成功`
        );

        getDoorsList();

        updateDoorsModal({ open: false });
      },
      onError: () => {
        message.error(
          `${addOrUpdateModal.type === "add" ? "新增" : "編輯"}失敗`
        );
      },
    }
  );

  const { loading: getDoorsLoading, run: getDoorsList } = useRequest(
    () => GetDoorListApi(paginationDto),
    {
      refreshDeps: [paginationDto.PageIndex, paginationDto.PageSize],
      onSuccess: (res) => {
        setDoorsList({
          count: res?.count ?? 0,
          doors: res?.doors ?? [],
        });
      },
      onError: () => {
        message.error("獲取數據失敗");
      },
    }
  );

  const searchValueDebounce = useDebounce(paginationDto.Keyword, {
    wait: 500,
  });

  useUpdateEffect(() => {
    if (paginationDto.PageIndex === 1) {
      getDoorsList();
    } else {
      updatePaginationDto({ PageIndex: 1 });
    }
  }, [paginationDto.DoorType, searchValueDebounce]);

  return {
    paginationDto,
    addOrUpdateModal,
    cameras,
    getImgLoading,
    previewImg,
    addOrUpdateParams,
    isPlot,
    coordinatesRef,
    isEdit,
    getDoorsLoading,
    doorsList,
    deleteLoading,
    doorsLoading,
    initAddOrUpdateParams,
    myPermissions,
    equipmentName,
    updatePaginationDto,
    getRegionCamera,
    getImgByEquipmentId,
    handleChangeParams,
    setIsPlot,
    setIsEdit,
    deleteDoors,
    updateDoorsModal,
    handleAddOrUpdate,
    setPreviewImg,
    setEquipmentName,
  };
};
