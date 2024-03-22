import { Button, Modal } from "antd";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

export const CustomModal = ({
  title,
  onCancle,
  onConfirm,
  children,
  open,
  className,
  modalWidth,
  footer,
  destroyOnClose,
  forceRender,
  confirmLoading,
}: {
  title: JSX.Element;
  onCancle: () => void;
  onConfirm: () => void;
  children: JSX.Element;
  open: boolean;
  className?: string;
  modalWidth?: string;
  footer?: JSX.Element;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  confirmLoading?: boolean;
}) => {
  const { t } = useAuth();

  const source = { ns: "userPermissions" };

  return (
    <Modal
      className={className ?? ""}
      width={modalWidth ?? undefined}
      title={title}
      open={open}
      centered
      closeIcon={null}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
      footer={
        footer ?? (
          <div className="h-[4.75rem] bg-[#F6F8FC] rounded-b-md items-center flex justify-end">
            <Button
              className="w-[6rem] h-[2.75rem] mr-[1rem]"
              onClick={onCancle}
            >
              {t(KEYS.CANCEL, source)}
            </Button>
            <Button
              type="primary"
              className="w-[6rem] h-[2.75rem] mr-[1rem] bg-[#2853E3]"
              onClick={onConfirm}
              loading={confirmLoading}
            >
              {t(KEYS.CONFIRM, source)}
            </Button>
          </div>
        )
      }
    >
      {children}
    </Modal>
  );
};
