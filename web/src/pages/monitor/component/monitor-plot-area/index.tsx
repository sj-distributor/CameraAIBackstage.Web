import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button, ConfigProvider, Spin } from "antd";
import { isEmpty } from "ramda";

import { IProps, useAction } from "./hook";

export const MonitorPlotArea = ({
  type,
  previewImg,
  coordinatesRef,
  isEdit,
  equipmentName,
  backPage,
}: IProps) => {
  const {
    canvasRef,
    loading,
    undoStack,
    redoStack,
    onUndo,
    onRedo,
    onClear,
    onSave,
  } = useAction({
    type,
    previewImg,
    coordinatesRef,
    isEdit,
    equipmentName,
    backPage,
  });

  return (
    <div
      className={`w-full ${isEdit ? "h-[calc(100%-15rem)]" : "h-full"} ${
        type ? "my-[1rem] " : "-mt-4"
      }`}
    >
      {isEdit && (
        <div className="grid grid-cols-3 w-full">
          <div className="col-start-2 text-center font-semibold text-[#323444] text-[1.13rem] flex justify-center">
            <div className="relative w-fit flex">
              设备名称：{equipmentName}
              <div className="absolute pl-6 left-full top-[3px] text-[0.77rem] text-[#6c6c6f] flex items-start">
                <InfoCircleFilled className="mt-[3px]" />
                <span className="pl-1 items-start min-w-[400px] text-left ">
                  在图片上点击以创建起始点，移动鼠标绘制线条，绘制过程中可再点击鼠标生成新的点，最后右键单击完成区域绘制。
                </span>
              </div>
            </div>
          </div>
          <div className="flex col-start-3 ml-auto relative">
            <div
              className={`bg-[#2853E3] w-[4rem] h-[2.5rem] rounded-tl-[.5rem] rounded-bl-[.5rem] flex items-center justify-center cursor-pointer ${
                undoStack.length > 1 ? "" : "bg-[#a1a2a5] cursor-not-allowed"
              }`}
              onClick={() => {
                undoStack.length > 1 && onUndo();
              }}
            >
              {/* 上一步 */}
              <ArrowLeftOutlined className="text-white" />
            </div>
            {/* <div className="w-px h-[1rem] bg-[#4A5EE2] absolute left-[50%] top-[30%]" /> */}
            <div
              className={`bg-[#2853E3] w-[4rem] h-[2.5rem] rounded-tr-[.5rem] rounded-br-[.5rem] flex items-center justify-center cursor-pointer ${
                redoStack.length > 0 ? "" : "bg-[#a1a2a5] cursor-not-allowed"
              }`}
              onClick={() => {
                redoStack.length > 0 && onRedo();
              }}
            >
              {/* 下一步 */}
              <ArrowRightOutlined className="text-white" />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-[1.5rem] w-full h-full relative">
        {(isEmpty(previewImg) || loading) && (
          <Spin className="absolute top-[50%]" />
        )}

        <canvas
          ref={canvasRef}
          id="drawingCanvas"
          className="w-full h-full object-fill"
        />
      </div>

      {isEdit && (
        <div
          className={`h-[5rem] bg-white flex justify-center items-center ${
            type
              ? "absolute bottom-[2rem] left-[-1.5rem] w-[calc(100%+3rem)] z-1 shadow-[0_1.875rem_1.25rem_1.25rem_rgba(0,0,0,0.3)]"
              : ""
          }`}
        >
          <Button className="w-[6rem] h-[2.75rem]" onClick={() => backPage()}>
            返回
          </Button>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBorderColor: "#2853E3",
                  defaultColor: "#2853E3",
                },
              },
            }}
          >
            <Button
              className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
              onClick={onClear}
            >
              重新绘制
            </Button>
          </ConfigProvider>
          <Button
            type="primary"
            className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
            onClick={onSave}
          >
            保存
          </Button>
        </div>
      )}
    </div>
  );
};
