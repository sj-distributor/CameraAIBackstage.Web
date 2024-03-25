import { CloseOutlined } from "@ant-design/icons";
import { Transfer, Tree } from "antd";
import { TransferItem, TransferProps } from "antd/es/transfer";
import { DataNode } from "antd/es/tree";
import { Key, SetStateAction, useEffect, useState } from "react";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { ITreeData, useAction } from "./hook";

export const TransferTree = ({
  isModelOpen,
  setIsModelOpen,
}: {
  isModelOpen: boolean;
  setIsModelOpen: (value: SetStateAction<boolean>) => void;
  data: TransferItem[];
}) => {
  const { t, source, treeData } = useAction();

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const [arrTreeData, setArrTreeData] = useState<ITreeData[]>([]);

  const [targetAllData, setTargetAllData] = useState<ITreeData[]>([]);

  const treeToFlat = (data) => {
    return data.reduce(function (arr, { key, title, value, children = [] }) {
      // 解构赋值+默认值
      return arr.concat(
        [{ key, title, value, children }],
        treeToFlat(children)
      ); // children部分进行递归
    }, []);
  };

  const onChange = (keys: string[]) => {
    console.log(keys);
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

  const expandedKeysFun = (treeData: ITreeData[]) => {
    // 展开 key函数
    if (treeData && treeData.length == 0) {
      return [];
    }
    // console.log(treeData)
    const arr: string[] = [];

    const expandedKeysFn = (treeData: ITreeData[]) => {
      treeData.map((item: ITreeData) => {
        arr.push(item.key);
        if (item.children && item.children.length > 0) {
          expandedKeysFn(item.children);
        }
      });
    };

    expandedKeysFn(treeData);

    return arr;
  };

  const [copyTree, setCopyTree] = useState(JSON.stringify(treeData)); // 备份 treeData

  const [copyExpandedKeys, setCopyExpandedKeys] = useState(
    expandedKeysFun(treeData)
  );

  const [treeList, setTreeList] = useState(treeData);

  const arrayTreeFilter = (
    data: ITreeData[],
    predicate: any,
    filterText: string
  ) => {
    const nodes = data;

    // 如果已经没有节点了，结束递归
    if (!(nodes && nodes.length)) {
      return;
    }
    const newChildren = [];

    for (const node of nodes) {
      if (predicate(node, filterText)) {
        // 如果自己（节点）符合条件，直接加入到新的节点集
        newChildren.push(node);
        // 并接着处理其 children,（因为父节点符合，子节点一定要在，所以这一步就不递归了）
        // node.children = arrayTreeFilter(node.children, predicate, filterText);
      } else {
        // 如果自己不符合条件，需要根据子集来判断它是否将其加入新节点集
        // 根据递归调用 arrayTreeFilter() 的返回值来判断
        const subs = arrayTreeFilter(node.children, predicate, filterText);

        if ((subs && subs.length) || predicate(node, filterText)) {
          node.children = subs;
          newChildren.push(node);
        }
      }
    }

    return newChildren;
  };

  const filterFn = (data: { title: string }, filterText: string) => {
    // 过滤函数
    if (!filterText) {
      return true;
    }

    return data.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1; // 我是一title过滤 ，你可以根据自己需求改动
  };

  const handleSearch: TransferProps["onSearch"] = (dir: any, value: string) => {
    if (dir === "left") {
      if (value == "") {
        setTreeList(JSON.parse(copyTree));
        setExpandedKeys([]);
      } else {
        const filterData = arrayTreeFilter(treeList, filterFn, value);

        const expkey = filterData ? expandedKeysFun(filterData) : [];

        filterData && setTreeList(filterData);
        setTimeout(() => {
          setExpandedKeys(expkey);
        }, 500);
      }
    }
  };

  const onExpand = (expandedKeys: SetStateAction<Key[]>) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  useEffect(() => {
    const expandedKey = expandedKeysFun(treeData);

    const cpData = JSON.stringify(treeData);

    setExpandedKeys([]);
    setCopyTree(cpData);
    setTreeList(treeData);
    setCopyExpandedKeys(expandedKey);

    treeData && setArrTreeData(treeToFlat(treeData));
  }, [treeData]);

  useEffect(() => {
    if (arrTreeData.length) {
      const selectedData = arrTreeData.filter((item) =>
        targetKeys.includes(item.key)
      );

      setTargetAllData(selectedData);
    }
  }, [targetKeys]);

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
        dataSource={treeList}
        onChange={onChange}
        selectAllLabels={[
          t(KEYS.TITLE, source),
          t(KEYS.USER_HAS_BEEN_SELECTED, source),
        ]}
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
                  checkedKeys={checkedKeys}
                  className="h-full"
                  treeData={generateTree(treeList, targetKeys)}
                  onCheck={(_, { node: { key } }) => {
                    onItemSelect(key as string, !isChecked(checkedKeys, key));
                  }}
                  onSelect={(_, { node: { key } }) => {
                    onItemSelect(key as string, !isChecked(checkedKeys, key));
                  }}
                />
              </div>
            );
          } else {
            return targetAllData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-3 py-1 my-1 hover:bg-[#0000000a] cursor-pointer flex justify-between"
                >
                  <span>{item.title}</span>
                  <CloseOutlined
                    onClick={() =>
                      setTargetKeys((prev) =>
                        prev.filter((key) => key !== item.key)
                      )
                    }
                  />
                </div>
              );
            });
          }
        }}
      </Transfer>
    </CustomModal>
  );
};
