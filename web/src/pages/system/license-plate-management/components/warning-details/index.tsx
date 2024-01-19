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

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GoIcon,
  PalyIcon,
  SuspendIcon,
} from "../icon";
import { Speed, useAction } from "./hook";

export const DetailsTitle = {
  name: "設備名稱",
  type: "預警類型",
  content: "預警內容",
  startTime: "開始時間",
  address: "區域地址",
  duration: "持續時間",
};

export interface IDetailsDataDto {
  name: string;
  type: string;
  content: string;
  startTime: string;
  address: string;
  duration: string;
}

export const WarningDetails = () => {
  const {
    detailsList,
    handleSetPalyVideo,
    open,
    isPalyVideo,
    handleOpenChange,
    videoRef,
    setOpen,
    setIsPalyVideo,
    handleLoadedMetadata,
    swiperRef,
    setVideoSpeed,
    timeAxisList,
    videoDuration,
  } = useAction();

  return (
    <div className="h-full flex flex-col">
      <div className="text-[0.75rem] flex flex-wrap pt-[1.5rem] px-[1.5rem] bg-white rounded-lg mt-[1.5rem]">
        {detailsList.map((item, index) => {
          return (
            <div className="w-1/3 mb-[1.5rem]" key={index}>
              <span className="text-[#5F6279 font-regular">
                {DetailsTitle[item[0] as keyof IDetailsDataDto]} ：
              </span>
              <span className="text-[#323444] text-semibold">{item[1]}</span>
            </div>
          );
        })}
      </div>
      <div className="my-4 rounded-lg h-[62%] bg-[#ccc] w-full relative overflow-hidden">
        <video
          ref={videoRef}
          onEnded={(_) => setIsPalyVideo(false)}
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
            <DatePicker
              className="text-[0.75rem] border-0 bg-transparent videoDatePicker"
              format="dddd,  hh:mm:ss A"
              suffixIcon={false}
              showToday={false}
              placeholder="Thursday,  05:41:28 PM"
              allowClear={false}
              defaultValue={dayjs()}
            />
            <button className="flex border rounded ml-[1.5rem] items-center px-2">
              <GoIcon />
              <span className="text-[1.125rem]">Live</span>
            </button>
          </div>
          <div className="flex text-white font-semibold">
            <div className="mr-[1.5rem] cursor-pointer">導出</div>

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

                      setOpen(false);
                    }}
                  >
                    {item}x
                  </div>
                );
              })}
              trigger="click"
              className=""
              open={open}
              arrow={false}
              onOpenChange={handleOpenChange}
            >
              <div className="cursor-pointer">倍速</div>
            </Popover>
          </div>
        </div>
        <div className="absolute left-[1.5rem] top-[1rem] text-white">
          2023-05-02 12:00:00
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, FreeMode, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        ref={swiperRef}
        scrollbar={{ draggable: true, hide: true }}
        freeMode={true}
        className="w-full w-full h-24 bg-white rounded-lg relative"
      >
        <button
          onClick={() => {
            swiperRef.current && swiperRef.current.swiper.slidePrev();
          }}
          className="absolute top-[1.65rem] z-[99] left-4 transform -translate-y-1/2 text-2xl"
        >
          <ArrowLeftIcon />
        </button>
        {timeAxisList?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="w-full">
              <div key={index} className="w-full h-full min-w-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-full h-full flex ml-[4.375rem] mt-4">
                    <div className="w-1/4 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]" />
                    <div className="w-1/3 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]" />
                    <div className="w-1/5 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]" />
                  </div>
                  <div className="w-full flex">
                    {item.timeList.map((item, i) => {
                      const startTime = dayjs("2023-05-02 12:00:00");

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
        <button
          onClick={() => {
            swiperRef.current && swiperRef.current.swiper.slideNext();
          }}
          className="absolute z-[99] top-[1.5rem] right-4 transform -translate-y-1/2 text-2xl"
        >
          <ArrowRightIcon />
        </button>
      </Swiper>
    </div>
  );
};
