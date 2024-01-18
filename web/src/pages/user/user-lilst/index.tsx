import { useAuth } from "@/hooks/use-auth";
import HOME_KEYS from "@/i18n/language/keys/operation-log-keys";

export const UserList = () => {
  const { t } = useAuth();

  return <div>{t(HOME_KEYS.TO_BE_QUOTED, { ns: "operationLog" })}</div>;
};
