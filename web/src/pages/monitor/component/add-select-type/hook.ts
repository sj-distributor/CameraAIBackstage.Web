import { useDebounce, useUpdateEffect } from "ahooks";
import { isEmpty } from "ramda";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { CameraAiMonitorType } from "@/services/dtos/monitor";

import KEYS from "../../../../i18n/language/keys/monitor-add-keys";
import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";
import { IMonitorType, IWarningType } from "../../props";

export const useAction = () => {
  const { t } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "monitorAdd" };

  const monitorSource = { ns: "monitor" };

  const [keyWord, setKeyWord] = useState<string>("");

  const [collapseOpenKey, setCollapseOpenKey] = useState<
    IWarningType[] | string[]
  >([IWarningType.People, IWarningType.Vehicles, IWarningType.Element]);

  const monitorTypeOption: IMonitorType[] = [
    {
      type: IWarningType.People,
      children: [
        {
          value: CameraAiMonitorType.People,
          label: `${t(MONITOR_KEY.IDENTIFY_PEOPLE, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.Smoke,
          label: `${t(MONITOR_KEY.SMOKE, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.Fight,
          label: `${t(MONITOR_KEY.FIGHT, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.Costume,
          label: `${t(MONITOR_KEY.COSTUME, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.TouchGoods,
          label: `${t(MONITOR_KEY.TOUCH_GOODS, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.Attendance,
          label: `進出時間登記`,
        },
        {
          label: "員工搬貨動作檢測",
          value: CameraAiMonitorType.Move,
        },
        {
          label: "人員摔跤檢測",
          value: CameraAiMonitorType.FallDown,
        },
      ],
    },
    {
      type: IWarningType.Vehicles,
      children: [
        {
          value: CameraAiMonitorType.Vehicles,
          label: `${t(MONITOR_KEY.IDENTIFY_VEHICLES, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.AbnormalVehicles,
          label: `${t(MONITOR_KEY.IDENTIFY_ABNORMAL_VEHICLES, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.Forklift,
          label: `${t(MONITOR_KEY.FORKLIFT, monitorSource)}`,
        },
        {
          label: "防滑膠墊使用檢測",
          value: CameraAiMonitorType.Antiskid,
        },
        {
          label: "叉車升降移動檢測",
          value: CameraAiMonitorType.ForkliftFork,
        },
      ],
    },
    {
      type: IWarningType.Element,
      children: [
        {
          value: CameraAiMonitorType.Animal,
          label: `${t(MONITOR_KEY.ANIMAL, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.FloorWater,
          label: `${t(MONITOR_KEY.FLOOR_WATER, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.FloorIce,
          label: `${t(MONITOR_KEY.FLOOR_ICE, monitorSource)}`,
        },
        {
          value: CameraAiMonitorType.DoorSafety,
          label: `安全門關閉檢測`,
        },
        {
          value: CameraAiMonitorType.DoorRolling,
          label: `卷簾門關閉檢測`,
        },
        {
          label: "場地環境衛生檢測",
          value: CameraAiMonitorType.Tidy,
        },
        {
          label: "垃圾桶關閉檢測",
          value: CameraAiMonitorType.TrashCanLid,
        },
      ],
    },
  ];

  const searchValueDebounce = useDebounce(keyWord, {
    wait: 500,
  });

  const filteredMonitorTypeOption = useMemo(() => {
    return monitorTypeOption.map((item) => {
      const filterData = item.children?.filter((child) =>
        child.label.toLowerCase().includes(keyWord.toLowerCase())
      );

      return {
        ...item,
        children: filterData,
      };
    });
  }, [searchValueDebounce]);

  useUpdateEffect(() => {
    isEmpty(keyWord)
      ? setCollapseOpenKey([])
      : setCollapseOpenKey(filteredMonitorTypeOption.map((item) => item.type));
  }, [searchValueDebounce]);

  return {
    KEYS,
    t,
    source,
    filteredMonitorTypeOption,
    keyWord,
    collapseOpenKey,
    navigate,
    setKeyWord,
    setCollapseOpenKey,
  };
};
