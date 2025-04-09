import { useThrottleEffect, useToggle } from "ahooks";
import { clone, isEmpty } from "ramda";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { IMetadataProps } from "@/services/dtos/monitor";

export interface IProps {
  type: boolean; // true 監測管理 false 出入口管理
  previewImg: string;
  isEdit: boolean;
  equipmentName: string;
  coordinatesRef: MutableRefObject<IMetadataProps[] | undefined>;
  backPage: () => void;
}

export interface IPointProps {
  x: number;
  y: number;
}

export const useAction = (props: IProps) => {
  const { previewImg, coordinatesRef, isEdit, backPage } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [loading, { setRight: closeLoading }] = useToggle<boolean>(true);

  const [drawing, { setLeft: stopDraw, setRight: beginDraw }] =
    useToggle<boolean>(false);

  const [draggingPoint, setDraggingPoint] = useState<{
    pre: number;
    sub: number;
    point: IPointProps;
  } | null>(null);

  const [undoStack, setUndoStack] = useState<IPointProps[][][]>([[]]);

  const [redoStack, setRedoStack] = useState<IPointProps[][][]>([]);

  const [rect, setRect] = useState<IPointProps[]>([]);

  const [rectList, setRectList] = useState<IPointProps[][]>([]);

  const [movePoint, setMovePoint] = useState<IPointProps | null>(null);

  const pointRadius = 6;

  const handleDraw = (ctx: CanvasRenderingContext2D) => {
    const _drawRect = (rectItem: IPointProps[], isMove: boolean = false) => {
      if (!rectItem || !rectItem.length) return;

      ctx.beginPath();

      rectItem.forEach(({ x, y }, index) => {
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      if (isMove && movePoint) {
        ctx.lineTo(movePoint.x, movePoint.y);
      }

      ctx.closePath();
      ctx.strokeStyle = "#00FFA1";
      ctx.lineWidth = 4;
      ctx.stroke();

      rectItem?.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#2853E3";
        ctx.fill();
      });
    };

    rectList?.forEach((rectItem) => {
      _drawRect(rectItem);
    });

    _drawRect(rect ?? [], true);
  };

  const handleGetDragging = (
    x: number,
    y: number
  ): {
    pre: number;
    sub: number;
    point: IPointProps;
  } | null => {
    if (!rect) return null;

    let pre = -1,
      sub = -1;

    pre =
      rectList?.findIndex((rectItem) => {
        sub =
          rectItem?.findIndex((point) => {
            const dx = x - point.x;

            const dy = y - point.y;

            return Math.sqrt(dx * dx + dy * dy) <= pointRadius;
          }) ?? -1;

        return sub !== -1;
      }) ?? -1;

    return sub !== -1 || sub !== -1
      ? {
          pre,
          sub,
          point: rectList[pre][sub],
        }
      : null;
  };

  const handleCompleteDraw = () => {
    stopDraw();

    setDraggingPoint(() => null);

    setMovePoint(() => null);

    if (rect?.length > 2) {
      setRectList((prev) => {
        const newRectList = [...clone(prev), clone(rect)];

        setUndoStack((prev) => [...prev, clone(newRectList)]);

        return newRectList;
      });

      setRedoStack([]);
    }

    setRect(() => []);
  };

  const handleDrawCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = previewImg;

    img.onload = () => {
      closeLoading();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      handleDraw(ctx);
    };

    img.onerror = () => {
      console.error("Image failed to load.", img.src);
    };
  };

  const handleConvertToPixelCoordinates = (
    coordinates: IMetadataProps[],
    canvas: HTMLCanvasElement | null
  ) => {
    if (!canvas || !coordinates || !coordinates?.length) return null;

    return coordinates
      .map(
        (item) =>
          item?.cameraAiCoordinates?.map((point) => ({
            x: point.xCoordinate * canvas.width,
            y: point.yCoordinate * canvas.height,
          })) ?? []
      )
      .filter((item) => item?.length > 2);
  };

  const onUndo = () => {
    setUndoStack((prev) => {
      const newStack = clone(prev);

      if (prev.length > 1) {
        const last = newStack.pop();

        if (last) setRedoStack((redo) => [last, ...clone(redo)]);

        setRectList(() => clone(prev[prev.length - 2]) ?? []);
      }

      return newStack;
    });

    setRect(() => []);
  };

  const onRedo = () => {
    setRedoStack((prev) => {
      const newRedo = [...prev];

      if (prev.length > 0) {
        const next = newRedo.shift();

        if (next) {
          setUndoStack((undo) => [...clone(undo), next]);

          setRectList(() => next);
        }
      }

      return newRedo;
    });

    setRect(() => []);
  };

  const onClear = () => {
    setRect([]);
    setRectList([]);
    setUndoStack([[]]);
    setRedoStack([]);
  };

  const onSave = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const newCoordinates =
      rectList?.map((rectItem) => ({
        cameraAiCoordinates:
          rectItem?.map((point) => ({
            xCoordinate: parseFloat((point.x / canvas.width).toFixed(2)),
            yCoordinate: parseFloat((point.y / canvas.height).toFixed(2)),
          })) ?? [],
      })) ?? [];

    coordinatesRef && (coordinatesRef.current = newCoordinates);

    backPage?.();
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
    if (!isEmpty(coordinatesRef?.current)) {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const pixelCoordinates = handleConvertToPixelCoordinates(
        coordinatesRef.current ?? [],
        canvas
      );

      pixelCoordinates && setRectList(pixelCoordinates);

      setUndoStack([pixelCoordinates ?? []]);

      handleDrawCanvas();
    }
  }, []);

  useThrottleEffect(
    () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      handleDrawCanvas();

      if (!isEdit || loading) return;

      const _onClick = (e: MouseEvent) => {
        const { offsetX, offsetY } = e;

        if (draggingPoint) {
          setDraggingPoint(() => null);

          setUndoStack((prev) => [...clone(prev), clone(rectList)]);

          return;
        }

        setRect((prev) => [...prev, { x: offsetX, y: offsetY }]);

        beginDraw();
      };

      const _onMouseDown = (e: MouseEvent) => {
        const { offsetX, offsetY } = e;

        const dragging = handleGetDragging(offsetX, offsetY);

        dragging && setDraggingPoint(dragging);
      };

      const _onMouseMove = (e: MouseEvent) => {
        const { offsetX, offsetY } = e;

        if (!canvasRef.current) {
          setMovePoint(() => null);
        } else if (drawing) {
          setMovePoint({ x: offsetX, y: offsetY });
        } else if (draggingPoint) {
          const { pre, sub } = draggingPoint;

          setMovePoint({ x: offsetX, y: offsetY });

          setRectList((prev) => {
            const newRectList = [...prev];

            newRectList[pre][sub] = { x: offsetX, y: offsetY };

            return newRectList;
          });
        } else {
          const dragging = handleGetDragging(offsetX, offsetY);

          if (dragging) {
            canvas.style.cursor = "pointer";
          } else {
            canvas.style.cursor = "default";
          }
        }
      };

      const _onContextMenu = (e: MouseEvent) => {
        if (drawing) {
          e.preventDefault();

          handleCompleteDraw();
        }
      };

      canvas.addEventListener("click", _onClick);
      canvas.addEventListener("mousedown", _onMouseDown);
      canvas.addEventListener("mousemove", _onMouseMove);
      canvas.addEventListener("contextmenu", _onContextMenu);

      return () => {
        canvas.removeEventListener("click", _onClick);
        canvas.removeEventListener("mousedown", _onMouseDown);
        canvas.removeEventListener("mousemove", _onMouseMove);
        canvas.removeEventListener("contextmenu", _onContextMenu);
      };
    },
    [rect, loading, drawing, draggingPoint, movePoint],
    {
      wait: 10,
    }
  );

  return {
    canvasRef,
    loading,
    undoStack,
    redoStack,
    onUndo,
    onRedo,
    onClear,
    onSave,
  };
};
