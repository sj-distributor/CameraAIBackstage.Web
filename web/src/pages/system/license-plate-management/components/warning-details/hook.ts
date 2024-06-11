import { useRequest } from "ahooks";
import { message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";
import MONITOR_KEYS from "@/i18n/language/keys/monitor-keys";
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
import { Timeout } from "ahooks/lib/useRequest/src/types";

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

  const isPlayBackCallBackData = useRef<boolean>(false);

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

  const getMonitorTypeName = (type: CameraAiMonitorType) => {
    switch (type) {
      case CameraAiMonitorType.People:
        return t(MONITOR_KEYS.IDENTIFY_PEOPLE, { ns: "monitor" });

      case CameraAiMonitorType.Vehicles:
        return t(MONITOR_KEYS.IDENTIFY_VEHICLES, { ns: "monitor" });

      case CameraAiMonitorType.AbnormalVehicles:
        return t(MONITOR_KEYS.IDENTIFY_ABNORMAL_VEHICLES, { ns: "monitor" });
    }
  };

  const warningDetails = useMemo(() => {
    const details = {
      name: warningDemandData?.record?.name ?? "攝像頭001",
      type: getMonitorTypeName(
        warningDemandData?.record?.monitorType ?? CameraAiMonitorType.Vehicles
      ),
      content:
        warningDemandData?.regionAndArea?.principal ??
        "攝像頭001，識別車輛（車牌LA12356），出現超過10秒",
      startTime: warningDemandData?.record?.occurrenceTime
        ? dayjs(warningDemandData?.record?.occurrenceTime).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        : "",
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
        endTime: dayjs(endTime).format("YYYY_MM_DD_HH_mm_ss"),
        startTime: dayjs(occurrenceTime).format("YYYY_MM_DD_HH_mm_ss"),
        taskId: replayTaskId,
      };

      PostPlayBackGenerate(getUrlData)
        .then(() => {
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

  const isGetdetailsVideoUrl = useRef<boolean>(false);

  const handelGetUrl = (id: string) => {
    if (isGetdetailsVideoUrl.current) return;
    id &&
      GetWarningDemand(showWarningDetails)
        .then((res) => {
          const { replayUrl, playbackStatus } = res.record;

          if (replayUrl && playbackStatus === 2) {
            setDetailsVideoUrl(replayUrl);
            isGetdetailsVideoUrl.current = true;

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

  useEffect(() => {
    return () => {
      isGetdetailsVideoUrl.current = true;
      isPlayBackCallBackData.current = true;
    };
  }, []);

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
    if (videoRef.current && warningDetails.startTime) {
      const duration = videoRef.current.duration;

      setVideoDuration(duration);

      let initialTime = dayjs(warningDetails.startTime)
        .subtract(120, "second")
        .utc();

      const arr = Array.from({ length: Math.ceil(duration / 3000) }).map(() => {
        const timeList = Array.from({ length: 5 }).map(() => {
          const innerTimeList = Array.from({ length: 5 }).map(() => {
            initialTime = initialTime.add(120, "second");

            return initialTime.toISOString();
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
      const startDate = dayjs(warningDetails.startTime);

      const duration = Number(warningDetails?.duration) ?? 0;

      const endDate = startDate.set(
        "seconds",
        startDate.get("seconds") + duration
      );

      if (
        dayjs(palybackData.startTime) < startDate ||
        dayjs(palybackData.startTime) > endDate ||
        dayjs(palybackData.endTime) > endDate ||
        dayjs(palybackData.endTime) < startDate
      ) {
        message.info(
          t(KEYS.TIME_FROM, {
            ...source,
            startTime: startDate.format("YYYY-MM-DDTHH:mm:ss"),
            endTime: endDate.format("YYYY-MM-DDTHH:mm:ss"),
          })
        );
        return;
      }

      const data = {
        locationId: palybackData.locationId,
        startTime: dayjs(palybackData.startTime).format("YYYY_MM_DD_HH_mm_ss"),
        endTime: dayjs(palybackData.endTime).format("YYYY_MM_DD_HH_mm_ss"),
        monitorTypes: palybackData.monitorTypes,
        equipmentCode: palybackData.equipmentCode,
      };

      PostGeneratePlayBack(data)
        .then((res) => {
          const { generateTaskId } = res;

          message.info(t(KEYS.GENERATED_TIPS, source));

          generateTaskId && handelGetVideoPlayBackData(generateTaskId);
        })
        .catch((err) => message.error(err.mag));
    }
  };

  const handelGetVideoPlayBackData = (id: string) => {
    let playbackTimer: Timeout | null = null;

    if (isPlayBackCallBackData.current) return;

    id &&
      GetGenerateUrl(id).then((res) => {
        const { generateUrl } = res;

        if (generateUrl) {
          handelDownloadUrl(generateUrl);
          isPlayBackCallBackData.current = true;

          playbackTimer && clearTimeout(playbackTimer);
        }
      });

    playbackTimer = setTimeout(() => handelGetVideoPlayBackData(id), 5000);
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

  useEffect(() => {
    handleLoadedMetadata();
  }, [warningDetails.startTime]);

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
    detailsVideoUrl,
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
