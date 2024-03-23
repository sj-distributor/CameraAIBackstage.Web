import { CloseOutlined, WarningFilled } from "@ant-design/icons";
import { Transfer, Tree } from "antd";
import { TransferItem, TransferProps } from "antd/es/transfer";
import { DataNode } from "antd/es/tree";
import { Key, SetStateAction, useEffect, useState } from "react";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { ITreeData, ITreeSelectNode, useAction } from "./hook";

export const TransferTree = ({
  isModelOpen,
  setIsModelOpen,
  data,
}: {
  isModelOpen: boolean;
  setIsModelOpen: (value: SetStateAction<boolean>) => void;
  data: TransferItem[];
}) => {
  const { t, source, treeData } = useAction();

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const [searchValue, setSearchValue] = useState("");

  const onChange = (keys: string[]) => {
    setTargetKeys(keys);
  };

  const SearchLists = document.querySelectorAll(
    ".ant-transfer-list-body-search-wrapper"
  );

  useEffect(() => {
    const SearchList = document.querySelectorAll(
      ".ant-transfer-list-body-search-wrapper"
    );

    SearchList.forEach((list) => {
      const input = list.querySelector("input");

      if (input) {
        input.placeholder = t(KEYS.SEARCHING_USER_DEPARTMENT, source);
      }
    });
  }, [SearchLists]);

  const generateTree = (
    treeNodes: DataNode[] = [],
    targetKeys: string[] = []
  ): DataNode[] =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: targetKeys.includes(props.key as string),
      children: generateTree(children, targetKeys),
    }));

  const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) =>
    selectedKeys.includes(eventKey);

  const filterOption = (inputValue: string, option: ITreeData) => {
    if (option.title.indexOf(inputValue) > -1) {
      console.log(option);
      setExpandedKeys([option.key]);
      setAutoExpandParent(true);
    }

    return option.title.indexOf(inputValue) > -1;
  };

  const handleSearch: TransferProps["onSearch"] = (dir: any, value: any) => {
    // setSearchValue(value);
  };

  const onExpand = (expandedKeys: SetStateAction<Key[]>) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  const filterTreeNode = (node: any) => {
    const title = node.title.props.children[2];

    const result = title.indexOf(searchValue) !== -1 ? true : false;

    // console.log(title);
    // console.log(searchValue);
    // console.log(result);
    return result;
  };

  const loop = (data: any) =>
    data.map((item: any) => {
      const index = item.title.indexOf(searchValue);

      const beforeStr = item.title.substr(0, index);

      const afterStr = item.title.substr(index + searchValue.length);

      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <CustomModal
      title={
        <div className="flex flex-row justify-between">
          <div>{t(KEYS.ADD_USER, source)}</div>
          <CloseOutlined
            className="mr-[1rem]"
            onClick={() => setIsModelOpen(false)}
          />
        </div>
      }
      onCancle={() => setIsModelOpen(false)}
      onConfirm={() => setIsModelOpen(false)}
      open={isModelOpen}
      className={"customDeviceModal"}
      modalWidth="42.5rem"
    >
      <Transfer
        onSearch={handleSearch}
        targetKeys={targetKeys}
        showSelectAll={false}
        dataSource={treeData}
        filterOption={filterOption}
        onChange={onChange}
        showSearch
        className="tree-transfer"
        render={(item) => item.title!}
        listStyle={{
          width: 300,
          height: 250,
        }}
      >
        {({ direction, onItemSelect, selectedKeys }) => {
          if (direction === "left") {
            const checkedKeys = [...selectedKeys, ...targetKeys];

            return (
              <div>
                <Tree
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  checkable
                  checkStrictly
                  checkedKeys={checkedKeys}
                  filterTreeNode={filterTreeNode}
                  className="h-full"
                  treeData={generateTree(loop(treeData), targetKeys)}
                  onCheck={(_, { node: { key } }) => {
                    onItemSelect(key as string, !isChecked(checkedKeys, key));
                  }}
                  onSelect={(_, { node: { key } }) => {
                    onItemSelect(key as string, !isChecked(checkedKeys, key));
                  }}
                />
              </div>
            );
          }
        }}
      </Transfer>
    </CustomModal>
  );
};
