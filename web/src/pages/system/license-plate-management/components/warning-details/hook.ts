import dayjs from "dayjs";
import { useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

import { useAuth } from "@/hooks/use-auth";

export type Speed = 0.5 | 1 | 1.25 | 1.5 | 2;

export const useAction = () => {
  const details = {
    name: "攝像頭001",
    type: "識別車輛",
    content: "攝像頭001，識別車輛（車牌LA12356），出現超過10秒",
    startTime: "2023-05-02 12:00:00",
    address: "廣東省中山市中山二路1號",
    duration: "1m10s",
  };

  const { t } = useAuth();

  const source = { ns: "licensePlateManagement" };

  const detailsList = Object.entries(details);

  const videoRef = useRef<HTMLVideoElement>(null!);

  const swiperRef = useRef<SwiperRef>(null!);

  const [open, setOpen] = useState<boolean>(false);

  const [isPalyVideo, setIsPalyVideo] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const [timeAxisList, setTimeAxisList] = useState<
    {
      timeList: string[][];
    }[]
  >();

  const [videoSpeed, setVideoSpeed] = useState<Speed>(1);

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
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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

  return {
    detailsList,
    handleSetPalyVideo,
    open,
    hide,
    isPalyVideo,
    handleOpenChange,
    currentIndex,
    videoRef,
    setOpen,
    setIsPalyVideo,
    handleLoadedMetadata,
    timeAxisList,
    setCurrentIndex,
    videoSpeed,
    setVideoSpeed,
    videoDuration,
    swiperRef,
    details,
    t,
    source,
  };
};
