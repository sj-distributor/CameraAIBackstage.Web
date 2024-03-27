import { useRequest } from "ahooks";
import { App, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";

import {
  getPortraitList,
  postCreatePortrait,
  postDeletePortrait,
  postUpdatePortrait,
} from "@/services/api/portrait";
import {
  IFaceDto,
  IGetPortraitByParams,
  IPortraitDto,
  IPortraitModal,
  IPortraitResponse,
  IPreviewImageDto,
  OperationTypeEnum,
} from "@/services/dtos/portrait";

export const useAction = () => {
  const initialPortraitDto: IPortraitDto = {
    name: "",
    department: "",
    group: "",
    position: "",
    phone: "",
    isQualified: false,
    faces: [
      {
        image: "",
      },
    ],
  };

  const initialPortraitData: IPortraitResponse = {
    count: 0,
    portraits: [],
  };

  const [portraitModal, setPortraitModal] = useState<IPortraitModal>({
    isOpen: false,
    operationType: OperationTypeEnum.Add,
    item: initialPortraitDto,
  });

  const [portraitData, setPortraitData] =
    useState<IPortraitResponse>(initialPortraitData);

  const [pageData, setPageData] = useState<IGetPortraitByParams>({
    pageIndex: 1,
    pageSize: 9,
  });

  const [imageInformation, setImageInformation] = useState<IPreviewImageDto>({
    previewOpen: false,
    previewImage: "",
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { message } = App.useApp();

  const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => {
    setImageInformation({ ...imageInformation, previewOpen: false });
  };

  const handleFilePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setImageInformation({
      previewOpen: true,
      previewImage: file.url || (file.preview as string),
    });
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const handleGetPortraitData = useRequest(() => getPortraitList(pageData), {
    debounceWait: 300,
    manual: true,
    onBefore: () => setLoading(true),
    onSuccess: (data) => {
      setPortraitData(() => ({
        count: data?.count ?? 0,
        portraits: data?.portraits ?? [],
      }));
    },
    onError: (error) => {
      message.error((error as Error).message);
      setPortraitData(initialPortraitData);
    },
    onFinally: () => setLoading(false),
  });

  const handleCreateOrUpdatePortrait = useRequest(
    async () => {
      const faces: IFaceDto[] = [];

      const replacePrefix = (text: string) => {
        return text
          .replace("data:image/jpg;base64,", "")
          .replace("data:image/jpeg;base64,", "")
          .replace("data:image/png;base64,", "");
      };

      if (portraitModal.operationType === OperationTypeEnum.Add) {
        faces.push({
          image: replacePrefix(await getBase64(fileList[0].originFileObj!)),
        });
      } else {
        const fileData = {
          faceId: portraitModal.item.faces[0].faceId,
          image: null,
          imageUrl: portraitModal.item.faces[0].imageUrl,
          isDeleted: false,
        };

        if (fileList[0].originFileObj) {
          faces.push({
            image: replaceBase64(await getBase64(fileList[0].originFileObj!)),
          });

          faces.push({
            ...fileData,
            isDeleted: true,
          });
        } else {
          faces.push(fileData);
        }
      }

      const params: IPortraitDto = { ...portraitModal.item, faces };

      return (
        portraitModal.operationType === OperationTypeEnum.Add
          ? postCreatePortrait
          : postUpdatePortrait
      )({ portrait: params });
    },
    {
      debounceWait: 300,
      manual: true,
      onSuccess: () => {
        message.success("success");
        handleGetPortraitData.run();

        setFileList([]);
        setPortraitModal((pre) => ({
          ...pre,
          item: initialPortraitDto,
          isOpen: false,
        }));
        setImageInformation({
          previewOpen: false,
          previewImage: "",
        });
      },
      onError: (error) => message.error((error as Error).message),
    }
  );

  const handleDeletePortrait = useRequest(
    (id: number) => postDeletePortrait({ portraitId: id }),
    {
      debounceWait: 300,
      manual: true,
      onSuccess: () => {
        message.success("success");
        handleGetPortraitData.run();
      },
      onError: (error) => message.error((error as Error).message),
    }
  );

  useEffect(() => {
    handleGetPortraitData.run();
  }, [pageData]);

  return {
    portraitData,
    imageInformation,
    fileList,
    loading,
    portraitModal,
    pageData,
    handleCreateOrUpdatePortrait,
    handleDeletePortrait,
    initialPortraitDto,
    handleUploadChange,
    handleCancel,
    handleFilePreview,
    setPageData,
    setPortraitModal,
    setFileList,
  };
};
