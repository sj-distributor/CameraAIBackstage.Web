import { useDebounce } from "ahooks";
import { App } from "antd";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  PostHandOver,
  PostUpdateTeamApi,
  PostUploadApi,
} from "@/services/api/team-info";
import { GetUserList } from "@/services/api/user";
import { ITeamListProps } from "@/services/dtos/login";
import { IUserDataItem } from "@/services/dtos/user";

export const useAction = () => {
  const { message } = App.useApp();

  const { t, currentTeam, currentAccount, myPermissions, setCurrentTeam } =
    useAuth();

  const [teamInfo, setTeamInfo] = useState<ITeamListProps>(currentTeam);

  const [teamUsers, setTeamUsers] = useState<IUserDataItem[]>([]);

  const [openSelectMember, setOpenSelectMember] = useState<boolean>(false);

  const [tempTeamLeader, setTempTeamLeader] = useState<{
    id: number;
    name: string;
  }>({
    id: Number(currentTeam.leaderId),
    name: "",
  });

  const [showReUpload, setShowReUpload] = useState<boolean>(false);

  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);

  const [keyWord, setKeyWord] = useState<string>("");

  const [uploadLoading, setUploading] = useState<boolean>(false);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [getTeamUsersLoading, setGetTeamUsersLoading] =
    useState<boolean>(false);

  const updateTeamInfo = (k: keyof ITeamListProps, v: string | number) => {
    setTeamInfo((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const onUpload = (records: Record<string, any>[]) => {
    setUploading(true);

    const formData = new FormData();

    records.forEach((file) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });

    PostUploadApi(formData)
      .then((res) => {
        updateTeamInfo("avatarUrl", res.fileUrl);
      })
      .catch((err) => {
        message.error(`上传失败：${(err as Error).message}`);
      })
      .finally(() => setUploading(false));
  };

  const getTeamsUser = () => {
    setGetTeamUsersLoading(true);

    GetUserList({
      PageIndex: 1,
      PageSize: 2147483647,
      TeamId: currentTeam.id,
    })
      .then((res) => {
        setTeamUsers(res?.userProfiles ?? []);

        const leaderInfo = res?.userProfiles.filter((item) => {
          return item.id === Number(currentTeam.leaderId);
        });

        updateTeamInfo("leaderName", leaderInfo[0]?.name ?? "");

        setTempTeamLeader((prev) => ({
          ...prev,
          name: leaderInfo[0]?.name ?? "",
        }));
      })
      .catch((err) => {
        setTeamUsers([]);

        message.error(`获取团队成员失败：${(err as Error).message}`);
      })
      .finally(() => setGetTeamUsersLoading(false));
  };

  const handleUpdateTeamInfo = () => {
    setSubmitLoading(true);

    PostUpdateTeamApi({ team: teamInfo })
      .then((res) => {
        if (res) {
          if (
            currentAccount.id === Number(currentTeam.leaderId) &&
            currentTeam.leaderId !== teamInfo.leaderId
          ) {
            handOverTeam();
          } else {
            setSubmitLoading(false);

            message.success("修改团队信息成功");

            localStorage.setItem("currentTeam", JSON.stringify(res));

            setCurrentTeam(res);
          }
        } else {
          setSubmitLoading(false);

          message.error("团队信息有误");
        }
      })
      .catch((err) => {
        setSubmitLoading(false);

        message.error(`修改团队信息失败：${(err as Error).message}`);
      });
  };

  const handOverTeam = () => {
    PostHandOver({
      teamId: teamInfo.id,
      userProfileId: teamInfo.leaderId,
    })
      .then((res) => {
        message.success("修改团队信息成功");

        localStorage.setItem("currentTeam", JSON.stringify(res.team));

        setCurrentTeam(res.team);
      })
      .catch((err) => {
        message.error(`修改团队信息失败：${(err as Error).message}`);
      })
      .finally(() => setSubmitLoading(false));
  };

  const resetTeamInfo = () => {
    setTeamInfo(currentTeam);

    const leaderInfo = teamUsers.filter(
      (item) => item.id === Number(currentTeam.leaderId)
    );

    updateTeamInfo("leaderName", leaderInfo[0].name);

    setTempTeamLeader({
      id: leaderInfo[0].id,
      name: leaderInfo[0].name,
    });
  };

  const searchValueDebounce = useDebounce(keyWord, {
    wait: 800,
  });

  const filteredTeamUsers = useMemo(() => {
    return teamUsers.filter((item) =>
      item.name.toLowerCase().includes(searchValueDebounce.toLowerCase())
    );
  }, [searchValueDebounce, teamUsers]);

  useEffect(() => {
    getTeamsUser();
  }, []);

  return {
    t,
    teamInfo,
    currentTeam,
    currentAccount,
    openSelectMember,
    showReUpload,
    confirmCancel,
    tempTeamLeader,
    keyWord,
    filteredTeamUsers,
    uploadLoading,
    submitLoading,
    getTeamUsersLoading,
    myPermissions,
    updateTeamInfo,
    onUpload,
    handleUpdateTeamInfo,
    setOpenSelectMember,
    setShowReUpload,
    setConfirmCancel,
    setTempTeamLeader,
    resetTeamInfo,
    setKeyWord,
  };
};
