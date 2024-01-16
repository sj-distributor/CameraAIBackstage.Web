import { GoIcon, PalyIcon, SuspendIcon } from "../icon";
import { DatePicker, Popover } from "antd";
import { useAction } from "./hook";

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
    currentIndex,
    videoRef,
    prevSlide,
    nextSlide,
    setOpen,
    setIsPalyVideo,
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
      <div className="my-4 rounded-lg h-[58%] bg-[#ccc] w-full relative overflow-hidden">
        <video
          ref={videoRef}
          onEnded={(e) => setIsPalyVideo(false)}
          height={"100%"}
          src="https://video-builder.oss-cn-hongkong.aliyuncs.com/final/7f34d31e-aa1a-11ee-8ef7-bef7e46b6559.mp4"
        />
        <div className="bg-[#1f1f3970] h-[4.5rem] absolute bottom-0 w-full flex items-center px-[1.5rem] py-[0.625rem] justify-between">
          <div
            className="cursor-pointer"
            onClick={() => {
              handleSetPalyVideo();
            }}
          >
            {!isPalyVideo ? <SuspendIcon /> : <PalyIcon />}
          </div>
          <div className="flex font-semibold text-white items-center">
            <DatePicker
              className="text-[0.75rem] border-0 bg-transparent videoDatePicker"
              format="dddd,  hh:mm:ss A"
              suffixIcon={false}
              allowClear={false}
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
      </div>
      <div className="relative flex text-center w-full h-32 bg-white rounded-lg overflow-hidden">
        <button
          className="absolute top-1/2 z-[99] left-4 transform -translate-y-1/2 text-2xl"
          onClick={prevSlide}
        >
          &lt;
        </button>
        {[1, 2, 3, 4, 5].map((image, index) => (
          <div
            key={index}
            className={`w-full h-full absolute ${
              index !== currentIndex
                ? `transform ${
                    index > currentIndex
                      ? "translate-x-full"
                      : "-translate-x-full"
                  }`
                : "transform translate-x-0"
            } transition-translate transform duration-1000`}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="w-full h-full flex ml-[4.375rem] mt-4">
                <div className="w-1/4 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]"></div>
                <div className="w-1/3 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]"></div>
                <div className="w-1/4 bg-[#2853E3] rounded-[2.875rem] h-[1.125rem] mr-[4.375rem]"></div>
              </div>
              <div className="w-full flex">
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <div className="w-1/4 flex flex-col">
                      <div className="text-start">3:04 PM</div>
                      <div className="h-2 flex">
                        {[1, 2, 3, 4, 5].map((item) => {
                          return (
                            <div className="h-2 w-1/5 border-r border-[#D7D7E2]"></div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        <button
          className="absolute z-[99] top-1/2 right-4 transform -translate-y-1/2 text-2xl"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
