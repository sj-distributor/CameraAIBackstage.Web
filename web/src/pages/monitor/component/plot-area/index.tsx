import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, message, Spin } from "antd";
import { isEmpty } from "ramda";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export const PlotArea = ({
  previewImg,
  coordinatesRef,
  isEdit,
  equipmentName,
  backPage,
}: {
  previewImg: string;
  coordinatesRef: MutableRefObject<
    { xCoordinate: number; yCoordinate: number }[]
  >;
  isEdit: boolean;
  equipmentName: string;
  backPage: () => void;
}) => {
  type Point = { x: number; y: number };
  type Rectangle = {
    topLeft: Point;
    topRight: Point;
    bottomLeft: Point;
    bottomRight: Point;
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startPointRef = useRef<Point | null>(null);

  const isFirstPlot = useRef<boolean>(true);

  const [rect, setRect] = useState<Rectangle | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [draggingPoint, setDraggingPoint] = useState<keyof Rectangle | null>(
    null
  );

  const [undoStack, setUndoStack] = useState<Rectangle[]>([]);

  const [redoStack, setRedoStack] = useState<Rectangle[]>([]);

  const pointRadius = 6;

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!isEmpty(coordinatesRef.current) && isFirstPlot.current) {
      const canvas = canvasRef.current;

      isFirstPlot.current = false;

      if (!canvas) return;

      const pixelCoordinates = convertToPixelCoordinates(
        coordinatesRef.current,
        canvas
      );

      setRect(pixelCoordinates);
    }

    if (rect) {
      ctx.beginPath();
      ctx.moveTo(rect.topLeft.x, rect.topLeft.y);
      ctx.lineTo(rect.topRight.x, rect.topRight.y);
      ctx.lineTo(rect.bottomRight.x, rect.bottomRight.y);
      ctx.lineTo(rect.bottomLeft.x, rect.bottomLeft.y);
      ctx.closePath();
      ctx.strokeStyle = "#00FFA1";
      ctx.lineWidth = 4;
      ctx.stroke();

      Object.values(rect).forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#2853E3";
        ctx.fill();
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const parent = canvas.parentElement;

      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(coordinatesRef.current)) {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const pixelCoordinates = convertToPixelCoordinates(
        coordinatesRef.current,
        canvas
      );

      setRect(pixelCoordinates);

      setUndoStack(pixelCoordinates ? [pixelCoordinates] : []);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const handleMouseDown = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;

      if (!rect) {
        const initialRect: Rectangle = {
          topLeft: { x: offsetX, y: offsetY },
          topRight: { x: offsetX, y: offsetY },
          bottomLeft: { x: offsetX, y: offsetY },
          bottomRight: { x: offsetX, y: offsetY },
        };

        setRect(initialRect);
        setRedoStack([]);
        setIsDrawing(true);

        startPointRef.current = { x: offsetX, y: offsetY };
      } else {
        const dragging = getDraggingPoint(offsetX, offsetY);

        if (dragging) {
          setDraggingPoint(dragging[0]);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;

      if (!canvasRef.current) return;

      const isOnPoint = getDraggingPoint(offsetX, offsetY);

      if (isOnPoint) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }

      if (isDrawing && rect) {
        setRect((prevRect) => {
          if (!prevRect) return null;

          return {
            topLeft: prevRect.topLeft,
            topRight: { x: offsetX, y: prevRect.topLeft.y },
            bottomLeft: { x: prevRect.topLeft.x, y: offsetY },
            bottomRight: { x: offsetX, y: offsetY },
          };
        });
      } else if (draggingPoint && rect) {
        setRect((prevRect) => {
          if (!prevRect) return null;
          const updatedRect = {
            ...prevRect,
            [draggingPoint]: { x: offsetX, y: offsetY },
          };

          return updatedRect;
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;

      setIsDrawing(false);

      setDraggingPoint(null);

      const isOnPoint = getDraggingPoint(offsetX, offsetY);

      if (!isOnPoint) return;

      if (startPointRef.current && rect) {
        const { offsetX, offsetY } = e;

        const dx = offsetX - startPointRef.current.x;

        const dy = offsetY - startPointRef.current.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          setRect(null);
        } else {
          setUndoStack((prev) => [...prev, rect]);
          setRedoStack([]);
        }
      } else if (coordinatesRef.current && rect) {
        setUndoStack((prev) => [...prev, rect]);
        setRedoStack([]);
      }
    };

    const getDraggingPoint = (
      x: number,
      y: number
    ): [keyof Rectangle, Point] | null => {
      if (!rect) return null;
      for (const [key, point] of Object.entries(rect) as [
        keyof Rectangle,
        Point
      ][]) {
        const dx = x - point.x;

        const dy = y - point.y;

        if (Math.sqrt(dx * dx + dy * dy) <= pointRadius) {
          return [key, point];
        }
      }

      return null;
    };

    if (isEdit) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }

    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = previewImg;

    img.onload = () => {
      setLoading(false);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      draw(ctx);
    };

    img.onerror = () => {
      console.error("Image failed to load.", img.src);
    };

    // 取视频第一帧
    // if (isFirst.current) {
    //   isFirst.current = false;

    //   const video = document.createElement("video");

    //   video.crossOrigin = "Anonymous";
    //   video.src = areaVideo;

    //   video.load();

    //   video.onloadeddata = () => {
    //     video.currentTime = 0;
    //   };

    //   video.onseeked = () => {
    //     requestAnimationFrame(() => {
    //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //       firstFrameImg.current = canvas.toDataURL("image/png");
    //       setLoading(false);
    //       draw(ctx);
    //     });
    //   };
    // } else if (firstFrameImg.current) {
    //   const img = new Image();

    //   img.crossOrigin = "Anonymous";
    //   img.src = firstFrameImg.current;
    //   img.onload = () => {
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     draw(ctx);
    //   };
    // }

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rect, isDrawing, draggingPoint]);

  const handleUndo = () => {
    setUndoStack((prev) => {
      if (prev.length >= 1) {
        const newStack = [...prev];

        const last = newStack.pop();

        if (last) setRedoStack((redo) => [last, ...redo]);
        setRect(newStack[newStack.length - 1]);

        return newStack;
      }

      return prev;
    });
  };

  const handleRedo = () => {
    setRedoStack((prev) => {
      if (prev.length > 0) {
        const newRedo = [...prev];

        const next = newRedo.shift();

        if (next) {
          setUndoStack((undo) => [...undo, next]);
          setRect(next);
        }

        return newRedo;
      }

      return prev;
    });
  };

  const handleClear = () => {
    setRect(null);
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;

    if (!rect) {
      message.info("请编辑一个完整的区域");

      return;
    }

    if (!canvas) return;

    const newCoordinates = [
      {
        xCoordinate: parseFloat((rect.topLeft.x / canvas.width).toFixed(2)),
        yCoordinate: parseFloat((rect.topLeft.y / canvas.height).toFixed(2)),
      },
      {
        xCoordinate: parseFloat((rect.topRight.x / canvas.width).toFixed(2)),
        yCoordinate: parseFloat((rect.topRight.y / canvas.height).toFixed(2)),
      },
      {
        xCoordinate: parseFloat((rect.bottomLeft.x / canvas.width).toFixed(2)),
        yCoordinate: parseFloat((rect.bottomLeft.y / canvas.height).toFixed(2)),
      },
      {
        xCoordinate: parseFloat((rect.bottomRight.x / canvas.width).toFixed(2)),
        yCoordinate: parseFloat(
          (rect.bottomRight.y / canvas.height).toFixed(2)
        ),
      },
    ];

    coordinatesRef.current = newCoordinates;

    backPage();
  };

  // 获取坐标系百分比后转化为四个点
  const convertToPixelCoordinates = (
    coordinates: {
      xCoordinate: number;
      yCoordinate: number;
    }[],
    canvas: HTMLCanvasElement | null
  ) => {
    if (!canvas || coordinates.length !== 4) return null;

    return {
      topLeft: {
        x: coordinates[0].xCoordinate * canvas.width,
        y: coordinates[0].yCoordinate * canvas.height,
      },
      topRight: {
        x: coordinates[1].xCoordinate * canvas.width,
        y: coordinates[1].yCoordinate * canvas.height,
      },
      bottomLeft: {
        x: coordinates[2].xCoordinate * canvas.width,
        y: coordinates[2].yCoordinate * canvas.height,
      },
      bottomRight: {
        x: coordinates[3].xCoordinate * canvas.width,
        y: coordinates[3].yCoordinate * canvas.height,
      },
    };
  };

  // window.addEventListener("resize", () => {
  //   const canvas = canvasRef.current;

  //   const newWidth = window.innerWidth;

  //   const newHeight = window.innerHeight;

  //   if (canvas) {
  //     const scaleX = newWidth / canvas?.width;

  //     const scaleY = newHeight / canvas?.height;

  //     canvas.width = scaleX * newWidth;
  //     canvas.height = scaleY * newHeight;

  //     // canvas.style.width = `${(scaleX * newWidth1) / 16}rem`;
  //     // canvas.style.height = `${(scaleY * newHeight1) / 16}rem`;
  //   }
  // });

  // window.addEventListener("resize", () => {
  //   const canvas = canvasRef.current;

  //   const newWidth = window.innerWidth;

  //   const newHeight = window.innerHeight;

  //   // 计算缩放比例
  //   if (canvas) {
  //     const scaleX = newWidth / canvas?.width;

  //     const scaleY = newHeight / canvas?.height;

  //     // 更新 Canvas 尺寸
  //     canvas.width = scaleX * newWidth;
  //     canvas.height = scaleY * newHeight;

  //     canvas.style.width = `${(scaleX * newWidth) / 16}rem`;
  //     canvas.style.height = `${(scaleY * newHeight) / 16}rem`;

  //     if (rect) {
  //       setRect({
  //         topLeft: {
  //           x: rect.topLeft.x * scaleX,
  //           y: rect.topLeft.y * scaleY,
  //         },
  //         topRight: {
  //           x: rect.topRight.x * scaleX,
  //           y: rect.topRight.y * scaleY,
  //         },
  //         bottomLeft: {
  //           x: rect.bottomLeft.x * scaleX,
  //           y: rect.bottomLeft.y * scaleY,
  //         },
  //         bottomRight: {
  //           x: rect.bottomRight.x * scaleX,
  //           y: rect.bottomRight.y * scaleY,
  //         },
  //       });
  //     }

  //     const ctx = canvas.getContext("2d");

  //     if (!ctx) return;

  //     const img = new Image();

  //     img.crossOrigin = "Anonymous";
  //     img.src = firstFrameImg.current ?? "";
  //     img.onload = () => {
  //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //       draw(ctx);
  //     };
  //   }
  // });

  return (
    <div
      className={`w-full -mt-4 ${isEdit ? "h-[calc(100%-15rem)]" : "h-full"}`}
    >
      {isEdit && (
        <div className="grid grid-cols-3 w-full">
          <div className="col-start-2 text-center font-semibold text-[#323444] text-[1.13rem]">
            设备名称：{equipmentName}
          </div>
          <div className="flex col-start-3 ml-auto relative">
            <div
              className="bg-[#2853E3] w-[4rem] h-[2.5rem] rounded-tl-[.5rem] rounded-bl-[.5rem] flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (undoStack.length === 0) return;
                handleUndo();
              }}
            >
              {/* 上一步 */}
              <ArrowLeftOutlined className="text-white" />
            </div>
            <div className="w-px h-[1rem] bg-[#4A5EE2] absolute left-[50%] top-[30%]" />
            <div
              className="bg-[#2853E3] w-[4rem] h-[2.5rem] rounded-tr-[.5rem] rounded-br-[.5rem] flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (redoStack.length === 0) return;
                handleRedo();
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
        <div className="h-[5rem] bg-white flex justify-center items-center">
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
              onClick={handleClear}
            >
              重新绘制
            </Button>
          </ConfigProvider>
          <Button
            type="primary"
            className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
            onClick={handleSave}
          >
            保存
          </Button>
        </div>
      )}
    </div>
  );
};
