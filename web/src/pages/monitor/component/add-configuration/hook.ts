import { clone } from "ramda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISelectUserDto } from "./props";

export const useAction = () => {
  const navigate = useNavigate();

  const [cronList, setCronList] = useState([
    { title: "週一", value: false },
    { title: "週二", value: false },
    { title: "週三", value: false },
    { title: "週四", value: false },
    { title: "週五", value: false },
    { title: "週六", value: false },
    { title: "週日", value: false },
  ]);

  const [userList, setUserList] = useState([
    { label: "Ted.F", value: "Ted.F" },
    { label: "Ivan.W", value: "Ivan.W" },
    { label: "Winnie.X", value: "Winnie.X" },
    { label: "Koki.K", value: "Koki.K" },
  ]);

  const [selectUserList, setSelectUserList] = useState<ISelectUserDto[]>([]);

  const onDeleteNoticeUserItem = (index: number) => {
    const newSelectUserList = clone(selectUserList);

    newSelectUserList.splice(index, 1);
    setSelectUserList(newSelectUserList);
  };

  const onChangeNoticeUserList = (value: string[]) => {
    const newSelectList = clone(selectUserList);

    newSelectList.forEach((user, index) => {
      if (!value.includes(user.name)) {
        newSelectList.splice(index, 1);
      }
    });

    value.forEach((item) => {
      if (!newSelectList.some((user) => user.name === item)) {
        newSelectList.push({
          name: item,
          notificationTool: [],
        });
      }
    });

    setSelectUserList(newSelectList);
  };

  const onSubmit = () => {};

  return {
    cronList,
    setCronList,
    userList,
    setUserList,
    onDeleteNoticeUserItem,
    onChangeNoticeUserList,
    onSubmit,
    selectUserList,
    setSelectUserList,
    navigate,
  };
};
