import { theme } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "../../../../i18n/language/keys/monitor-add-keys";
import { CameraAiMonitorType } from "@/services/dtos/monitor";
import MONITOR_KEY from "../../../../i18n/language/keys/monitor-keys";
import { IMonitorOptionDto } from "../../props";

export const useAction = () => {
  const { t } = useAuth();

  const { token } = theme.useToken();

  const navigate = useNavigate();

  const source = { ns: "monitorAdd" };
  const monitorSource = { ns: "monitor" };

  const monitorTypeOption: IMonitorOptionDto[] = [
    {
      value: CameraAiMonitorType.People,
      label: `${t(MONITOR_KEY.IDENTIFY_PEOPLE, monitorSource)}`,
    },
    {
      value: CameraAiMonitorType.Vehicles,
      label: `${t(MONITOR_KEY.IDENTIFY_VEHICLES, monitorSource)}`,
    },
    {
      value: CameraAiMonitorType.AbnormalVehicles,
      label: `${t(MONITOR_KEY.IDENTIFY_ABNORMAL_VEHICLES, monitorSource)}`,
    },
    {
      value: CameraAiMonitorType.Security,
      label: `${t(MONITOR_KEY.SECURITY, monitorSource)}`,
    },
  ];

  return { monitorTypeOption, token, navigate, KEYS, t, source };
};
