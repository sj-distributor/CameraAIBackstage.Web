import { useRequest } from "ahooks";
import { message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

import { useAuth } from "@/hooks/use-auth";
import { GetWarningDemand } from "@/services/api/license-plate-management";
import { IGetWarningDemandResponse } from "@/services/dtos/license-plate-management";

export type Speed = 0.5 | 1 | 1.25 | 1.5 | 2;

export const useAction = () => {
  const { t } = useAuth();

  const source = { ns: "licensePlateManagement" };

  const videoRef = useRef<HTMLVideoElement>(null!);

  const swiperRef = useRef<SwiperRef>(null!);

  const [isOpenSpeedList, setIsOpenSpeedList] = useState<boolean>(false);

  const [isPalyVideo, setIsPalyVideo] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const [warningDemandData, setWarningDemandData] =
    useState<IGetWarningDemandResponse>();

  const [timeAxisList, setTimeAxisList] = useState<
    {
      timeList: string[][];
    }[]
  >();

  const [videoSpeed, setVideoSpeed] = useState<Speed>(1);

  const warningDetails = useMemo(() => {
    const details = {
      name: warningDemandData?.record?.faceName ?? "攝像頭001",
      type: warningDemandData?.record?.monitorTypeId ?? "識別車輛",
      content:
        warningDemandData?.regionAndArea?.principal ??
        "攝像頭001，識別車輛（車牌LA12356），出現超過10秒",
      startTime:
        warningDemandData?.record?.occurrenceTime ?? "2023-05-02 12:00:00",
      address:
        warningDemandData?.regionAndArea?.areaName ?? "廣東省中山市中山二路1號",
      duration:
        warningDemandData?.record?.duration ??
        dayjs.unix(60).format("HH[h]mm[m]ss[s]"),
    };

    return details;
  }, [warningDemandData]);

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
    handelGetWarningDemand("1");
  }, []);

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
  };
};
