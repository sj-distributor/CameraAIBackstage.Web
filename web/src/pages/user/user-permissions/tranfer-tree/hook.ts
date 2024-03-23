import { useAuth } from "@/hooks/use-auth";
import { GetFoundationData } from "@/services/api/tree";
import { HierarchyDepthEnum, IFoundationResponse } from "@/services/dtos/tree";
import { message } from "antd";
import { useEffect, useState } from "react";

export interface IFoundationDetail {
  department: {
    id: string;
    name: string;
    parentId: string;
  };
  staffs: {
    id: string;
    userName: string;
  }[];
  childrens?: IFoundationDetail[];
}

export interface ITreeData {
  title: string;
  value?: string;
  key: string;
  parentId?: string;
  children?: ITreeData[];
}

export interface ITreeSelectNode {
  key: string;
  title: string;
  type: string;
  parent_id?: string;
  children?: ITreeSelectNode[];
}

export const useAction = () => {
  const { t } = useAuth();

  const source = { ns: "userPermissions" };

  const [treeData, setTreeData] = useState<ITreeData[]>([]);

  const convertDetailToTreeData = (detail: IFoundationDetail) => {
    const { department, staffs, childrens } = detail;

    const treeData: ITreeData = {
      title: department.name,
      value: department.id,
      key: department.id,
    };

    if (staffs && staffs.length > 0) {
      treeData.children = staffs.map((staff) => ({
        title: staff.userName,
        value: staff.id,
        key: staff.id,
      }));
    }

    if (childrens && childrens.length > 0) {
      treeData.children = (treeData.children || []).concat(
        childrens.map(convertDetailToTreeData)
      );
    }

    return treeData;
  };

  const convertToTreeData = (foundationData: IFoundationResponse) => {
    return foundationData.staffDepartmentHierarchy.map(convertDetailToTreeData);
  };

  const onGetFoundationData = () => {
    GetFoundationData("HierarchyDepth", HierarchyDepthEnum.Group)
      .then((response) => {
        setTreeData(response ? convertToTreeData(response) : []);
      })
      .catch((error) => {
        message.error(error.msg);
        setTreeData([]);
      });
  };

  useEffect(() => {
    onGetFoundationData();
  }, []);

  return { t, source, treeData };
};
