import { UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

import { IPortraitDto } from "@/services/dtos/portrait";

export const useAction = () => {
  const initialPortraitData: IPortraitDto[] = [
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
    {
      portraitUrl: "",
      name: "Danny.K",
      department: "营运支持中心",
      group: "数据管理组",
      post: "产品经理",
      phone: "13402546565",
    },
  ];

  const [portraitData, setPortraitData] =
    useState<IPortraitDto[]>(initialPortraitData);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const [previewImage, setPreviewImage] = useState<string>("");

  const [previewTitle, setPreviewTitle] = useState<string>("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return {
    portraitData,
    isOpenModal,
    previewOpen,
    previewImage,
    previewTitle,
    fileList,
    handleChange,
    setPortraitData,
    setIsOpenModal,
    handleCancel,
    handlePreview,
  };
};
