// eslint-disable-next-line simple-import-sort/imports
import { theme } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "../../../../i18n/language/keys/monitor-add-keys";

export const useAction = () => {
  const { t } = useAuth();

  const { token } = theme.useToken();

  const navigate = useNavigate();

  const source = { ns: "monitorAdd" };

  const text = [
    { name: "識別人員", id: 1 },
    { name: "識別人員", id: 2 },
    { name: "識別人員", id: 3 },
    { name: "識別人員", id: 4 },
    { name: "識別人員", id: 5 },
    { name: "識別人員", id: 6 },
    { name: "識別人員", id: 7 },
    { name: "識別人員", id: 8 },
  ];

  return { text, token, navigate, KEYS, t, source };
};
