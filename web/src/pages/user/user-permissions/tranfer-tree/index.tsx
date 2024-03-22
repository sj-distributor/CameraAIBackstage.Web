import { CloseOutlined, WarningFilled } from "@ant-design/icons";
import { Transfer } from "antd";
import { TransferItem } from "antd/es/transfer";
import { SetStateAction, useEffect } from "react";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { useAction } from "./hook";

export const TransferTree = ({
  isModelOpen,
  setIsModelOpen,
  data,
}: {
  isModelOpen: boolean;
  setIsModelOpen: (value: SetStateAction<boolean>) => void;
  data: TransferItem[];
}) => {
  const { t, source } = useAction();

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
        dataSource={data}
        showSearch
        render={(data) => data.userName}
        listStyle={{
          width: 300,
          height: 250,
        }}
        selectionsIcon={<></>}
        selectAllLabels={[
          t(KEYS.TITLE, source),
          t(KEYS.USER_HAS_BEEN_SELECTED, source),
        ]}
        showSelectAll={false}
      />
    </CustomModal>
  );
};
