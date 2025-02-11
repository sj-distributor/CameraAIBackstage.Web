import { useUpdateEffect } from "ahooks";
import { App, Form } from "antd";
import { isEmpty, isNil } from "ramda";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-list-keys";
import { GetRegionPage } from "@/services/api/equipment/list";
import { GetTeamsMineApi } from "@/services/api/login";
import {
  GetUserNotificationApi,
  PostUserUpdateApi,
} from "@/services/api/team-list";
import { ITeamListProps } from "@/services/dtos/login";
import { IPostUpdateUserProps } from "@/services/dtos/team-list";
import { UserStatus } from "@/services/dtos/user";

interface IUserInfoProps {
  label: string;
  value: string;
}

interface IUserSettingLoading {
  initGetLoading: boolean;
  updateLoading: boolean;
}

const initUserSetting: IPostUpdateUserProps = {
  teamId: "",
  userProfileId: "",
  status: UserStatus.Disable,
  regionIds: [],
  userProfileNotificationDto: {
    id: "",
    email: "",
    phone: "",
    workWechat: "",
  },
};

export const useAction = () => {
  const { message } = App.useApp();

  const location = useLocation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { t, isSuperAdmin, currentTeam } = useAuth();

  const userInfoRecord = location.state.record || {};

  const isFirstGetRegion = useRef<boolean>(true);

  const [selectLoading, setSelectLoading] = useState<boolean>(false);

  const [selectRange, setSelectRange] = useState<number[]>([]);

  const [teamsSelectLoading, setTeamsSelectLoading] = useState<boolean>(false);

  const [teamList, setTeamList] = useState<ITeamListProps[]>([]);

  const [regionData, setRegionData] = useState<
    { value: number; label: string }[]
  >([]);

  const userInfo: IUserInfoProps[] = [
    {
      label: t(KEYS.USER_ID, { ns: "userList" }),
      value: userInfoRecord?.id ?? "",
    },
    {
      label: t(KEYS.NAME, { ns: "userList" }),
      value: userInfoRecord?.name ?? "",
    },
    {
      label: t(KEYS.DEPARTMENT, { ns: "userList" }),
      value: userInfoRecord?.department ?? "",
    },
    {
      label: t(KEYS.GROUP, { ns: "userList" }),
      value: userInfoRecord?.group ?? "",
    },
    {
      label: t(KEYS.POSITION, { ns: "userList" }),
      value: userInfoRecord?.position ?? "",
    },
    {
      label: t(KEYS.POSITION_STATUS, { ns: "userList" }),
      value: userInfoRecord?.positionStatus ?? "",
    },
    {
      label: t(KEYS.PHONE, { ns: "userList" }),
      value: userInfoRecord?.phone ?? "",
    },
    {
      label: t(KEYS.WECHAT_NAME, { ns: "userList" }),
      value: userInfoRecord?.wechatName ?? "",
    },
    {
      label: t(KEYS.EMAIL, { ns: "userList" }),
      value: userInfoRecord?.email ?? "",
    },
  ];

  const [userSetting, setUserSetting] =
    useState<IPostUpdateUserProps>(initUserSetting);

  const [userSettingLoading, setUserSettingLoading] =
    useState<IUserSettingLoading>({
      initGetLoading: false,
      updateLoading: false,
    });

  const loading = (k: keyof IUserSettingLoading, v: boolean) => {
    setUserSettingLoading((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const filterOption = (
    input: string,
    option?: {
      label?: string;
      value: number | string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSubmit = () => {
    loading("updateLoading", true);

    console.log(selectRange);

    const updateSetting = { ...userSetting, regionIds: selectRange };

    console.log(updateSetting);

    // return;

    PostUserUpdateApi(updateSetting)
      .then(() => {
        message.success("更改成功");
      })
      .catch((err) => {
        `更改失败：${(err as Error).message}`;
      })
      .finally(() => loading("updateLoading", false));
  };

  // 拿用户所有的团队
  const getUserTeams = () => {
    setTeamsSelectLoading(true);

    GetTeamsMineApi({ UserProfileId: userInfoRecord?.id })
      .then((res) => {
        setTeamList(res ?? []);

        Promise.all([
          getUserNotification(userInfoRecord?.id, res[0].id),
          getRegions(res?.[0]?.id),
        ]).finally(() => {
          loading("initGetLoading", false);
        });

        setUserSetting((prev) => ({
          ...prev,
          teamId: res?.[0]?.id ?? "",
        }));
      })
      .catch((err) => {
        message.error(`获取團隊失敗：${(err as Error).message}`);
      })
      .finally(() => setTeamsSelectLoading(false));
  };

  // 拿到通知的数据
  const getUserNotification = (UserProfileId: string, TeamId: string) => {
    return new Promise((resolve, reject) => {
      GetUserNotificationApi({
        UserProfileId: UserProfileId,
        TeamId: TeamId,
      })
        .then((res) => {
          resolve(res);

          setUserSetting({
            teamId: TeamId,
            userProfileId: userInfoRecord?.id,
            status: res?.userProfileDto?.status,
            regionIds: res?.cameraAiEquipmentVisibleRangesDto.map(
              (item) => item?.regionId
            ),
            userProfileNotificationDto: {
              id: res?.userProfileNotificationDto?.id,
              email: res?.userProfileNotificationDto?.email,
              phone: res?.userProfileNotificationDto?.phone,
              workWechat: res?.userProfileNotificationDto?.workWechat,
            },
          });

          setSelectRange(
            res?.cameraAiEquipmentVisibleRangesDto.map((item) => item.regionId)
          );
        })
        .catch((err) => {
          reject(err);
          message.error(`获取用戶設置信息失敗：${(err as Error).message}`);
        });
    });
  };

  // 拿这个团队下的地址范围
  const getRegions = (TeamId: string) => {
    if (isEmpty(TeamId) || isNil(TeamId)) {
      message.warning("未有獲取到TeamId");

      return;
    }

    setSelectLoading(true);

    return new Promise((resolve, reject) => {
      GetRegionPage({ TeamId: TeamId })
        .then((res) => {
          resolve(res);

          const data = [
            { value: -1, label: t(KEYS.NO_VIEW_RANGE, { ns: "userList" }) },
            ...(res?.regions ?? []).map((item) => ({
              value: item.areaId,
              label: item.areaName,
            })),
          ];

          setRegionData(data);
        })
        .catch((err) => {
          reject(err);

          setRegionData([
            { value: -1, label: t(KEYS.NO_VIEW_RANGE, { ns: "userList" }) },
          ]);

          message.error(`获取数据失败：${(err as Error).message}`);
        })
        .finally(() => {
          setSelectLoading(false);
          isFirstGetRegion.current = false;
        });
    });
  };

  useEffect(() => {
    if (isSuperAdmin) {
      loading("initGetLoading", true);

      getUserTeams();
    } else {
      loading("initGetLoading", true);

      Promise.all([
        getUserNotification(userInfoRecord?.id, currentTeam.id),
        getRegions(currentTeam.id),
      ]).finally(() => {
        loading("initGetLoading", false);
      });
    }
  }, []);

  useUpdateEffect(() => {
    if (!isFirstGetRegion.current) {
      getRegions(userSetting.teamId);

      getUserNotification(userInfoRecord?.id, userSetting.teamId);
    }
  }, [userSetting.teamId]);

  return {
    t,
    form,
    selectLoading,
    selectRange,
    regionData,
    userInfo,
    isSuperAdmin,
    teamList,
    teamsSelectLoading,
    userSetting,
    userSettingLoading,
    navigate,
    setSelectRange,
    filterOption,
    onSubmit,
    setUserSetting,
  };
};
