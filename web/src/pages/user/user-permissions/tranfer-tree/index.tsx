import { CloseOutlined } from "@ant-design/icons";
import { Transfer } from "antd";
import { TransferItem } from "antd/es/transfer";
import { SetStateAction } from "react";

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

  return (
    <CustomModal
      title={
        <div className="flex flex-row justify-between">
          <div>添加用戶</div>
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
        selectAllLabels={["标题", `已選擇1項`]}
        showSelectAll={false}
      />
    </CustomModal>
  );
};
