import "swiper/swiper-bundle.css";

import { DatePicker, Popover } from "antd";
import dayjs from "dayjs";
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import KEYS from "@/i18n/language/keys/license-plate-management-keys";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GoIcon,
  PalyIcon,
  SuspendIcon,
} from "../../../../../assets/license-plate-management";
import { Speed, useAction } from "./hook";

export interface IDetailsDataDto {
  name: string;
  type: string;
  content: string;
  startTime: string;
  address: string;
  duration: string;
}

export enum WarningTypes {
  Car,
  Man,
}

export const WarningDetails = () => {
  const {
    handleSetPalyVideo,
    isOpenSpeedList,
    isPalyVideo,
    t,
    handleOpenChange,
    videoRef,
    setIsOpenSpeedList,
    setIsPalyVideo,
    handleLoadedMetadata,
    swiperRef,
    setVideoSpeed,
    timeAxisList,
    videoDuration,
    source,
    warningDetails,
    warningDetailList,
  } = useAction();

  const detailsTitle = {
    name: t(KEYS.DEVICE_NAME, source),
    type: t(KEYS.ALERT_TYPE, source),
    content: t(KEYS.ALERT_CONTENT, source),
    startTime: t(KEYS.START_TIME, source),
    address: t(KEYS.REGION_ADDRESS, source),
    duration: t(KEYS.DURATION_TIME, source),
  };

  const WarnDataVisualizer = (props: {
    warnData: {
      startTime: string;
      endTime: string;
    }[];
    type: WarningTypes;
    index: number;
  }) => {
    const { warnData, index, type } = props;

    return (
      <>
        {warnData.map((item, index) => {
          const perMinuteWidth = swiperRef.current.swiper.width / 40;

          const left =
            (dayjs(item.startTime).diff(
              dayjs(warningDetails.startTime).add(index * 40, "minute"),
              "minute"
            ) *
              perMinuteWidth) /
            16;

          const width =
            (dayjs(item.endTime).diff(dayjs(item.startTime), "minute") *
              perMinuteWidth) /
            16;

          return (
            <div
              key={index}
              style={{ left: `${left}rem`, width: `${width}rem` }}
              className={`rounded-[2.875rem] ${
                type === WarningTypes.Car ? "bg-[#2853E3]" : "bg-[#34A46E]"
              } absolute h-4`}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-[0.75rem] flex flex-wrap pt-[1.5rem] px-[1.5rem] bg-white rounded-lg mt-[1.5rem]">
        {warningDetailList?.map((item, index) => {
          return (
            <div className="w-1/3 mb-[1.5rem]" key={index}>
              <span className="text-[#5F6279 font-regular">
                {detailsTitle[item[0] as keyof IDetailsDataDto]} ：
              </span>
              <span className="text-[#323444] text-semibold">{item[1]}</span>
            </div>
          );
        })}
      </div>
      <div className="my-4 rounded-lg h-[62%] bg-[#ccc] w-full relative overflow-hidden">
        <video
          ref={videoRef}
          onEnded={() => setIsPalyVideo(false)}
          onLoadedMetadata={handleLoadedMetadata}
          height={"100%"}
          width={"100%"}
          src="https://cdn-busybee.wiltechs.com/2097_1705455545.mp4"
        />
        <div className="bg-[#1f1f3970] h-[4.5rem] absolute bottom-0 w-full flex items-center px-[1.5rem] py-[0.625rem] justify-between">
          <div
            className="cursor-pointer"
            onClick={() => {
              handleSetPalyVideo();
            }}
          >
            {isPalyVideo ? <SuspendIcon /> : <PalyIcon />}
          </div>
          <div className="flex font-semibold text-white items-center">
            <span style={{ userSelect: "none" }}>Saturday, 12:00:00 AM</span>
            <div className="cursor-pointer flex rounded ml-[1.5rem] items-center px-2 text-white border border-white border-solid">
              <GoIcon />
              <span className="text-[1.125rem]">Live</span>
            </div>
          </div>
          <div className="flex text-white font-semibold">
            <div
              className="mr-[1.5rem] cursor-pointer"
              onClick={() => {
                const a = document.createElement("a");

                const videoUrl =
                  "https://cdn-busybee.wiltechs.com/2097_1705455545.mp4";

                fetch(videoUrl)
                  .then((response) => response.blob())
                  .then((blob) => {
                    const url = window.URL.createObjectURL(blob);

                    a.href = url;
                    a.download = videoUrl.split("com/")[1];
                    a.click();

                    window.URL.revokeObjectURL(url);
                  })
                  .catch((error) =>
                    console.error("Error downloading video:", error)
                  );
              }}
            >
              {t(KEYS.EXPORT, source)}
            </div>

            <Popover
              content={[0.5, 1, 1.25, 1.5, 2].map((item) => {
                return (
                  <div
                    key={item}
                    className="hover:bg-[#ccc] cursor-pointer py-1 px-4 rounded text-center"
                    onClick={() => {
                      videoRef?.current &&
                        (videoRef.current.playbackRate = item);
                      setVideoSpeed(item as Speed);

                      setIsOpenSpeedList(false);
                    }}
                  >
                    {item}x
                  </div>
                );
              })}
              trigger="click"
              open={isOpenSpeedList}
              arrow={false}
              onOpenChange={handleOpenChange}
            >
              <div className="cursor-pointer">
                {t(KEYS.SPEED_MULTIPLIER, source)}
              </div>
            </Popover>
          </div>
        </div>
        <div className="absolute left-[1.5rem] top-[1rem] text-white">
          2023-05-02 12:00:00
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, FreeMode, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        ref={swiperRef}
        scrollbar={{ draggable: true, hide: true }}
        freeMode={true}
        className="w-full h-24 bg-white rounded-lg relative"
      >
        <div
          onClick={() => {
            swiperRef.current && swiperRef.current.swiper.slidePrev();
          }}
          className="absolute cursor-pointer top-[1.8rem] z-[99] left-4 transform -translate-y-1/2 text-2xl"
        >
          <ArrowLeftIcon />
        </div>
        {timeAxisList?.map((item, index) => {
          const warnData = {
            man: [
              {
                startTime: "2023-05-02 12:02:00",
                endTime: "2023-05-02 12:12:00",
              },
              {
                startTime: "2023-05-02 12:14:00",
                endTime: "2023-05-02 12:20:00",
              },
            ],
            car: [
              {
                startTime: "2023-05-02 12:18:00",
                endTime: "2023-05-02 12:21:00",
              },
            ],
          };

          const currentStartTime = dayjs(warningDetails.startTime).add(
            index + 1 * 40,
            "minute"
          );

          const currentCarData = warnData.car.filter(
            (item) => dayjs(item.startTime) < currentStartTime
          );

          const currentManData = warnData.man.filter(
            (item) => dayjs(item.startTime) < currentStartTime
          );

          return (
            <SwiperSlide key={index} className="w-full">
              <div key={index} className="w-full h-full min-w-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-full h-full flex mt-4">
                    <div className="w-full h-[1.125rem]">
                      <WarnDataVisualizer
                        warnData={currentCarData}
                        index={index}
                        type={WarningTypes.Car}
                      />
                      <WarnDataVisualizer
                        warnData={currentManData}
                        index={index}
                        type={WarningTypes.Man}
                      />
                    </div>
                  </div>
                  <div className="w-full flex">
                    {item.timeList.map((item, i) => {
                      const startTime = dayjs(warningDetails.startTime);

                      const duration = dayjs(item[0]).diff(startTime, "second");

                      return (
                        duration <= videoDuration && (
                          <div className="w-1/4 flex flex-col" key={i}>
                            <div className="flex items-end">
                              {item.map((item, index) => {
                                const duration = dayjs(item).diff(
                                  startTime,
                                  "second"
                                );

                                return (
                                  <div key={index} className={`w-1/5 h-max`}>
                                    <div className="text-start text-[#5F6279] font-semibold text-[0.875rem] text-nowrap">
                                      {dayjs(item).get("minute") % 5 === 0
                                        ? dayjs(item).format("hh:mm A")
                                        : ""}
                                    </div>
                                    <div
                                      className={`cursor-pointer h-2 w-px bg-[#ccc] ${
                                        dayjs(item).get("minute") % 5 === 0
                                          ? "h-3"
                                          : "h-2 "
                                      }`}
                                      onClick={() => {
                                        handleSetPalyVideo(duration);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div
          onClick={() => {
            swiperRef.current && swiperRef.current.swiper.slideNext();
          }}
          className="absolute cursor-pointer z-[99] top-[1.8rem] right-4 transform -translate-y-1/2 text-2xl"
        >
          <ArrowRightIcon />
        </div>
      </Swiper>
    </div>
  );
};
