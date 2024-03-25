import { useAuth } from "@/hooks/use-auth";

export const useAction = () => {
  const { t } = useAuth();

  const source = { ns: "userPermissions" };

  return { t, source };
};
