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
          label: `${t(MONITOR_KEY.TOUCH_GOODS, source)}`,
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
          label: `${t(MONITOR_KEY.FORKLIFT, source)}`,
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
          label: `${t(MONITOR_KEY.FLOOR_WATER, source)}`,
          value: CameraAiMonitorType.FloorWater,
        },
        {
          label: `${t(MONITOR_KEY.FLOOR_ICE, source)}`,
          value: CameraAiMonitorType.FloorIce,
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
