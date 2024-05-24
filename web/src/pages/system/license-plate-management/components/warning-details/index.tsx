import "swiper/swiper-bundle.css";

import { WarningFilled } from "@ant-design/icons";
import { DatePicker, Popover, Spin } from "antd";
import dayjs from "dayjs";
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";
import { CameraAiMonitorType } from "@/services/dtos/license-plate-management";

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

export const WarningDetails = (props: { showWarningDetails: string }) => {
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
    warningDemandData,
    warningDetails,
    warningDetailList,
    isOpenExportVideoModal,
    setIsOpenExportVideoModal,
    handelGetPlayBackData,
    setPalyBlackData,
    warningDetailDateLists,
    detailsVideoUrl,
  } = useAction(props);

  const { RangePicker } = DatePicker;

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
    const { warnData, type } = props;

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
    <div className="h-full flex flex-col flex-1 overflow-hidden">
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            確認導出視頻？
          </div>
        }
        onCancle={() => {
          setIsOpenExportVideoModal(false);
        }}
        onConfirm={() => {
          handelGetPlayBackData();
          setIsOpenExportVideoModal(false);
        }}
        open={isOpenExportVideoModal}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={(dates) => {
              setPalyBlackData((prev) => ({
                ...prev,
                startTime:
                  dates && dates?.length >= 1
                    ? dates[0]
                      ? dates[0].toISOString()
                      : undefined
                    : undefined,
                endTime:
                  dates && dates?.length >= 2
                    ? dates[1]
                      ? dates[1].toISOString()
                      : undefined
                    : undefined,
              }));
            }}
          />
        </span>
      </CustomModal>
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

      {detailsVideoUrl ? (
        <div className="my-4 rounded-lg flex-1 bg-[#ccc] w-full relative overflow-hidden">
          <video
            ref={videoRef}
            onEnded={() => setIsPalyVideo(false)}
            onLoadedMetadata={handleLoadedMetadata}
            height={"100%"}
            width={"100%"}
            className="object-fill"
            src={detailsVideoUrl}
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
              <span style={{ userSelect: "none" }}>
                {dayjs(warningDetails.startTime).format("dddd hh:mm:ss A")}
              </span>
              <div className="cursor-pointer flex rounded ml-[1.5rem] items-center px-2 text-white border border-white border-solid">
                <GoIcon />
                <span className="text-[1.125rem]">Live</span>
              </div>
            </div>
            <div className="flex text-white font-semibold">
              <div
                className="mr-[1.5rem] cursor-pointer"
                onClick={() => {
                  setIsOpenExportVideoModal(true);
                }}
              >
                {t(KEYS.EXPORT, source)}
              </div>

              <Popover
                content={[0.5, 1, 1.25, 1.5, 2].map((item) => {
                  return (
                    <div
                      key={item}
                      className="hover:bg-[#EBF1FF] hover:text-[#2866F1] cursor-pointer py-1 px-4 rounded text-center"
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
        </div>
      ) : (
        <div className="my-4 rounded-lg flex-1 bg-[#ccc] w-full overflow-hidden flex justify-center items-center">
          <div>
            <Spin tip={t(KEYS.GET_VIDEO_LOADING, source)}>
              <div className="w-64" />
            </Spin>
          </div>
        </div>
      )}

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, FreeMode, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        ref={swiperRef}
        scrollbar={{ draggable: true, hide: true }}
        freeMode={true}
        className="w-full h-24 bg-white rounded-lg relative mb-4 !px-[2.5rem]"
      >
        <div
          onClick={() => {
            swiperRef.current && swiperRef.current.swiper.slidePrev();
          }}
          className="absolute cursor-pointer top-[1.7rem] z-[99] left-1 transform -translate-y-1/2 text-2xl"
        >
          <ArrowLeftIcon />
        </div>
        {timeAxisList?.map((item, index) => {
          const currentStartTime = dayjs(warningDetails.startTime).add(
            index + 1 * 40,
            "minute"
          );

          const currentCarData = warningDetailDateLists[
            CameraAiMonitorType.Vehicles
          ].filter((item) => dayjs(item.startTime) < currentStartTime);

          const currentManData = warningDetailDateLists[
            CameraAiMonitorType.People
          ].filter((item) => dayjs(item.startTime) < currentStartTime);

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
                              {item.map((time, index) => {
                                const duration = dayjs(time)
                                  .utc()
                                  .diff(startTime, "second");

                                const endTime = startTime
                                  .add(
                                    Number(
                                      warningDemandData?.record.duration ?? 0
                                    ),
                                    "second"
                                  )
                                  .add(2, "second");

                                const endTimeIndex = item.findIndex(
                                  (item) => dayjs(item) > endTime
                                );

                                const node = (
                                  <div
                                    key={index}
                                    className={`w-1/5 h-max relative`}
                                  >
                                    <div className="text-start text-[#5F6279] font-semibold text-[0.875rem] text-nowrap absolute top-[-16px]">
                                      {index === 0 || index === 4
                                        ? dayjs(time).format("hh:mm A")
                                        : ""}
                                    </div>
                                    <div
                                      className={`relative h-2 w-px bg-[#ccc] ${
                                        index === 0 || index === 4
                                          ? "h-3"
                                          : "h-2 "
                                      }`}
                                    />
                                    <span
                                      className="absolute cursor-pointer w-2 h-2 top-1 left-[-4px]"
                                      onClick={() => {
                                        handleSetPalyVideo(duration);
                                      }}
                                    />
                                  </div>
                                );

                                return endTimeIndex ? (
                                  index <= endTimeIndex ? (
                                    node
                                  ) : (
                                    <div
                                      key={index}
                                      className={`w-1/5 h-max relative`}
                                    />
                                  )
                                ) : (
                                  node
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
          className="absolute cursor-pointer z-[99] top-[1.7rem] right-1 transform -translate-y-1/2 text-2xl"
        >
          <ArrowRightIcon />
        </div>
      </Swiper>
    </div>
  );
};
