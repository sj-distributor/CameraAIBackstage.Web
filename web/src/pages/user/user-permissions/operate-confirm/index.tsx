import { WarningFilled } from "@ant-design/icons";
import { SetStateAction } from "react";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { useAction } from "./hook";

export const OperateConfirmModal = ({
  isModelOpen,
  setIsModelOpen,
  contentText,
  handleOperateConfirm,
}: {
  isModelOpen: boolean;
  setIsModelOpen: (value: SetStateAction<boolean>) => void;
  contentText: string;
  handleOperateConfirm: () => void;
}) => {
  const { t, source } = useAction();

  return (
    <CustomModal
      title={
        <div className="text-[1.25rem] font-semibold">
          <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
          {t(KEYS.OPERATION_CONFIRMATION, source)}
        </div>
      }
      onCancle={() => setIsModelOpen(false)}
      onConfirm={() => {
        setIsModelOpen(false);
        handleOperateConfirm();
      }}
      open={isModelOpen}
      className="customModal"
    >
      <span className="pl-[2rem] font-normal text-[1rem] leading-6">
        {contentText}
      </span>
    </CustomModal>
  );
};
