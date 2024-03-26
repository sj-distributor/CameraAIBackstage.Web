import { theme } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "../../../../i18n/language/keys/monitor-add-keys";
import { useEffect, useState } from "react";
import { GetMonitorType } from "@/services/api/monitor";
import { IMonitorTypeResponse } from "@/services/dtos/monitor";

export const useAction = () => {
  const { t } = useAuth();

  const { token } = theme.useToken();

  const navigate = useNavigate();

  const source = { ns: "monitorAdd" };

  const [warningTypeData, setWarningTypeData] = useState<
    IMonitorTypeResponse[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    GetMonitorType()
      .then((res) => {
        setWarningTypeData(res);
      })
      .catch(() => {
        setWarningTypeData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { warningTypeData, token, navigate, KEYS, t, source, loading };
};
