import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { GetFoundationData } from "@/services/api/tree";
import { HierarchyDepthEnum, IFoundationResponse } from "@/services/dtos/tree";

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
  isUser?: boolean;
  parentId?: string;
  disabled?: boolean;
  children?: ITreeData[];
}

export interface ITreeSelectNode {
  key: string;
  title: string;
  type: string;
  parent_id?: string;
  disabled?: boolean;
  children?: ITreeSelectNode[];
}

export const useAction = (props: {
  staffIdSource: number;
  disabledKeys?: string[];
}) => {
  const { staffIdSource, disabledKeys } = props;

  const { t } = useAuth();

  const source = { ns: "userPermissions" };

  const [treeData, setTreeData] = useState<ITreeData[]>([]);

  const [treeFoundationResponse, setTreeFoundationResponse] =
    useState<IFoundationResponse>({ staffDepartmentHierarchy: [] });

  const convertDetailToTreeData = (detail: IFoundationDetail) => {
    const { department, staffs, childrens } = detail;

    const treeData: ITreeData = {
      title: department.name,
      value: department.id,
      key: department.id,
    };

    if (staffs && staffs.length > 0) {
      treeData.children = staffs.map((staff) => {
        return {
          title: staff.userName,
          value: staff.id,
          key: staff.id,
          isUser: true,
          disabled: disabledKeys?.some((item) => item == staff.id),
        };
      });
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
    GetFoundationData("HierarchyDepth", HierarchyDepthEnum.Group, staffIdSource)
      .then((response) => {
        setTreeData(response ? convertToTreeData(response) : []);
        setTreeFoundationResponse(response);
      })
      .catch((error) => {
        message.error(error.msg || error.message || error);
        setTreeData([]);
      });
  };

  useEffect(() => {
    onGetFoundationData();
  }, []);

  useEffect(() => {
    disabledKeys?.length &&
      setTreeData(
        treeFoundationResponse.staffDepartmentHierarchy
          ? convertToTreeData(treeFoundationResponse)
          : []
      );
  }, [disabledKeys]);

  return { t, source, treeData };
};
