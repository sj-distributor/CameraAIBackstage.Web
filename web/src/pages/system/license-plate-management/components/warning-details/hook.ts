import { useRef, useState } from "react";

export const useAction = () => {
  const details = {
    name: "攝像頭001",
    type: "識別車輛",
    content: "攝像頭001，識別車輛（車牌LA12356），出現超過10秒",
    startTime: "2023-05-02 12:00:00",
    address: "廣東省中山市中山二路1號",
    duration: "1m10s",
  };

  const detailsList = Object.entries(details);

  const handleSetPalyVideo = () => {
    if (videoRef?.current) {
      !videoRef.current.paused
        ? videoRef.current.pause()
        : videoRef.current.play();

      setIsPalyVideo(videoRef.current.paused);
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null!);

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const [isPalyVideo, setIsPalyVideo] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? [1, 2, 3, 4, 5].length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % [1, 2, 3, 4, 5].length);
  };

  return {
    detailsList,
    handleSetPalyVideo,
    open,
    hide,
    isPalyVideo,
    handleOpenChange,
    currentIndex,
    prevSlide,
    nextSlide,
    videoRef,
    setOpen,
    setIsPalyVideo,
  };
};
