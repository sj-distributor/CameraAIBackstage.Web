import { UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

import { IPreviewImageDto, IPortraitDto } from "@/services/dtos/portrait";

export const useAction = () => {
  const initialPortraitData: IPortraitDto[] = [
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      job: "产品经理",
      phone: "13402546565",
    },
  ];

  const [portraitData, setPortraitData] =
    useState<IPortraitDto[]>(initialPortraitData);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [imageInformation, setImageInformation] = useState<IPreviewImageDto>({
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => {
    setImageInformation({ ...imageInformation, previewOpen: false });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setImageInformation({
      previewOpen: true,
      previewImage: file.url || (file.preview as string),
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    });
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return {
    portraitData,
    isOpenModal,
    imageInformation,
    fileList,
    handleChange,
    setPortraitData,
    setIsOpenModal,
    handleCancel,
    handlePreview,
  };
};
