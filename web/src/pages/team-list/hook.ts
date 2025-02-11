import { useDebounce, useMemoizedFn, useUpdateEffect } from "ahooks";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { GetAccountInfoApi } from "@/services/api/login";
import { GetTeamPageApi } from "@/services/api/team-list";
import {
  ICameraAiTeamsProps,
  IGetTeamListRequest,
  IGetTeamListResponse,
} from "@/services/dtos/team-list";

const initTeamList: IGetTeamListResponse = {
  count: 0,
  cameraAiTeams: [],
};

const initKeyWordDtos = {
  TeamName: "",
  BelongCompany: "",
  Leader: "",
  LeaderId: "",
  Phone: "",
  Keyword: "",
};

export const useAction = () => {
  const { t } = useAuth();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [inputField, setInputField] = useState<{
    range: keyof typeof keyWordDto;
    value: string;
  }>({
    range: "Keyword",
    value: "",
  });

  const [teamList, setTeamList] = useState<IGetTeamListResponse>(initTeamList);

  const [pagInationDto, setPagInationDto] = useState<IGetTeamListRequest>({
    PageIndex: 1,
    PageSize: 10,
  });

  const [keyWordDto, setKeyWordDto] =
    useState<IGetTeamListRequest>(initKeyWordDtos);

  const [goBackstageLoading, setGoBackstageLoading] = useState<boolean>(false);

  const updatePaginationDto = useMemoizedFn(
    (k: keyof IGetTeamListRequest, v: number | string) => {
      setPagInationDto((prev) => ({
        ...prev,
        [k]: v,
      }));
    }
  );

  const getTeamList = () => {
    setTableLoading(true);

    GetTeamPageApi({ ...pagInationDto, ...keyWordDto })
      .then((res) => {
        setTeamList(res ?? initTeamList);
      })
      .catch((err) => {
        setTeamList(initTeamList);

        message.error(`獲取團隊列表失敗：${err}`);
      })
      .finally(() => setTableLoading(false));
  };

  const searchValueDebounce = useDebounce(inputField.value, {
    wait: 800,
  });

  const handleGoBackstage = (record: ICameraAiTeamsProps) => {
    message.info("請稍等......");

    setGoBackstageLoading(true);

    GetAccountInfoApi({})
      .then((res) => {
        localStorage.setItem("currentAccount", JSON.stringify(res.userProfile));
      })
      .catch((err) => {
        message.error(`获取账号信息失败：${(err as Error).message}`);
      })
      .finally(() => {
        setGoBackstageLoading(false);

        localStorage.setItem("currentTeam", JSON.stringify(record));

        localStorage.setItem("backstage", "admin");

        window.location.reload();
      });
  };

  useEffect(() => {
    getTeamList();
  }, [keyWordDto, pagInationDto]);

  useUpdateEffect(() => {
    updatePaginationDto("PageIndex", 1);

    setKeyWordDto({
      ...initKeyWordDtos,
      [inputField.range]: inputField.value,
    });
  }, [searchValueDebounce]);

  return {
    t,
    tableLoading,
    teamList,
    pagInationDto,
    inputField,
    goBackstageLoading,
    navigate,
    updatePaginationDto,
    setInputField,
    handleGoBackstage,
  };
};
