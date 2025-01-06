import { useDebounce, useUpdateEffect } from "ahooks";
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

const mockTeamMember = [
  {
    id: 24,
    staffId: "5481be79-b6e9-488f-8ede-f6a4505ac85e",
    userAccountId: 9943,
    name: "Mindy.L",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904395",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:00:17.233+00:00",
  },
  {
    id: 25,
    staffId: "af6e3c89-d2b1-4a1e-8f63-7f3a3d5c2f1a",
    userAccountId: 9944,
    name: "Alice.W",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904396",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:01:17.233+00:00",
  },
  {
    id: 26,
    staffId: "7be4c501-c0f3-4856-9f0c-9f658d0ed92b",
    userAccountId: 9945,
    name: "Bob.K",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904397",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:02:17.233+00:00",
  },
  {
    id: 27,
    staffId: "a81d4b67-5af3-4c99-90b7-183e09d9b5c4",
    userAccountId: 9946,
    name: "Charlie.Z",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904398",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:03:17.233+00:00",
  },
  {
    id: 28,
    staffId: "2b59d354-e365-42e3-91f5-ec78f83a9b92",
    userAccountId: 9947,
    name: "Diana.Y",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904399",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:04:17.233+00:00",
  },
  {
    id: 29,
    staffId: "3e6c485a-6df4-4971-b89e-c6f7e3e27e17",
    userAccountId: 9948,
    name: "Eve.J",
    department: "IS部",
    group: "SATURN组",
    position: "初级程序员",
    positionStatus: "在職",
    phone: "365904400",
    email: null,
    wechatName: null,
    isQualified: false,
    status: 1,
    from: 1,
    isDeleted: false,
    createdTime: "2025-01-06T06:05:17.233+00:00",
  },
];

export const useAction = () => {
  const { message } = App.useApp();

  const { currentTeam, currentAccount, setCurrentTeam } = useAuth();

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
    GetUserList({
      PageIndex: 1,
      PageSize: 2147483647,
      TeamId: currentTeam.id,
    })
      .then((res) => {
        setTeamUsers(res.userProfiles ?? []);

        const leaderInfo = res?.userProfiles.filter((item) => {
          return item.id === Number(currentTeam.leaderId);
        });

        updateTeamInfo("leaderName", leaderInfo[0].name);

        setTempTeamLeader((prev) => ({
          ...prev,
          name: leaderInfo[0].name,
        }));
      })
      .catch((err) => {
        setTeamUsers([]);

        message.error(`获取团队成员失败：${(err as Error).message}`);
      });
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
