import { useRequest } from "ahooks";
import { message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetGenerateUrl,
  GetWarningDemand,
  PostGeneratePlayBack,
  PostPlayBackGenerate,
} from "@/services/api/license-plate-management";
import {
  CameraAiMonitorType,
  IGetWarningDemandResponse,
  IWarningRecord,
} from "@/services/dtos/license-plate-management";

export type Speed = 0.5 | 1 | 1.25 | 1.5 | 2;

export const useAction = (props: { showWarningDetails: string }) => {
  const { showWarningDetails } = props;

  const { t } = useAuth();

  const source = { ns: "licensePlateManagement" };

  const videoRef = useRef<HTMLVideoElement>(null!);

  const swiperRef = useRef<SwiperRef>(null!);

  const [isOpenSpeedList, setIsOpenSpeedList] = useState<boolean>(false);

  const [isPalyVideo, setIsPalyVideo] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const [isOpenExportVideoModal, setIsOpenExportVideoModal] =
    useState<boolean>(false);

  const [warningDemandData, setWarningDemandData] =
    useState<IGetWarningDemandResponse>();

  const [palybackData, setPalyBlackData] = useState<{
    locationId: string;
    equipmentCode: string;
    startTime?: string;
    endTime?: string;
    monitorTypes: number[];
    taskId: string;
  }>({
    locationId: "string",
    equipmentCode: "string",
    startTime: "2024-03-28T10:07:04.871Z",
    endTime: "2024-03-28T10:07:04.871Z",
    monitorTypes: [0],
    taskId: "",
  });

  const [timeAxisList, setTimeAxisList] = useState<
    {
      timeList: string[][];
    }[]
  >();

  const [videoSpeed, setVideoSpeed] = useState<Speed>(1);

  const [isPlayBackCallBackData, setIsPlayBackCallBackData] =
    useState<boolean>(false);

  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const handelGetWarningData = (data: IWarningRecord[]) => {
    const getTimeList = (data: IWarningRecord[], type: CameraAiMonitorType) => {
      return data
        .filter((item) => item.monitorType === type)
        .map((item) => {
          const startTime = item.occurrenceTime;

          const endTime = dayjs(startTime)
            .set("seconds", dayjs(startTime).get("seconds") + item.duration)
            .toISOString();

          return { startTime, endTime };
        });
    };

    const peopleWarningLists = getTimeList(data, CameraAiMonitorType.People);

    const vehiclesWarningLists = getTimeList(
      data,
      CameraAiMonitorType.Vehicles
    );

    const abnormalVehiclesWarningLists = getTimeList(
      data,
      CameraAiMonitorType.AbnormalVehicles
    );

    return {
      [CameraAiMonitorType.AbnormalVehicles]: abnormalVehiclesWarningLists,
      [CameraAiMonitorType.People]: peopleWarningLists,
      [CameraAiMonitorType.Vehicles]: vehiclesWarningLists,
    };
  };

  const warningDetails = useMemo(() => {
    const details = {
      name: warningDemandData?.record?.faceName ?? "攝像頭001",
      type: warningDemandData?.record?.monitorType ?? "識別車輛",
      content:
        warningDemandData?.regionAndArea?.principal ??
        "攝像頭001，識別車輛（車牌LA12356），出現超過10秒",
      startTime:
        warningDemandData?.record?.occurrenceTime ?? "2023-05-02 12:00:00",
      address:
        warningDemandData?.regionAndArea?.areaName ?? "廣東省中山市中山二路1號",
      duration: dayjs
        .unix(warningDemandData?.record?.duration ?? 60)
        .format("mm[m]ss[s]"),
    };

    if (warningDemandData?.record && warningDemandData.regionAndArea) {
      const {
        monitorType,
        equipmentCode,
        replayTaskId,
        occurrenceTime,
        duration,
      } = warningDemandData.record;

      const endTime = dayjs(occurrenceTime)
        .set("seconds", dayjs(occurrenceTime).get("seconds") + duration)
        .toISOString();

      const { locationId } = warningDemandData.regionAndArea;

      const data = {
        monitorType,
        equipmentCode,
        taskId: replayTaskId,
        locationId,
      };

      setPalyBlackData((prev) => ({
        ...prev,
        ...data,
      }));

      const getUrlData = {
        monitorTypes: [Number(monitorType)],
        equipmentCode,
        replayTaskId,
        locationId,
        endTime,
        startTime: occurrenceTime,
        taskId: replayTaskId,
      };

      PostPlayBackGenerate(getUrlData)
        .then((res) => {
          handelGetUrl(showWarningDetails);
        })
        .catch((err) => message.error(err.mag));
    }

    return details;
  }, [warningDemandData]);

  const warningDetailDateLists = useMemo(() => {
    const warningDataList = warningDemandData?.record
      ? handelGetWarningData([warningDemandData.record])
      : {
          [CameraAiMonitorType.AbnormalVehicles]: [],
          [CameraAiMonitorType.People]: [],
          [CameraAiMonitorType.Vehicles]: [],
        };

    return warningDataList;
  }, [warningDemandData]);

  const [detailsVideoUrl, setDetailsVideoUrl] = useState<string>("");

  const handelGetUrl = (id: string) => {
    if (detailsVideoUrl) return;
    id &&
      GetWarningDemand(showWarningDetails)
        .then((res) => {
          const { replayUrl } = res.record;

          if (replayUrl) {
            setDetailsVideoUrl(replayUrl);
            setIsLoadingData(false);

            return;
          }
        })
        .catch((err) => {
          message.error(err.mag);
        })
        .finally(() => {
          setTimeout(() => {
            handelGetUrl(showWarningDetails);
          }, 5000);
        });
  };

  const warningDetailList = useMemo(() => {
    return Object.entries(warningDetails);
  }, [warningDetails]);

  const handleSetPalyVideo = (duration?: number) => {
    if (videoRef?.current) {
      if (duration) {
        videoRef.current.currentTime = duration;

        videoRef.current.play();

        setIsPalyVideo(true);

        return;
      }

      !videoRef.current.paused
        ? videoRef.current.pause()
        : videoRef.current.play();

      setIsPalyVideo(!videoRef.current.paused);
    }
  };

  const hide = () => {
    setIsOpenSpeedList(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpenSpeedList(newOpen);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;

      setVideoDuration(duration);

      let initialTime = dayjs("2023-05-02 12:00:00").subtract(120, "second");

      const arr = Array.from({ length: Math.ceil(duration / 3000) }).map(() => {
        const timeList = Array.from({ length: 5 }).map(() => {
          const innerTimeList = Array.from({ length: 5 }).map(() => {
            initialTime = initialTime.add(120, "second");

            return initialTime.format("YYYY-MM-DDTHH:mm:ss");
          });

          return innerTimeList;
        });

        return { timeList };
      });

      setTimeAxisList(arr);
    }
  };

  const handelGetPlayBackData = () => {
    if (
      palybackData.startTime &&
      palybackData.endTime &&
      palybackData.equipmentCode &&
      palybackData.locationId &&
      palybackData.monitorTypes &&
      palybackData.taskId
    ) {
      const data = {
        locationId: palybackData.locationId,
        startTime: palybackData.startTime,
        endTime: palybackData.endTime,
        monitorTypes: palybackData.monitorTypes,
        equipmentCode: palybackData.equipmentCode,
      };

      PostGeneratePlayBack(data)
        .then((res) => {
          const { generateTaskId } = res;

          message.info("視頻正在生成中，生成成功自動為您下載，請稍等");

          generateTaskId && handelGetVideoPlayBackData(generateTaskId);
        })
        .catch((err) => console.log(err));
    }
  };

  const handelGetVideoPlayBackData = (id: string) => {
    if (isPlayBackCallBackData) return;

    id &&
      GetGenerateUrl(id)
        .then((res) => {
          const { generateUrl } = res;

          if (generateUrl) {
            handelDownloadUrl(generateUrl);
            setIsPlayBackCallBackData(true);

            return;
          } else {
            setInterval(() => handelGetVideoPlayBackData(id), 5000);
          }
        })
        .catch(() => {});
  };

  const handelDownloadUrl = (url: string) => {
    const a = document.createElement("a");

    const videoUrl = url;

    fetch(videoUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = videoUrl.split("com/")[1];
        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading video:", error));
  };

  const { run: handelGetWarningDemand } = useRequest(GetWarningDemand, {
    manual: true,
    onSuccess: (res) => {
      res && setWarningDemandData(res);
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  useEffect(() => {
    handelGetWarningDemand(showWarningDetails);
  }, [showWarningDetails]);

  return {
    handleSetPalyVideo,
    isOpenSpeedList,
    hide,
    isPalyVideo,
    handleOpenChange,
    currentIndex,
    videoRef,
    setIsOpenSpeedList,
    setIsPalyVideo,
    handleLoadedMetadata,
    timeAxisList,
    setCurrentIndex,
    videoSpeed,
    setVideoSpeed,
    videoDuration,
    swiperRef,
    t,
    source,
    warningDetails,
    warningDemandData,
    warningDetailList,
    isOpenExportVideoModal,
    setIsOpenExportVideoModal,
    handelGetPlayBackData,
    setPalyBlackData,
    warningDetailDateLists,
  };
};
