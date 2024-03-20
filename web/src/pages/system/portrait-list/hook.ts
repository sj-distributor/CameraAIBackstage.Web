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

  const [addOrUpdatePortrait, setAddOrUpdatePortrait] = useState<{
    isOpen: boolean;
    operationType: OperationTypeEnum;
    item: IPortraitDto;
  }>({
    isOpen: false,
    operationType: OperationTypeEnum.Add,
    item: initialPortraitDto,
  });

  const [portraitData, setPortraitData] =
    useState<IPortraitResponse>(initialPortraitData);

  const [pageData, setPageData] = useState<IGetPortraitByParams>({
    pageIndex: 1,
    pageSize: 12,
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

      for (const file of fileList) {
        faces.push({
          image: (await getBase64(file.originFileObj!)).replace(
            "data:image/jpeg;base64,",
            ""
          ),
        });
      }

      const params: IPortraitDto = { ...addOrUpdatePortrait.item, faces };

      return (
        addOrUpdatePortrait.operationType === OperationTypeEnum.Add
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
        setAddOrUpdatePortrait((pre) => ({ ...pre, item: initialPortraitDto }));
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
      onBefore: () => setLoading(true),
      onSuccess: () => message.success("success"),
      onError: (error) => message.error((error as Error).message),
      onFinally: () => setLoading(false),
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
    addOrUpdatePortrait,
    pageData,
    handleCreateOrUpdatePortrait,
    handleDeletePortrait,
    handleUploadChange,
    handleCancel,
    handleFilePreview,
    setPageData,
    setAddOrUpdatePortrait,
    setFileList,
  };
};
